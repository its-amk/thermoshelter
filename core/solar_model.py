"""
Solar radiation model for shelter design.

Implements solar geometry calculations and incident radiation on tilted surfaces.
All angles in degrees, temperatures in Celsius unless otherwise noted.
"""

try:
    import numpy as np
except ImportError:
    import math

    class _NPFallback:
        @staticmethod
        def sin(x):
            return math.sin(x)

        @staticmethod
        def cos(x):
            return math.cos(x)

        @staticmethod
        def tan(x):
            return math.tan(x)

        @staticmethod
        def arcsin(x):
            return math.asin(max(-1.0, min(1.0, x)))

        @staticmethod
        def arctan2(y, x):
            return math.atan2(y, x)

        @staticmethod
        def radians(deg):
            return math.radians(deg)

        @staticmethod
        def degrees(rad):
            return math.degrees(rad)

    np = _NPFallback()

from datetime import datetime
from dataclasses import dataclass
from typing import Optional


@dataclass
class SolarGainResult:
    """Result of solar gain calculations for a surface or shelter."""
    roof_solar_gain: float          # W
    wall_solar_gain: float          # W
    floor_solar_gain: float         # W (usually 0)
    total_solar_gain: float         # W
    roof_energy: float              # Wh (accumulated over timestep)
    wall_energy: float              # Wh
    total_energy: float             # Wh
    roof_irradiance: float          # W/m²
    wall_irradiance: float          # W/m²
    solar_altitude: float           # degrees
    solar_azimuth: float            # degrees


class SolarModel:
    """Solar radiation and shading model."""
    
    DIRECT_NORMAL_DEFAULT = 800     # W/m² - typical clear sky
    DIFFUSE_HORIZONTAL_DEFAULT = 100  # W/m² - typical clear sky
    
    @staticmethod
    def calculate_solar_altitude(latitude: float, hour: float, 
                                month: int, day: int) -> float:
        """Calculate solar altitude angle using Spencer (1971) method."""
        n = int(datetime(2024, month, day).timetuple().tm_yday)
        declination = 23.45 * np.sin(np.radians(360.0 * (n - 81.0) / 365.25))
        hour_angle = (hour - 12.0) * 15.0
        
        lat_rad = np.radians(latitude)
        dec_rad = np.radians(declination)
        hra_rad = np.radians(hour_angle)
        
        altitude_rad = np.arcsin(
            np.sin(lat_rad) * np.sin(dec_rad) + 
            np.cos(lat_rad) * np.cos(dec_rad) * np.cos(hra_rad)
        )
        return float(np.degrees(altitude_rad))
    
    @staticmethod
    def calculate_solar_azimuth(latitude: float, hour: float, 
                               month: int, day: int) -> float:
        """Calculate solar azimuth angle."""
        n = int(datetime(2024, month, day).timetuple().tm_yday)
        declination = 23.45 * np.sin(np.radians(360.0 * (n - 81.0) / 365.25))
        hour_angle = (hour - 12.0) * 15.0
        
        lat_rad = np.radians(latitude)
        dec_rad = np.radians(declination)
        hra_rad = np.radians(hour_angle)
        
        numerator = -np.sin(hra_rad)
        denominator = (np.sin(lat_rad) * np.cos(hra_rad) - 
                      np.cos(lat_rad) * np.tan(dec_rad))
        
        azimuth = float(np.degrees(np.arctan2(numerator, denominator)))
        return azimuth % 360.0
    
    @staticmethod
    def calculate_incident_radiation(solar_altitude: float, 
                                     direct_normal: float = 800,
                                     diffuse_horizontal: float = 100,
                                     surface_tilt: float = 0,
                                     surface_azimuth: float = 180) -> float:
        """Calculate incident solar radiation on a tilted surface."""
        if solar_altitude <= 0:
            tilt_rad = np.radians(surface_tilt)
            diffuse_incident = diffuse_horizontal * (1.0 + np.cos(tilt_rad)) / 2.0
            return float(diffuse_incident)
        
        altitude_rad = np.radians(solar_altitude)
        tilt_rad = np.radians(surface_tilt)
        
        direct_incident = direct_normal * max(0.0, np.sin(altitude_rad))
        diffuse_incident = diffuse_horizontal * (1.0 + np.cos(tilt_rad)) / 2.0
        
        return float(direct_incident + diffuse_incident)
    
    @staticmethod
    def calculate_solar_gain(roof_area: float, wall_area: float,
                            latitude: float, hour: float, month: int, day: int,
                            roof_absorptivity: float = 0.7,
                            wall_absorptivity: float = 0.7,
                            direct_normal: float = 800,
                            diffuse_horizontal: float = 100,
                            timestep_hours: float = 1.0,
                            wall_orientation: float = 180.0,
                            roof_tilt: float = 0.0) -> SolarGainResult:
        """Calculate total solar heat gain for a shelter."""
        if roof_area < 0 or wall_area < 0:
            raise ValueError(f"Areas must be non-negative: roof={roof_area}, wall={wall_area}")
        if not (0 <= roof_absorptivity <= 1):
            raise ValueError(f"Roof absorptivity must be 0-1, got {roof_absorptivity}")
        if not (0 <= wall_absorptivity <= 1):
            raise ValueError(f"Wall absorptivity must be 0-1, got {wall_absorptivity}")
        
        solar_altitude = SolarModel.calculate_solar_altitude(latitude, hour, month, day)
        solar_azimuth = SolarModel.calculate_solar_azimuth(latitude, hour, month, day)
        
        roof_irradiance = SolarModel.calculate_incident_radiation(
            solar_altitude, direct_normal, diffuse_horizontal,
            surface_tilt=roof_tilt, surface_azimuth=180
        )
        roof_solar_gain = roof_absorptivity * roof_irradiance * roof_area
        roof_energy = roof_solar_gain * timestep_hours
        
        wall_irradiance = SolarModel.calculate_incident_radiation(
            solar_altitude, direct_normal, diffuse_horizontal,
            surface_tilt=90, surface_azimuth=wall_orientation
        )
        wall_solar_gain = wall_absorptivity * wall_irradiance * wall_area
        wall_energy = wall_solar_gain * timestep_hours
        
        floor_solar_gain = 0.0
        floor_energy = 0.0
        
        total_solar_gain = roof_solar_gain + wall_solar_gain + floor_solar_gain
        total_energy = roof_energy + wall_energy + floor_energy
        
        return SolarGainResult(
            roof_solar_gain=float(roof_solar_gain),
            wall_solar_gain=float(wall_solar_gain),
            floor_solar_gain=float(floor_solar_gain),
            total_solar_gain=float(total_solar_gain),
            roof_energy=float(roof_energy),
            wall_energy=float(wall_energy),
            total_energy=float(total_energy),
            roof_irradiance=float(roof_irradiance),
            wall_irradiance=float(wall_irradiance),
            solar_altitude=float(solar_altitude),
            solar_azimuth=float(solar_azimuth)
        )
