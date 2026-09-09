"""
Unit tests for ANSYS FEA Model Export and Ladakh Standalone Passive Shelter Model.
"""

import unittest
from models.ansys_export import (
    generate_ansys_apdl_script,
    generate_pymapdl_python_script,
    generate_apdl_macro,
    generate_pymapdl_script
)
from models.shelter import ShelterDesign


class TestAnsysExport(unittest.TestCase):
    """Test suite for ANSYS APDL and PyMAPDL script generation."""

    def test_apdl_generation_contains_key_elements(self):
        """Verify APDL script contains element types, units, and solution setup."""
        script = generate_ansys_apdl_script(
            length_m=12.0,
            width_m=8.0,
            height_m=3.0,
            wall_thick_m=0.35,
            roof_thick_m=0.20,
            wall_k=0.45,
            wall_rho=1900.0,
            wall_cp=900.0,
            roof_k=0.023,
            location_name="Ladakh High-Altitude Cold Region"
        )
        self.assertIn("/PREP7", script)
        self.assertIn("SOLID70", script)
        self.assertIn("SURF152", script)
        self.assertIn("MP, KXX, 1, 0.450", script)
        self.assertIn("MP, KXX, 2, 0.023", script)
        self.assertIn("/SOLU", script)
        self.assertIn("ANTYPE, 4", script)
        self.assertIn("/POST26", script)

    def test_apdl_contains_transient_diurnal_steps(self):
        """Verify 24 hourly load steps in APDL loop."""
        script = generate_ansys_apdl_script()
        self.assertIn("*DO, HR, 1, 24", script)
        self.assertIn("SOLAR_FLUX", script)
        self.assertIn("HFLUX", script)
        self.assertIn("CONV", script)

    def test_pymapdl_generation(self):
        """Verify PyMAPDL python script structure and imports."""
        py_script = generate_pymapdl_python_script(
            length_m=10.0,
            location_name="Ladakh Cold Test"
        )
        self.assertIn("from ansys.mapdl.core import launch_mapdl", py_script)
        self.assertIn("mapdl.input_strings", py_script)
        self.assertIn("SOLID70", py_script)
        self.assertIn("Ladakh Cold Test", py_script)

    def test_convenience_aliases(self):
        """Verify aliases work identically to original functions."""
        apdl = generate_apdl_macro()
        self.assertTrue(len(apdl) > 1000)
        pymapdl = generate_pymapdl_script()
        self.assertTrue(len(pymapdl) > 1000)

    def test_ladakh_passive_shelter_factory(self):
        """Verify Ladakh passive shelter preset dataclass factory."""
        shelter = ShelterDesign.ladakh_passive_shelter()
        self.assertEqual(shelter.orientation_deg, 0.0)  # True South
        self.assertEqual(shelter.aspect_ratio, 1.6)
        self.assertEqual(shelter.window_area, 18.0)
        self.assertEqual(shelter.glazing_u_value, 1.4)
        self.assertEqual(shelter.night_shutter_r, 2.0)
        self.assertEqual(shelter.infiltration_ach, 0.25)
        self.assertEqual(shelter.thermal_mass_kg, 65000.0)


if __name__ == "__main__":
    unittest.main()
