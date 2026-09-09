"""
Thermal model for shelter design.
"""

from typing import Dict, Tuple, List


class ThermalModel:
    """Basic thermal model for shelter design."""
    
    def __init__(self):
        """Initialize thermal model constants."""
        self.stefan_boltzmann = 5.67e-8  # W/(m²·K⁴)
        self.air_density = 1.2  # kg/m³ at sea level
        self.air_specific_heat = 1005  # J/(kg·K)
    
    def calculate_u_value(self, materials: list, thicknesses: list) -> float:
        """Calculate U-value (thermal transmittance) for composite wall."""
        r_total = sum(t / k for t, k in zip(thicknesses, materials))
        return 1.0 / (r_total + 0.12 + 0.04)  # Add surface resistances
    
    def calculate_heat_loss(self, u_value: float, area: float, 
                           indoor_temp: float, outdoor_temp: float) -> float:
        """Calculate heat loss through surface."""
        return u_value * area * (indoor_temp - outdoor_temp)
    
    def calculate_solar_gain(self, solar_irradiance: float, area: float, 
                            absorptivity: float = 0.7) -> float:
        """Calculate solar heat gain through surface."""
        return solar_irradiance * area * absorptivity
    
    def calculate_thermal_mass_effect(self, mass: float, specific_heat: float,
                                     temp_swing: float) -> float:
        """Calculate heat storage capacity of thermal mass."""
        return mass * specific_heat * temp_swing


def estimate_indoor_temperature(outdoor_temp: float, solar_gain: float,
                               heat_loss_coeff: float, mass_effect: float) -> float:
    """Simplified steady-state indoor temperature estimation."""
    if heat_loss_coeff == 0:
        return outdoor_temp
    
    indoor_temp = outdoor_temp + (solar_gain / heat_loss_coeff) - mass_effect
    return indoor_temp
