"""
Simulation result data structures and 24-hour thermal cycle integration.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional
import math


@dataclass
class TimestepResult:
    """Simulation results for a single 1-hour timestep."""
    hour: int
    outdoor_temp: float            # °C
    indoor_temp: float             # °C
    operative_temp: float          # °C
    solar_gain_w: float            # W
    conduction_flow_w: float       # W (+ into shelter, - out)
    convection_flow_w: float       # W (+ into shelter, - out)
    radiation_flow_w: float        # W (+ into shelter, - out)
    net_heat_flow_w: float         # W
    pmv: float
    ppd: float
    in_comfort_zone: bool


@dataclass
class SimulationReport:
    """Full multi-hour or 24-hour simulation run summary."""
    region: str
    total_hours: int
    comfortable_hours: int
    comfort_percentage: float
    indoor_temp_min: float
    indoor_temp_max: float
    indoor_temp_swing: float
    outdoor_temp_min: float
    outdoor_temp_max: float
    outdoor_temp_swing: float
    total_solar_energy_kwh: float
    total_conduction_kwh: float
    net_energy_gain_wh: float
    timesteps: List[TimestepResult] = field(default_factory=list)


def run_24h_simulation(climate, shelter, month: int = 6, day: int = 21) -> SimulationReport:
    """
    Simulate a 24-hour thermal cycle for the given shelter and climate.
    Quasi-steady-state hourly resolution with thermal capacitance lag.
    """
    from core.heat_transfer import ConductiveHeatTransfer, ConvectiveHeatTransfer, RadiativeHeatTransfer
    from core.solar_model import SolarModel
    from core.comfort import calculate_comfort_metrics
    
    # Calculate U-values (including inside and outside surface resistances)
    u_wall = ConductiveHeatTransfer.calculate_u_value(
        shelter.wall_thickness, shelter.wall_material.thermal_conductivity
    )
    u_roof = ConductiveHeatTransfer.calculate_u_value(
        shelter.roof_thickness, shelter.roof_material.thermal_conductivity
    )

    total_heat_loss_coeff = (u_wall * shelter.wall_area) + (u_roof * shelter.roof_area)
    
    # Diurnal outdoor temperature profile
    avg_temp = climate.avg_temp
    t_min = climate.min_temp
    t_max = climate.max_temp
    amplitude = (t_max - t_min) / 2.0
    
    timesteps = []
    indoor_temp = avg_temp
    
    # Thermal capacitance: Specific heat * mass
    c_total = shelter.thermal_mass_kg * shelter.wall_material.specific_heat
    
    total_solar_gain_wh = 0.0
    total_conduction_wh = 0.0
    comfortable_hours = 0
    
    for h in range(24):
        # Peak temperature at 14h, Min around 05h
        outdoor_t = avg_temp + amplitude * math.cos(math.radians((h - 14.0) * 15.0))
        
        # 1. Solar gain
        solar_res = SolarModel.calculate_solar_gain(
            roof_area=shelter.roof_area,
            wall_area=shelter.wall_area,
            latitude=climate.latitude,
            hour=float(h),
            month=month,
            day=day,
            roof_absorptivity=shelter.absorptivity_roof,
            wall_absorptivity=shelter.absorptivity_wall,
            timestep_hours=1.0
        )
        total_solar_gain_wh += solar_res.total_solar_gain
        
        # 2. Conduction
        q_wall_cond = ConductiveHeatTransfer.calculate_heat_flow(
            shelter.wall_area, shelter.wall_thickness,
            shelter.wall_material.thermal_conductivity,
            outdoor_t, indoor_temp
        )
        q_roof_cond = ConductiveHeatTransfer.calculate_heat_flow(
            shelter.roof_area, shelter.roof_thickness,
            shelter.roof_material.thermal_conductivity,
            outdoor_t, indoor_temp
        )
        q_cond = q_wall_cond + q_roof_cond
        total_conduction_wh += q_cond

        # 2b. Openings (Windows & Glazing) & Infiltration
        win_area = getattr(shelter, "window_area", 0.0)
        q_window_solar = 0.0
        q_window_cond = 0.0
        q_infil = 0.0

        if win_area > 0:
            shgc = getattr(shelter, "glazing_shgc", 0.72)
            u_glaze = getattr(shelter, "glazing_u_value", 2.8)
            r_shutter = getattr(shelter, "night_shutter_r", 1.2)
            ach = getattr(shelter, "infiltration_ach", 0.5)

            # Solar direct entry through South-facing windows
            if solar_res.wall_irradiance > 0:
                q_window_solar = win_area * solar_res.wall_irradiance * shgc
                total_solar_gain_wh += q_window_solar

            # Window conduction (night shutters closed when irradiance is zero)
            if solar_res.wall_irradiance > 0:
                effective_u_win = u_glaze
            else:
                effective_u_win = 1.0 / (1.0 / u_glaze + r_shutter)
            q_window_cond = effective_u_win * win_area * (outdoor_t - indoor_temp)

            # Infiltration heat flow (W)
            vol = getattr(shelter, "interior_volume", 300.0)
            q_infil = 0.33 * ach * vol * (outdoor_t - indoor_temp)
        
        # 3. Convection
        h_conv_vert = ConvectiveHeatTransfer.calculate_convection_coefficient(climate.wind_speed, "vertical")
        q_conv = h_conv_vert * (shelter.wall_area * 0.1) * (outdoor_t - indoor_temp)
        
        # 4. Radiation
        t_surface_approx = outdoor_t + (shelter.absorptivity_roof * solar_res.roof_irradiance) / 25.0
        q_rad = RadiativeHeatTransfer.calculate_heat_flow(
            shelter.roof_area, shelter.roof_material.emissivity,
            t_surface_approx, outdoor_t
        )
        
        # Net heat flow (Watts)
        q_net = (solar_res.total_solar_gain + q_window_solar) + q_cond + q_window_cond + q_infil + q_conv - q_rad
        
        # Temperature update with thermal mass: dT = (Q_net * dt) / C_total
        dt_seconds = 3600.0
        temp_delta = (q_net * dt_seconds) / c_total
        indoor_temp = max(15.0, min(48.0, indoor_temp + temp_delta))
        
        # Comfort metrics
        t_mrt = (indoor_temp + t_surface_approx) / 2.0
        t_op = 0.5 * indoor_temp + 0.5 * t_mrt
        
        comfort = calculate_comfort_metrics(t_op)
        if comfort.in_comfort_zone:
            comfortable_hours += 1
            
        timesteps.append(TimestepResult(
            hour=h,
            outdoor_temp=round(outdoor_t, 2),
            indoor_temp=round(indoor_temp, 2),
            operative_temp=round(t_op, 2),
            solar_gain_w=round(solar_res.total_solar_gain, 1),
            conduction_flow_w=round(q_cond, 1),
            convection_flow_w=round(q_conv, 1),
            radiation_flow_w=round(q_rad, 1),
            net_heat_flow_w=round(q_net, 1),
            pmv=round(comfort.pmv, 2),
            ppd=round(comfort.ppd, 1),
            in_comfort_zone=comfort.in_comfort_zone
        ))
        
    in_temps = [ts.indoor_temp for ts in timesteps]
    out_temps = [ts.outdoor_temp for ts in timesteps]
    
    return SimulationReport(
        region=climate.region,
        total_hours=24,
        comfortable_hours=comfortable_hours,
        comfort_percentage=round((comfortable_hours / 24.0) * 100.0, 1),
        indoor_temp_min=min(in_temps),
        indoor_temp_max=max(in_temps),
        indoor_temp_swing=round(max(in_temps) - min(in_temps), 2),
        outdoor_temp_min=min(out_temps),
        outdoor_temp_max=max(out_temps),
        outdoor_temp_swing=round(max(out_temps) - min(out_temps), 2),
        total_solar_energy_kwh=round(total_solar_gain_wh / 1000.0, 2),
        total_conduction_kwh=round(total_conduction_wh / 1000.0, 2),
        net_energy_gain_wh=round(sum(ts.net_heat_flow_w for ts in timesteps) / 24.0, 1),
        timesteps=timesteps
    )
