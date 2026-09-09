"""
Climate data model for thermal shelter simulation.
"""

from dataclasses import dataclass
import csv
from typing import Dict, List, Optional


@dataclass
class ClimateData:
    """Climate profile for a geographic region."""
    region: str
    latitude: float
    longitude: float
    altitude: float
    avg_temp: float
    min_temp: float
    max_temp: float
    humidity: float
    wind_speed: float
    annual_rainfall: float
    climate_zone: str

    @classmethod
    def from_row(cls, row: Dict[str, str]) -> "ClimateData":
        """Create ClimateData instance from CSV row dictionary."""
        return cls(
            region=row["Region"],
            latitude=float(row["Latitude"]),
            longitude=float(row["Longitude"]),
            altitude=float(row["Altitude"]),
            avg_temp=float(row["Avg_Temp_C"]),
            min_temp=float(row["Min_Temp_C"]),
            max_temp=float(row["Max_Temp_C"]),
            humidity=float(row["Humidity_Percent"]),
            wind_speed=float(row["Wind_Speed_ms"]),
            annual_rainfall=float(row["Annual_Rainfall_mm"]),
            climate_zone=row["Climate_Zone"]
        )


def load_climates(filepath: str) -> Dict[str, ClimateData]:
    """Load climate records from CSV file."""
    climates = {}
    with open(filepath, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            climate = ClimateData.from_row(row)
            climates[climate.region] = climate
    return climates
