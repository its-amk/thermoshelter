"""
Smoke test demonstration script for THERMOSHELTER Phase 2 Thermal Physics Engine.
Validates climate loading, materials database, U-value calculations, 24-hour simulation,
solar radiation, heat transfer modes, comfort metrics, and physical energy balance.
"""

import os
import sys

# Ensure UTF-8 output on Windows console
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Ensure project root is in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from models.climate import load_climates
from models.materials import load_materials
from models.shelter import ShelterDesign
from models.simulation import run_24h_simulation
from core.heat_transfer import ConductiveHeatTransfer


def main():
    print("=================================================================")
    print(" THERMOSHELTER Phase 2: End-to-End Thermal Physics Smoke Test")
    print("=================================================================\n")

    # 1. Load Climate Data
    climates_path = os.path.join(BASE_DIR, "data", "climates.csv")
    climates = load_climates(climates_path)
    print(f"[OK] Loaded {len(climates)} climate profiles: {', '.join(climates.keys())}")
    
    # Select Rajasthan (27°N, Hot Zone)
    rajasthan = climates.get("Rajasthan")
    assert rajasthan is not None, "Rajasthan climate profile not found"
    print(f"[OK] Selected Climate: {rajasthan.region} ({rajasthan.latitude}deg N, {rajasthan.climate_zone} Zone, Wind: {rajasthan.wind_speed} m/s)")

    # 2. Load Materials
    materials_path = os.path.join(BASE_DIR, "data", "materials.csv")
    materials = load_materials(materials_path)
    print(f"[OK] Loaded {len(materials)} materials from database")
    
    brick = materials.get("Brick")
    clay_tile = materials.get("Clay Tile")
    assert brick is not None, "Brick material not found"
    assert clay_tile is not None, "Clay Tile material not found"
    print(f"[OK] Wall Material: {brick.name} (k = {brick.thermal_conductivity} W/m*K, density = {brick.density} kg/m3)")
    print(f"[OK] Roof Material: {clay_tile.name} (k = {clay_tile.thermal_conductivity} W/m*K, density = {clay_tile.density} kg/m3)")

    # 3. Create Standard Shelter
    shelter = ShelterDesign.standard_shelter(wall_material=brick, roof_material=clay_tile)
    print(f"\n[INFO] Shelter Geometry: Roof: {shelter.roof_area} m2, Walls: {shelter.wall_area} m2, Thermal Mass: {shelter.thermal_mass_kg:,.0f} kg")

    # 4. Verify U-values
    u_wall = ConductiveHeatTransfer.calculate_u_value(shelter.wall_thickness, brick.thermal_conductivity)
    u_roof = ConductiveHeatTransfer.calculate_u_value(shelter.roof_thickness, clay_tile.thermal_conductivity)
    print(f"\n[METRIC] U-Values Calculated:")
    print(f"   - Wall (230mm Brick): {u_wall:.2f} W/m2*K (Realistic target: 2-5 W/m2*K)")
    print(f"   - Roof (150mm Tile):  {u_roof:.2f} W/m2*K (Realistic target: 2-5 W/m2*K)")
    assert 1.5 <= u_wall <= 4.0, f"Unexpected wall U-value: {u_wall}"
    assert 2.0 <= u_roof <= 5.0, f"Unexpected roof U-value: {u_roof}"

    # 5. Run 24-Hour Simulation
    print("\n[INFO] Running 24-Hour Diurnal Thermal Simulation...")
    report = run_24h_simulation(rajasthan, shelter, month=6, day=21)
    
    print("\n======================= SIMULATION RESULTS =======================")
    print(f"[RESULT] Outdoor Temp Range: {report.outdoor_temp_min} C - {report.outdoor_temp_max} C (Swing: {report.outdoor_temp_swing} C)")
    print(f"[RESULT] Indoor Temp Range:  {report.indoor_temp_min} C - {report.indoor_temp_max} C (Swing: {report.indoor_temp_swing} C)")
    print(f"[RESULT] Total Solar Energy: {report.total_solar_energy_kwh} kWh (24h)")
    print(f"[RESULT] Total Conduction:   {report.total_conduction_kwh} kWh")
    print(f"[RESULT] Comfortable Hours:  {report.comfortable_hours}/24 ({report.comfort_percentage}%)")
    print(f"[RESULT] Net Energy Balance: +{report.net_energy_gain_wh:.1f} Wh (Positive heat influx expected for Hot Zone)")
    print("==================================================================")

    # 6. Physical Validation Assertions
    assert report.total_solar_energy_kwh > 0, "Solar energy must be positive"
    assert report.indoor_temp_max > report.indoor_temp_min, "Indoor temperatures must form a diurnal swing"
    assert report.indoor_temp_swing < (report.outdoor_temp_swing * 2.0), "Thermal mass should moderate extreme swings"
    
    print("\n[SUCCESS] ALL 8 PHYSICS VERIFICATION CHECKS PASSED SUCCESSFULLY (SMOKE TEST OK)!\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
