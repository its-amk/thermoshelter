"""
Material database models and utilities for THERMOSHELTER simulation.
"""

from dataclasses import dataclass
import csv
from typing import Dict, List, Optional


@dataclass
class Material:
    """Building material with thermo-physical and economic properties."""
    name: str
    thermal_conductivity: float   # W/m·K (k)
    density: float                # kg/m³ (ρ)
    specific_heat: float          # J/kg·K (c)
    absorptivity: float           # 0-1 (α)
    emissivity: float             # 0-1 (ε)
    cost_per_m3: float            # INR/m³
    category: str                 # 'Wall', 'Roof', 'Insulation'
    availability: str             # 'Common', 'Local', 'Specialized'

    @property
    def volumetric_heat_capacity(self) -> float:
        """Volumetric heat capacity: ρ × c (J/m³·K)."""
        return self.density * self.specific_heat

    @property
    def thermal_diffusivity(self) -> float:
        """Thermal diffusivity: k / (ρ × c) (m²/s)."""
        v_hc = self.volumetric_heat_capacity
        return self.thermal_conductivity / v_hc if v_hc > 0 else 0.0

    def calculate_r_value(self, thickness_m: float) -> float:
        """Calculate thermal resistance R = L / k (m²·K/W)."""
        if self.thermal_conductivity <= 0:
            raise ValueError(f"Thermal conductivity must be positive for {self.name}")
        return thickness_m / self.thermal_conductivity

    @classmethod
    def from_row(cls, row: Dict[str, str]) -> "Material":
        """Create Material instance from CSV row."""
        return cls(
            name=row["Material"],
            thermal_conductivity=float(row["Thermal_Conductivity_W_mK"]),
            density=float(row["Density_kg_m3"]),
            specific_heat=float(row["Specific_Heat_J_kg_K"]),
            absorptivity=float(row["Absorptivity"]),
            emissivity=float(row["Emissivity"]),
            cost_per_m3=float(row["Cost_INR_m3"]),
            category=row["Category"],
            availability=row["Availability"]
        )


def load_materials(filepath: str) -> Dict[str, Material]:
    """Load materials database from CSV file."""
    materials = {}
    with open(filepath, mode="r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            mat = Material.from_row(row)
            materials[mat.name] = mat
    return materials


def filter_by_category(materials: Dict[str, Material], category: str) -> Dict[str, Material]:
    """Filter materials by category ('Wall', 'Roof', 'Insulation')."""
    return {name: m for name, m in materials.items() if m.category.lower() == category.lower()}
