"""Unit tests for HeatTransfer (20 tests)."""

import unittest
from core.heat_transfer import (
    ConductiveHeatTransfer,
    ConvectiveHeatTransfer,
    RadiativeHeatTransfer,
    STEFAN_BOLTZMANN
)


class TestHeatTransfer(unittest.TestCase):
    """Test suite for conduction, convection, and radiation modules."""

    # Conduction Tests (7)
    def test_u_value_realistic_range(self):
        """230mm brick wall produces realistic U-value between 2 and 5 W/m2K."""
        u = ConductiveHeatTransfer.calculate_u_value(thickness=0.23, thermal_conductivity=0.8)
        self.assertTrue(1.5 <= u <= 3.5)

    def test_conduction_heat_flow_linear_delta_t(self):
        """Heat flow scales linearly with temperature difference."""
        q1 = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, temp_outside=30, temp_inside=20)
        q2 = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, temp_outside=40, temp_inside=20)
        self.assertAlmostEqual(q2, q1 * 2.0, places=2)

    def test_conduction_sign_convention(self):
        """Heat flow is positive when outdoor is hotter than indoor."""
        q_in = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, temp_outside=35, temp_inside=25)
        q_out = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, temp_outside=15, temp_inside=25)
        self.assertGreater(q_in, 0)
        self.assertLess(q_out, 0)

    def test_conduction_scales_with_area(self):
        """Heat flow scales linearly with area."""
        q1 = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, 30, 20)
        q2 = ConductiveHeatTransfer.calculate_heat_flow(300, 0.23, 0.8, 30, 20)
        self.assertAlmostEqual(q2, q1 * 3.0, places=2)

    def test_thicker_wall_reduces_u_value(self):
        """Increasing wall thickness reduces U-value."""
        u_thin = ConductiveHeatTransfer.calculate_u_value(0.10, 0.8)
        u_thick = ConductiveHeatTransfer.calculate_u_value(0.30, 0.8)
        self.assertLess(u_thick, u_thin)

    def test_insulation_conductivity_impact(self):
        """Low conductivity (insulation) dramatically lowers U-value."""
        u_brick = ConductiveHeatTransfer.calculate_u_value(0.10, 0.8)
        u_eps = ConductiveHeatTransfer.calculate_u_value(0.10, 0.04)
        self.assertLess(u_eps, u_brick * 0.3)

    def test_zero_delta_t_zero_heat_flow(self):
        """No heat flow when outdoor and indoor temperatures are equal."""
        q = ConductiveHeatTransfer.calculate_heat_flow(100, 0.23, 0.8, 25, 25)
        self.assertEqual(q, 0.0)

    # Convection Tests (4)
    def test_convection_wind_speed_dependent(self):
        """Convection coefficient increases with wind speed."""
        h_calm = ConvectiveHeatTransfer.calculate_convection_coefficient(wind_speed=1.0)
        h_windy = ConvectiveHeatTransfer.calculate_convection_coefficient(wind_speed=5.0)
        self.assertGreater(h_windy, h_calm)

    def test_convection_horizontal_vs_vertical(self):
        """Horizontal surfaces have higher convection correlation than vertical."""
        h_v = ConvectiveHeatTransfer.calculate_convection_coefficient(wind_speed=3.0, surface_type="vertical")
        h_h = ConvectiveHeatTransfer.calculate_convection_coefficient(wind_speed=3.0, surface_type="horizontal")
        self.assertGreater(h_h, h_v)

    def test_convection_heat_flow_direction(self):
        """Positive convective heat flow into shelter when outdoor hotter."""
        q = ConvectiveHeatTransfer.calculate_heat_flow(100, h_coefficient=20, temp_outside=32, temp_inside=25)
        self.assertGreater(q, 0)

    def test_convection_linear_with_area(self):
        """Convective heat flow doubles when surface area doubles."""
        q1 = ConvectiveHeatTransfer.calculate_heat_flow(50, 15, 30, 20)
        q2 = ConvectiveHeatTransfer.calculate_heat_flow(100, 15, 30, 20)
        self.assertAlmostEqual(q2, q1 * 2.0, places=2)

    # Radiation Tests (7)
    def test_stefan_boltzmann_constant(self):
        """Stefan-Boltzmann constant matches physical standard 5.67e-8."""
        self.assertAlmostEqual(STEFAN_BOLTZMANN, 5.67e-8)

    def test_radiation_stefan_boltzmann_t4(self):
        """Radiative heat flow follows Stefan-Boltzmann T^4 law."""
        # 300K vs 290K
        q = RadiativeHeatTransfer.calculate_heat_flow(100, 0.90, temp_surface_celsius=26.85, temp_surrounding_celsius=16.85)
        self.assertGreater(q, 0)

    def test_radiation_equilibrium_zero_flow(self):
        """Identical temperatures produce zero net radiation exchange."""
        q = RadiativeHeatTransfer.calculate_heat_flow(100, 0.90, 25.0, 25.0)
        self.assertEqual(q, 0.0)

    def test_radiation_emissivity_scaling(self):
        """Radiative heat flow scales linearly with surface emissivity."""
        q_low = RadiativeHeatTransfer.calculate_heat_flow(100, 0.45, 35.0, 20.0)
        q_high = RadiativeHeatTransfer.calculate_heat_flow(100, 0.90, 35.0, 20.0)
        self.assertAlmostEqual(q_high, q_low * 2.0, places=2)

    def test_surface_temp_approximation(self):
        """Surface temperature approximation rises with higher solar radiation."""
        t_low = RadiativeHeatTransfer.approximate_surface_temperature(30.0, solar_radiation=200, absorptivity=0.8)
        t_high = RadiativeHeatTransfer.approximate_surface_temperature(30.0, solar_radiation=800, absorptivity=0.8)
        self.assertGreater(t_high, t_low)

    def test_surface_temp_cool_roof_coating(self):
        """Low absorptivity (cool roof) significantly reduces surface temperature rise."""
        t_dark = RadiativeHeatTransfer.approximate_surface_temperature(35.0, 800, absorptivity=0.85)
        t_cool = RadiativeHeatTransfer.approximate_surface_temperature(35.0, 800, absorptivity=0.20)
        self.assertLess(t_cool, t_dark - 15.0)

    def test_night_sky_radiative_cooling(self):
        """Surface warmer than surroundings radiates net heat outward (negative flow)."""
        q = RadiativeHeatTransfer.calculate_heat_flow(100, 0.90, temp_surface_celsius=20.0, temp_surrounding_celsius=25.0)
        self.assertLess(q, 0)

    # Input Validation Tests (2)
    def test_invalid_conduction_inputs(self):
        """Zero or negative thickness/area raises ValueError."""
        with self.assertRaises(ValueError):
            ConductiveHeatTransfer.calculate_u_value(thickness=0, thermal_conductivity=0.8)
        with self.assertRaises(ValueError):
            ConductiveHeatTransfer.calculate_heat_flow(area=-50, thickness=0.23, thermal_conductivity=0.8, temp_outside=30, temp_inside=20)

    def test_invalid_emissivity_validation(self):
        """Emissivity outside [0, 1] raises ValueError."""
        with self.assertRaises(ValueError):
            RadiativeHeatTransfer.calculate_heat_flow(100, emissivity=1.5, temp_surface_celsius=30, temp_surrounding_celsius=20)


if __name__ == "__main__":
    unittest.main()
