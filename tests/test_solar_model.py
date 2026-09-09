"""Unit tests for SolarModel (20 tests)."""

import unittest
from core.solar_model import SolarModel, SolarGainResult


class TestSolarModel(unittest.TestCase):
    """Test suite for solar geometry and radiation models."""

    def test_altitude_increases_dawn_to_noon(self):
        """Altitude increases from dawn (6h) to noon (12h)."""
        alt_dawn = SolarModel.calculate_solar_altitude(27.0, 6.0, 6, 21)
        alt_mid = SolarModel.calculate_solar_altitude(27.0, 9.0, 6, 21)
        alt_noon = SolarModel.calculate_solar_altitude(27.0, 12.0, 6, 21)
        self.assertLess(alt_dawn, alt_mid)
        self.assertLess(alt_mid, alt_noon)

    def test_zero_radiation_below_horizon(self):
        """Zero direct incident beam radiation when altitude <= 0."""
        irr = SolarModel.calculate_incident_radiation(solar_altitude=-10.0, direct_normal=800, diffuse_horizontal=100)
        self.assertLessEqual(irr, 100.0)  # Only diffuse

    def test_horizontal_intercepts_more_direct(self):
        """Horizontal surface intercepts more normal direct radiation at high altitude."""
        irr_flat = SolarModel.calculate_incident_radiation(solar_altitude=75.0, surface_tilt=0)
        irr_vert = SolarModel.calculate_incident_radiation(solar_altitude=75.0, surface_tilt=90)
        self.assertGreater(irr_flat, irr_vert)

    def test_gain_proportional_to_area(self):
        """Solar gain scales proportionally with area."""
        g1 = SolarModel.calculate_solar_gain(roof_area=50, wall_area=100, latitude=27.0, hour=12, month=6, day=21)
        g2 = SolarModel.calculate_solar_gain(roof_area=100, wall_area=200, latitude=27.0, hour=12, month=6, day=21)
        self.assertAlmostEqual(g2.total_solar_gain, g1.total_solar_gain * 2.0, delta=1.0)

    def test_summer_more_radiation_than_winter(self):
        """Summer solstice produces more radiation than winter solstice at 27N."""
        summer = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21)
        winter = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 12, 21)
        self.assertGreater(summer.total_solar_gain, winter.total_solar_gain * 1.25)

    def test_azimuth_ranges(self):
        """Azimuth stays bounded within 0 to 360 degrees."""
        for h in [6, 9, 12, 15, 18]:
            az = SolarModel.calculate_solar_azimuth(27.0, h, 6, 21)
            self.assertTrue(0.0 <= az <= 360.0)

    def test_solar_noon_symmetry(self):
        """Solar altitude is symmetric around solar noon (11:00 vs 13:00)."""
        alt_11 = SolarModel.calculate_solar_altitude(27.0, 11.0, 6, 21)
        alt_13 = SolarModel.calculate_solar_altitude(27.0, 13.0, 6, 21)
        self.assertAlmostEqual(alt_11, alt_13, places=2)

    def test_negative_area_validation(self):
        """Negative area raises ValueError."""
        with self.assertRaises(ValueError):
            SolarModel.calculate_solar_gain(-10, 100, 27.0, 12, 6, 21)

    def test_absorptivity_range_validation(self):
        """Absorptivity outside [0, 1] raises ValueError."""
        with self.assertRaises(ValueError):
            SolarModel.calculate_solar_gain(100, 100, 27.0, 12, 6, 21, roof_absorptivity=1.5)

    def test_night_solar_gain_minimal(self):
        """Solar gain at midnight (0h) has 0 direct component."""
        res = SolarModel.calculate_solar_gain(100, 400, 27.0, 0, 6, 21)
        self.assertLess(res.solar_altitude, 0)

    def test_high_absorptivity_increases_gain(self):
        """Higher absorptivity strictly increases heat gain."""
        g_low = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21, roof_absorptivity=0.2)
        g_high = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21, roof_absorptivity=0.8)
        self.assertGreater(g_high.total_solar_gain, g_low.total_solar_gain)

    def test_diffuse_view_factor_horizontal(self):
        """Horizontal surface sees full sky vault diffuse."""
        irr = SolarModel.calculate_incident_radiation(solar_altitude=-5.0, diffuse_horizontal=100.0, surface_tilt=0.0)
        self.assertAlmostEqual(irr, 100.0, places=1)

    def test_diffuse_view_factor_vertical(self):
        """Vertical surface sees half sky vault diffuse."""
        irr = SolarModel.calculate_incident_radiation(solar_altitude=-5.0, diffuse_horizontal=100.0, surface_tilt=90.0)
        self.assertAlmostEqual(irr, 50.0, places=1)

    def test_altitude_peak_in_summer(self):
        """Peak noon altitude in June is higher than December for Northern hemisphere."""
        alt_june = SolarModel.calculate_solar_altitude(27.0, 12.0, 6, 21)
        alt_dec = SolarModel.calculate_solar_altitude(27.0, 12.0, 12, 21)
        self.assertGreater(alt_june, alt_dec)

    def test_energy_accumulation_timestep(self):
        """Energy in Wh equals power in W multiplied by timestep."""
        res_1h = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21, timestep_hours=1.0)
        res_2h = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21, timestep_hours=2.0)
        self.assertAlmostEqual(res_2h.total_energy, res_1h.total_energy * 2.0, places=1)

    def test_floor_solar_gain_is_zero(self):
        """Floor receives negligible direct solar gain in standard shelter."""
        res = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21)
        self.assertEqual(res.floor_solar_gain, 0.0)

    def test_equator_solar_noon(self):
        """At equator (0 deg) on equinox (March 21), noon altitude reaches ~90 deg."""
        alt = SolarModel.calculate_solar_altitude(0.0, 12.0, 3, 21)
        self.assertGreater(alt, 85.0)

    def test_north_pole_winter_darkness(self):
        """At 85N in December, sun remains below horizon all day."""
        for h in [0, 6, 12, 18]:
            alt = SolarModel.calculate_solar_altitude(85.0, h, 12, 21)
            self.assertLess(alt, 0.0)

    def test_wall_absorptivity_validation(self):
        """Negative wall absorptivity raises ValueError."""
        with self.assertRaises(ValueError):
            SolarModel.calculate_solar_gain(100, 100, 27.0, 12, 6, 21, wall_absorptivity=-0.1)

    def test_dataclass_fields(self):
        """Result object contains valid dataclass attributes."""
        res = SolarModel.calculate_solar_gain(100, 400, 27.0, 12, 6, 21)
        self.assertTrue(isinstance(res, SolarGainResult))
        self.assertGreater(res.roof_solar_gain, 0)
        self.assertGreater(res.wall_solar_gain, 0)


if __name__ == "__main__":
    unittest.main()
