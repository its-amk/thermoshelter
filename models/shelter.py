"""
Shelter geometry and construction models for thermal simulation.
"""

from dataclasses import dataclass
from typing import Optional
from .materials import Material


@dataclass
class ShelterDesign:
    """Shelter geometry, material envelope, orientation, and thermal properties."""
    name: str
    roof_area: float          # m²
    wall_area: float          # m²
    floor_area: float         # m²
    interior_volume: float    # m³
    wall_material: Material
    roof_material: Material
    wall_thickness: float     # m
    roof_thickness: float     # m
    thermal_mass_kg: float    # kg
    window_area: float = 12.0  # m² (openings)
    orientation_deg: float = 0.0  # 0° = True South, +90° = West, -90° = East, 180° = North
    aspect_ratio: float = 1.5     # Length-to-Width (1.5 = elongated east-west for solar capture)
    glazing_u_value: float = 2.8  # W/m²·K (Double Glazing)
    glazing_shgc: float = 0.72    # Solar Heat Gain Coefficient
    night_shutter_r: float = 1.2  # m²·K/W (Insulated night shutters to prevent night heat drop)
    infiltration_ach: float = 0.5 # Air Changes per Hour
    absorptivity_roof: float = 0.70
    absorptivity_wall: float = 0.70

    @classmethod
    def standard_shelter(cls, wall_material: Material, roof_material: Material) -> "ShelterDesign":
        """Create standard test shelter matching smoke test specifications."""
        return cls(
            name="Rajasthan Baseline Passive Shelter",
            roof_area=100.0,
            wall_area=400.0,
            floor_area=100.0,
            interior_volume=300.0,
            wall_material=wall_material,
            roof_material=roof_material,
            wall_thickness=0.23,  # 230mm brick wall
            roof_thickness=0.15,  # 150mm clay tile roof
            thermal_mass_kg=50000.0,  # 50,000 kg
            window_area=0.0,
            absorptivity_roof=roof_material.absorptivity,
            absorptivity_wall=wall_material.absorptivity
        )

    @classmethod
    def ladakh_passive_shelter(
        cls,
        wall_material: Optional[Material] = None,
        roof_material: Optional[Material] = None
    ) -> "ShelterDesign":
        """
        Create specialized Standalone Passive Shelter for High-Altitude Cold Region (Ladakh).
        Features South-facing solar capture, high thermal mass, double glazing, and night shutters.
        """
        if wall_material is None:
            wall_material = Material(
                name="Rammed Earth",
                thermal_conductivity=0.45,
                density=1900.0,
                specific_heat=900.0,
                absorptivity=0.80,
                emissivity=0.90,
                cost_per_m3=3500.0,
                category="Wall",
                availability="Local"
            )
        if roof_material is None:
            roof_material = Material(
                name="PUF Sandwich Panel",
                thermal_conductivity=0.023,
                density=45.0,
                specific_heat=1400.0,
                absorptivity=0.45,
                emissivity=0.88,
                cost_per_m3=19500.0,
                category="Roof",
                availability="Specialized"
            )

        return cls(

            name="Ladakh High-Altitude Self-Sustained Passive Shelter",
            roof_area=80.0,
            wall_area=240.0,
            floor_area=80.0,
            interior_volume=240.0,
            wall_material=wall_material,
            roof_material=roof_material,
            wall_thickness=0.35,  # 350mm high-thermal mass composite wall
            roof_thickness=0.20,  # 200mm insulated roof
            thermal_mass_kg=65000.0,  # 65,000 kg dense masonry thermal storage
            window_area=18.0,  # 18 m² large south-facing solar collector glazing
            orientation_deg=0.0,  # Directly facing True South
            aspect_ratio=1.6,  # Elongated East-West to maximize South solar façade
            glazing_u_value=1.4,  # Double Low-E Argon-filled
            glazing_shgc=0.76,  # High solar heat gain during day
            night_shutter_r=2.0,  # Heavy multi-layer insulated shutters closed after sunset
            infiltration_ach=0.25,  # Airtight vestibule & sealed construction
            absorptivity_roof=0.85,
            absorptivity_wall=0.85
        )

