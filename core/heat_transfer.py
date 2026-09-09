"""
Heat transfer calculations for shelter thermal analysis.

Implements conduction, convection, and radiation heat transfer.
Sign convention: Positive = heat entering shelter, Negative = heat leaving shelter
"""

from typing import Dict, Tuple
from dataclasses import dataclass

# Physical Constants
STEFAN_BOLTZMANN = 5.67e-8  # W/(m²·K⁴) - Stefan-Boltzmann constant
ABSOLUTE_ZERO = 273.15  # Conversion from Celsius to Kelvin


@dataclass
class HeatTransferResult:
    """Result of heat transfer calculations for a timestep."""
    conductive_heat_flow: float  # W (positive = into shelter)
    convective_heat_flow: float  # W (positive = into shelter)
    radiative_heat_flow: float   # W (positive = into shelter)
    wall_conduction: float       # W
    roof_conduction: float       # W
    floor_conduction: float      # W
    wall_convection: float       # W
    roof_convection: float       # W
    wall_radiation: float        # W
    roof_radiation: float        # W


class ConductiveHeatTransfer:
    """Calculate conductive heat transfer through building surfaces."""
    
    @staticmethod
    def validate_inputs(area: float, thickness: float, 
                       thermal_conductivity: float) -> None:
        """Validate conduction parameters."""
        if area <= 0:
            raise ValueError(f"Area must be positive, got {area} m²")
        if thickness <= 0:
            raise ValueError(f"Thickness must be positive, got {thickness} m")
        if thermal_conductivity <= 0:
            raise ValueError(f"Thermal conductivity must be positive, got {thermal_conductivity} W/m·K")
    
    @staticmethod
    def calculate_resistance(thickness: float, thermal_conductivity: float, 
                            convection_coeff_inside: float = 8.0,
                            convection_coeff_outside: float = 25.0) -> float:
        """
        Calculate total thermal resistance including surface convection.
        
        Formula:
            R_total = 1/h_i + L/k + 1/h_o
        """
        if thickness <= 0:
            raise ValueError(f"Thickness must be positive, got {thickness} m")
        if thermal_conductivity <= 0:
            raise ValueError(f"Thermal conductivity must be positive, got {thermal_conductivity} W/m·K")
        if convection_coeff_inside <= 0 or convection_coeff_outside <= 0:
            raise ValueError("Convection coefficients must be positive")
        
        r_inside = 1.0 / convection_coeff_inside
        r_material = thickness / thermal_conductivity
        r_outside = 1.0 / convection_coeff_outside
        
        return r_inside + r_material + r_outside
    
    @staticmethod
    def calculate_u_value(thickness: float, thermal_conductivity: float,
                         convection_coeff_inside: float = 8.0,
                         convection_coeff_outside: float = 25.0) -> float:
        """Calculate U-value (thermal transmittance)."""
        r_total = ConductiveHeatTransfer.calculate_resistance(
            thickness, thermal_conductivity, 
            convection_coeff_inside, convection_coeff_outside
        )
        return 1.0 / r_total
    
    @staticmethod
    def calculate_heat_flow(area: float, thickness: float, 
                           thermal_conductivity: float,
                           temp_outside: float, temp_inside: float,
                           convection_coeff_inside: float = 8.0,
                           convection_coeff_outside: float = 25.0) -> float:
        """Calculate conductive heat flow through a surface."""
        ConductiveHeatTransfer.validate_inputs(area, thickness, thermal_conductivity)
        
        u_value = ConductiveHeatTransfer.calculate_u_value(
            thickness, thermal_conductivity,
            convection_coeff_inside, convection_coeff_outside
        )
        
        heat_flow = u_value * area * (temp_outside - temp_inside)
        return heat_flow


class ConvectiveHeatTransfer:
    """Calculate convective heat transfer at building surfaces."""
    
    @staticmethod
    def calculate_convection_coefficient(wind_speed: float = 3.0,
                                        surface_type: str = "vertical") -> float:
        """Calculate convection coefficient based on wind speed."""
        if wind_speed < 0:
            raise ValueError(f"Wind speed must be non-negative, got {wind_speed} m/s")
        
        if surface_type.lower() == "horizontal":
            h = 10.0 + 6.0 * wind_speed
        else:
            h = 10.0 + 4.0 * wind_speed
        
        return h
    
    @staticmethod
    def calculate_heat_flow(area: float, h_coefficient: float,
                           temp_outside: float, temp_inside: float) -> float:
        """Calculate convective heat flow at a surface."""
        if area <= 0:
            raise ValueError(f"Area must be positive, got {area} m²")
        if h_coefficient <= 0:
            raise ValueError(f"Convection coefficient must be positive, got {h_coefficient}")
        
        heat_flow = h_coefficient * area * (temp_outside - temp_inside)
        return heat_flow


class RadiativeHeatTransfer:
    """Calculate radiative heat transfer from building surfaces."""
    
    @staticmethod
    def validate_inputs(area: float, emissivity: float,
                       temp_surface: float, temp_surrounding: float) -> None:
        """Validate radiation parameters."""
        if area <= 0:
            raise ValueError(f"Area must be positive, got {area} m²")
        if not (0 <= emissivity <= 1):
            raise ValueError(f"Emissivity must be between 0 and 1, got {emissivity}")
        if temp_surface < 0 or temp_surrounding < 0:
            raise ValueError("Temperatures must be non-negative when in Kelvin")
    
    @staticmethod
    def calculate_heat_flow(area: float, emissivity: float,
                           temp_surface_celsius: float,
                           temp_surrounding_celsius: float) -> float:
        """Calculate radiative heat flow using Stefan-Boltzmann equation."""
        temp_surface_k = temp_surface_celsius + ABSOLUTE_ZERO
        temp_surrounding_k = temp_surrounding_celsius + ABSOLUTE_ZERO
        
        RadiativeHeatTransfer.validate_inputs(
            area, emissivity, temp_surface_k, temp_surrounding_k
        )
        
        t_s_4 = temp_surface_k ** 4
        t_sur_4 = temp_surrounding_k ** 4
        
        q_rad = emissivity * STEFAN_BOLTZMANN * area * (t_s_4 - t_sur_4)
        return q_rad
    
    @staticmethod
    def approximate_surface_temperature(outdoor_temp: float, solar_radiation: float,
                                       absorptivity: float, h_outside: float = 25.0) -> float:
        """Approximate surface temperature including solar absorption."""
        if h_outside <= 0:
            raise ValueError(f"Convection coefficient must be positive, got {h_outside}")
        
        temp_rise = (absorptivity * solar_radiation) / h_outside
        surface_temp = outdoor_temp + temp_rise
        return surface_temp
