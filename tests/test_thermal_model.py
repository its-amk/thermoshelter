"""Unit tests for ThermalModel and Integration (29 tests)."""

import unittest
from core.thermal_model import ThermalModel, estimate_indoor_temperature


class TestThermalModel(unittest.TestCase):
    """Test suite for basic and integrated thermal modeling."""

    def setUp(self):
        self.model = ThermalModel()

    # Constants & Initialization (3)
    def test_model_constants(self):
        """Physical constants initialized properly."""
        self.assertEqual(self.model.stefan_boltzmann, 5.67e-8)
        self.assertEqual(self.model.air_density, 1.2)
        self.assertEqual(self.model.air_specific_heat, 1005)

    def test_model_initialization(self):
        """ThermalModel initializes without errors."""
        self.assertIsNotNone(self.model)

    def test_composite_u_value_single_layer(self):
        """Single layer composite matches analytical sum."""
        u = self.model.calculate_u_value([0.8], [0.23])
        # R = 0.23/0.8 + 0.12 + 0.04 = 0.2875 + 0.16 = 0.4475 -> U ≈ 2.23
        self.assertAlmostEqual(u, 1.0 / 0.4475, places=2)

    # U-Value Calculations (6)
    def test_composite_u_value_multi_layer(self):
        """Multi-layer wall correctly sums internal resistances."""
        # Brick (0.23m, k=0.8) + EPS (0.05m, k=0.04)
        u = self.model.calculate_u_value([0.8, 0.04], [0.23, 0.05])
        r_expected = (0.23 / 0.8) + (0.05 / 0.04) + 0.16
        self.assertAlmostEqual(u, 1.0 / r_expected, places=2)

    def test_composite_u_value_positive(self):
        """Computed U-value is always positive."""
        u = self.model.calculate_u_value([1.4], [0.15])
        self.assertGreater(u, 0)

    def test_composite_u_value_reduces_with_insulation(self):
        """Adding insulation layer decreases composite U-value."""
        u_base = self.model.calculate_u_value([0.8], [0.23])
        u_insulated = self.model.calculate_u_value([0.8, 0.038], [0.23, 0.05])
        self.assertLess(u_insulated, u_base)

    def test_composite_u_value_scales_with_conductivity(self):
        """Higher conductivity material increases U-value."""
        u_brick = self.model.calculate_u_value([0.8], [0.23])
        u_concrete = self.model.calculate_u_value([1.4], [0.23])
        self.assertGreater(u_concrete, u_brick)

    def test_composite_u_value_surface_resistance_included(self):
        """Zero thickness still accounts for surface resistances (0.16 m2K/W)."""
        u = self.model.calculate_u_value([1.0], [0.0])
        self.assertAlmostEqual(u, 1.0 / 0.16, places=2)

    def test_composite_u_value_symmetric_layers(self):
        """Order of layers does not alter total series thermal resistance."""
        u1 = self.model.calculate_u_value([0.8, 0.04], [0.20, 0.05])
        u2 = self.model.calculate_u_value([0.04, 0.8], [0.05, 0.20])
        self.assertAlmostEqual(u1, u2, places=4)

    # Heat Loss Calculations (6)
    def test_heat_loss_linear_scaling(self):
        """Heat loss scales linearly with surface area."""
        loss1 = self.model.calculate_heat_loss(2.2, 100, indoor_temp=25, outdoor_temp=15)
        loss2 = self.model.calculate_heat_loss(2.2, 200, indoor_temp=25, outdoor_temp=15)
        self.assertAlmostEqual(loss2, loss1 * 2.0)

    def test_heat_loss_zero_delta(self):
        """Zero heat loss when indoor and outdoor temperatures match."""
        loss = self.model.calculate_heat_loss(2.2, 100, 24, 24)
        self.assertEqual(loss, 0.0)

    def test_heat_loss_sign_convention(self):
        """Positive heat loss when indoor is hotter than outdoor (heat leaving)."""
        loss_winter = self.model.calculate_heat_loss(2.2, 100, indoor_temp=22, outdoor_temp=10)
        loss_summer = self.model.calculate_heat_loss(2.2, 100, indoor_temp=25, outdoor_temp=40)
        self.assertGreater(loss_winter, 0)
        self.assertLess(loss_summer, 0)

    def test_heat_loss_doubled_delta_t(self):
        """Doubling delta T doubles heat loss rate."""
        loss1 = self.model.calculate_heat_loss(2.0, 100, 25, 20)
        loss2 = self.model.calculate_heat_loss(2.0, 100, 25, 15)
        self.assertAlmostEqual(loss2, loss1 * 2.0)

    def test_heat_loss_proportional_to_u_value(self):
        """Heat loss is directly proportional to U-value."""
        loss1 = self.model.calculate_heat_loss(1.5, 100, 25, 15)
        loss2 = self.model.calculate_heat_loss(3.0, 100, 25, 15)
        self.assertAlmostEqual(loss2, loss1 * 2.0)

    def test_heat_loss_independent_of_absolute_scale(self):
        """Heat loss depends only on difference (ΔT), not base offset."""
        loss1 = self.model.calculate_heat_loss(2.0, 100, 20, 10)
        loss2 = self.model.calculate_heat_loss(2.0, 100, 30, 20)
        self.assertEqual(loss1, loss2)

    # Solar Gain Calculations (4)
    def test_solar_gain_proportional_to_irradiance(self):
        """Solar gain scales directly with incident irradiance."""
        gain1 = self.model.calculate_solar_gain(400, 100, absorptivity=0.7)
        gain2 = self.model.calculate_solar_gain(800, 100, absorptivity=0.7)
        self.assertAlmostEqual(gain2, gain1 * 2.0)

    def test_solar_gain_proportional_to_absorptivity(self):
        """Higher absorptivity yields higher solar gain."""
        gain_white = self.model.calculate_solar_gain(800, 100, absorptivity=0.2)
        gain_dark = self.model.calculate_solar_gain(800, 100, absorptivity=0.8)
        self.assertAlmostEqual(gain_dark, gain_white * 4.0)

    def test_solar_gain_zero_irradiance(self):
        """Zero solar irradiance produces zero heat gain."""
        self.assertEqual(self.model.calculate_solar_gain(0, 100), 0.0)

    def test_solar_gain_default_absorptivity(self):
        """Default absorptivity is 0.70."""
        gain = self.model.calculate_solar_gain(1000, 10)
        self.assertAlmostEqual(gain, 7000.0)

    # Thermal Mass Calculations (5)
    def test_thermal_mass_storage_formula(self):
        """Storage Q = mass * c * delta T."""
        # 50,000 kg * 840 J/kgK * 5 K = 210,000,000 J
        storage = self.model.calculate_thermal_mass_effect(50000, 840, temp_swing=5)
        self.assertEqual(storage, 210000000.0)

    def test_thermal_mass_linear_with_mass(self):
        """Heat storage capacity scales linearly with mass."""
        s1 = self.model.calculate_thermal_mass_effect(10000, 840, 5)
        s2 = self.model.calculate_thermal_mass_effect(20000, 840, 5)
        self.assertEqual(s2, s1 * 2.0)

    def test_thermal_mass_zero_swing(self):
        """Zero temperature swing results in zero net heat storage change."""
        self.assertEqual(self.model.calculate_thermal_mass_effect(50000, 840, 0), 0.0)

    def test_thermal_mass_higher_specific_heat(self):
        """Higher specific heat capacity increases heat storage."""
        s_brick = self.model.calculate_thermal_mass_effect(10000, 840, 5)
        s_water = self.model.calculate_thermal_mass_effect(10000, 4184, 5)
        self.assertGreater(s_water, s_brick)

    def test_thermal_mass_damping_effect(self):
        """Higher mass effect lowers estimated peak indoor temperature."""
        t_low_mass = estimate_indoor_temperature(30, solar_gain=5000, heat_loss_coeff=1000, mass_effect=1.0)
        t_high_mass = estimate_indoor_temperature(30, solar_gain=5000, heat_loss_coeff=1000, mass_effect=4.0)
        self.assertLess(t_high_mass, t_low_mass)

    # Fundamental Physics & Conservation (5)
    def test_indoor_estimation_heat_loss_zero_fallback(self):
        """Zero heat loss coefficient safely returns outdoor temp without zero-division error."""
        t = estimate_indoor_temperature(30.0, 5000, heat_loss_coeff=0, mass_effect=0)
        self.assertEqual(t, 30.0)

    def test_indoor_estimation_balance(self):
        """No solar gain and zero mass effect gives outdoor temperature."""
        t = estimate_indoor_temperature(28.0, solar_gain=0, heat_loss_coeff=1000, mass_effect=0)
        self.assertEqual(t, 28.0)

    def test_first_law_energy_conservation(self):
        """Heat flow from hot to cold conserves energy magnitude."""
        loss_forward = self.model.calculate_heat_loss(2.0, 100, 30, 20)
        loss_reverse = self.model.calculate_heat_loss(2.0, 100, 20, 30)
        self.assertEqual(loss_forward, -loss_reverse)

    def test_no_perpetual_motion(self):
        """Energy cannot be generated spontaneously from zero delta T."""
        loss = self.model.calculate_heat_loss(2.0, 100, 25, 25)
        gain = self.model.calculate_solar_gain(0, 100)
        mass = self.model.calculate_thermal_mass_effect(50000, 840, 0)
        self.assertEqual(loss + gain + mass, 0.0)

    def test_second_law_heat_flow_direction(self):
        """Heat flows spontaneously only from higher to lower temperature."""
        flow = self.model.calculate_heat_loss(2.0, 100, indoor_temp=28, outdoor_temp=20)
        self.assertGreater(flow, 0)


if __name__ == "__main__":
    unittest.main()
