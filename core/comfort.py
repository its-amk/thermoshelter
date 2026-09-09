"""
Thermal comfort calculations and models.

Implements comfort metrics including PMV/PPD (ASHRAE 55 Standard).
"""

try:
    import numpy as np
except ImportError:
    import math

    class _NPFallback:
        @staticmethod
        def mean(values):
            vals = list(values)
            return sum(vals) / len(vals) if vals else 0.0

        @staticmethod
        def exp(x):
            return math.exp(x)

        @staticmethod
        def clip(val, a_min, a_max):
            return max(a_min, min(a_max, val))

    np = _NPFallback()

from typing import Dict, Tuple
from dataclasses import dataclass


@dataclass
class ComfortResult:
    """Result of thermal comfort calculation."""
    operative_temperature: float   # °C
    pmv: float                     # Predicted Mean Vote (-3 to +3)
    ppd: float                     # Predicted Percentage Dissatisfied (%)
    in_comfort_zone: bool          # True if in comfort band
    sensation: str                 # "Cold", "Cool", "Neutral", etc.


# Comfort zone constants (ASHRAE Standard 55)
COMFORT_TARGET_TEMPERATURE = 24.0  # °C (neutral for moderate activity)
COMFORT_TOLERANCE = 2.0            # ±2°C for 80% acceptability
COMFORT_LOWER_BOUND = COMFORT_TARGET_TEMPERATURE - COMFORT_TOLERANCE  # 22°C
COMFORT_UPPER_BOUND = COMFORT_TARGET_TEMPERATURE + COMFORT_TOLERANCE  # 26°C

# Default comfort assumptions
DEFAULT_METABOLIC_RATE = 1.0       # met (sedentary: 0.8, light: 1.2)
DEFAULT_CLOTHING_RESISTANCE = 0.5  # clo (light: 0.5, heavy: 1.0)
DEFAULT_HUMIDITY = 50.0            # % RH


def calculate_operative_temperature(air_temperature: float, 
                                   mean_radiant_temp: float,
                                   radiant_fraction: float = 0.5) -> float:
    """
    Calculate operative temperature (comfort temperature).
    
    Operative temperature combines air temperature and mean radiant temperature
    weighted by radiation fraction.
    
    Formula:
        T_op = T_air × (1 - f_rad) + T_mrt × f_rad
    """
    if not (0 <= radiant_fraction <= 1):
        raise ValueError(f"Radiant fraction must be 0-1, got {radiant_fraction}")
    
    operative_temp = (air_temperature * (1 - radiant_fraction) + 
                     mean_radiant_temp * radiant_fraction)
    return operative_temp


def estimate_mean_radiant_temperature(air_temp: float, 
                                     surface_temps: Dict[str, float]) -> float:
    """
    Estimate mean radiant temperature from surrounding surfaces.
    Simplified approach: average of visible surface temperatures.
    """
    if surface_temps:
        return float(np.mean(list(surface_temps.values())))
    return air_temp


def calculate_pmv(operative_temperature: float,
                 metabolic_rate: float = DEFAULT_METABOLIC_RATE,
                 clothing_resistance: float = DEFAULT_CLOTHING_RESISTANCE) -> float:
    """
    Calculate PMV (Predicted Mean Vote) - simplified ASHRAE model.
    """
    if metabolic_rate <= 0:
        raise ValueError(f"Metabolic rate must be positive, got {metabolic_rate}")
    if clothing_resistance < 0:
        raise ValueError(f"Clothing resistance must be non-negative, got {clothing_resistance}")
    
    neutral_temp = 22.0
    factor = 0.303 * np.exp(-0.036 * metabolic_rate) + 0.028
    pmv = factor * (operative_temperature - neutral_temp)
    
    pmv = float(np.clip(pmv, -3.0, 3.0))
    return pmv


def calculate_ppd(pmv: float) -> float:
    """
    Calculate PPD (Predicted Percentage Dissatisfied) from PMV.
    """
    if pmv < -3 or pmv > 3:
        raise ValueError(f"PMV must be between -3 and 3, got {pmv}")
    
    ppd = 100.0 - 95.0 * np.exp(-(0.03353 * (pmv**4) + 0.2179 * (pmv**2)))
    ppd = float(np.clip(ppd, 5.0, 100.0))
    return ppd


def get_pmv_sensation(pmv: float) -> str:
    """Convert PMV to human-readable thermal sensation."""
    if pmv < -2:
        return "Very Cold"
    elif pmv < -1:
        return "Cold"
    elif pmv < -0.5:
        return "Cool"
    elif pmv < 0.5:
        return "Neutral"
    elif pmv < 1:
        return "Warm"
    elif pmv < 2:
        return "Hot"
    else:
        return "Very Hot"


def calculate_comfort_metrics(operative_temperature: float,
                             metabolic_rate: float = DEFAULT_METABOLIC_RATE,
                             clothing_resistance: float = DEFAULT_CLOTHING_RESISTANCE,
                             comfort_lower: float = COMFORT_LOWER_BOUND,
                             comfort_upper: float = COMFORT_UPPER_BOUND) -> ComfortResult:
    """Comprehensive thermal comfort calculation."""
    pmv = calculate_pmv(operative_temperature, metabolic_rate, clothing_resistance)
    ppd = calculate_ppd(pmv)
    in_comfort = (comfort_lower <= operative_temperature <= comfort_upper) and (ppd < 20)
    
    return ComfortResult(
        operative_temperature=operative_temperature,
        pmv=pmv,
        ppd=ppd,
        in_comfort_zone=in_comfort,
        sensation=get_pmv_sensation(pmv)
    )


def comfort_percentage(operative_temperatures: list,
                      comfort_lower: float = COMFORT_LOWER_BOUND,
                      comfort_upper: float = COMFORT_UPPER_BOUND) -> Tuple[float, int, int]:
    """Calculate comfort percentage over a time period."""
    if not operative_temperatures:
        return 0.0, 0, 0
    
    comfort_count = sum(1 for t in operative_temperatures 
                       if comfort_lower <= t <= comfort_upper)
    total_count = len(operative_temperatures)
    
    comfort_pct = (comfort_count / total_count * 100) if total_count > 0 else 0
    discomfort_count = total_count - comfort_count
    
    return comfort_pct, comfort_count, discomfort_count
