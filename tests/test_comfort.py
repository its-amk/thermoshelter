"""Unit tests for Comfort metrics (25 tests)."""

import unittest
from core.comfort import (
    calculate_operative_temperature,
    estimate_mean_radiant_temperature,
    calculate_pmv,
    calculate_ppd,
    get_pmv_sensation,
    calculate_comfort_metrics,
    comfort_percentage,
    ComfortResult
)


class TestComfort(unittest.TestCase):
    """Test suite for ASHRAE 55 thermal comfort indices."""

    # Operative Temp Tests (4)
    def test_op_temp_equal_inputs(self):
        """Operative temp equals air temp when air and radiant temperatures match."""
        t_op = calculate_operative_temperature(24.0, 24.0, 0.5)
        self.assertEqual(t_op, 24.0)

    def test_op_temp_weighting(self):
        """Equal 0.5 fraction weights air and radiant temperatures equally."""
        t_op = calculate_operative_temperature(20.0, 30.0, 0.5)
        self.assertEqual(t_op, 25.0)

    def test_op_temp_radiant_fraction_boundaries(self):
        """Fraction of 0 and 1 correspond directly to air and radiant temps."""
        self.assertEqual(calculate_operative_temperature(20.0, 30.0, 0.0), 20.0)
        self.assertEqual(calculate_operative_temperature(20.0, 30.0, 1.0), 30.0)

    def test_op_temp_invalid_fraction(self):
        """Fraction outside [0, 1] raises ValueError."""
        with self.assertRaises(ValueError):
            calculate_operative_temperature(20.0, 30.0, 1.2)

    # MRT Tests (2)
    def test_mrt_average_surfaces(self):
        """MRT is calculated as the mean of surrounding surface temperatures."""
        surfaces = {"wall": 22.0, "roof": 26.0, "floor": 24.0}
        mrt = estimate_mean_radiant_temperature(20.0, surfaces)
        self.assertEqual(mrt, 24.0)

    def test_mrt_empty_surfaces_fallback(self):
        """Empty surface dict falls back to air temperature."""
        mrt = estimate_mean_radiant_temperature(23.5, {})
        self.assertEqual(mrt, 23.5)

    # PMV Tests (7)
    def test_pmv_neutral_condition(self):
        """Neutral operative temp (22°C standard) produces PMV of 0.0."""
        pmv = calculate_pmv(22.0, metabolic_rate=1.0)
        self.assertAlmostEqual(pmv, 0.0, places=2)

    def test_pmv_positive_for_warm(self):
        """Operative temp above neutral gives positive PMV."""
        pmv = calculate_pmv(28.0)
        self.assertGreater(pmv, 0.0)

    def test_pmv_negative_for_cold(self):
        """Operative temp below neutral gives negative PMV."""
        pmv = calculate_pmv(16.0)
        self.assertLess(pmv, 0.0)

    def test_pmv_bounded_at_plus_minus_3(self):
        """Extreme temperatures are clamped within [-3.0, +3.0]."""
        self.assertEqual(calculate_pmv(50.0), 3.0)
        self.assertEqual(calculate_pmv(-10.0), -3.0)

    def test_pmv_higher_metabolism_increases_warmth(self):
        """Higher metabolic rate shifts PMV upward."""
        pmv_sedentary = calculate_pmv(26.0, metabolic_rate=0.8)
        pmv_active = calculate_pmv(26.0, metabolic_rate=1.5)
        self.assertNotEqual(pmv_sedentary, pmv_active)

    def test_pmv_invalid_metabolic_rate(self):
        """Zero or negative metabolic rate raises ValueError."""
        with self.assertRaises(ValueError):
            calculate_pmv(24.0, metabolic_rate=-1.0)

    def test_pmv_invalid_clothing_resistance(self):
        """Negative clothing insulation raises ValueError."""
        with self.assertRaises(ValueError):
            calculate_pmv(24.0, clothing_resistance=-0.5)

    # PPD Tests (5)
    def test_ppd_minimum_at_neutral(self):
        """At PMV = 0, PPD is exactly 5% (Fanger physiological limit)."""
        ppd = calculate_ppd(0.0)
        self.assertAlmostEqual(ppd, 5.0, places=1)

    def test_ppd_symmetric_around_zero(self):
        """PPD is symmetric for equal positive and negative PMV."""
        ppd_pos = calculate_ppd(1.0)
        ppd_neg = calculate_ppd(-1.0)
        self.assertAlmostEqual(ppd_pos, ppd_neg, places=2)

    def test_ppd_increases_with_pmv(self):
        """Dissatisfaction increases monotonically with distance from PMV 0."""
        self.assertLess(calculate_ppd(0.5), calculate_ppd(1.0))
        self.assertLess(calculate_ppd(1.0), calculate_ppd(2.0))

    def test_ppd_at_pmv_extreme(self):
        """PPD approaches near 100% at PMV = ±3.0."""
        ppd = calculate_ppd(3.0)
        self.assertGreater(ppd, 95.0)

    def test_ppd_invalid_pmv_input(self):
        """PMV outside [-3, 3] raises ValueError."""
        with self.assertRaises(ValueError):
            calculate_ppd(4.0)

    # Sensation & Comfort Metrics Tests (5)
    def test_sensation_strings(self):
        """Sensation descriptions match standard scale."""
        self.assertEqual(get_pmv_sensation(-2.5), "Very Cold")
        self.assertEqual(get_pmv_sensation(-1.5), "Cold")
        self.assertEqual(get_pmv_sensation(0.0), "Neutral")
        self.assertEqual(get_pmv_sensation(1.5), "Hot")
        self.assertEqual(get_pmv_sensation(2.5), "Very Hot")

    def test_comfort_metrics_in_zone(self):
        """24°C operative temperature falls within ASHRAE 55 comfort zone."""
        res = calculate_comfort_metrics(24.0)
        self.assertTrue(res.in_comfort_zone)
        self.assertLess(res.ppd, 20.0)

    def test_comfort_metrics_too_hot(self):
        """32°C operative temp falls outside ASHRAE 55 comfort zone."""
        res = calculate_comfort_metrics(32.0)
        self.assertFalse(res.in_comfort_zone)
        self.assertGreater(res.ppd, 20.0)

    def test_comfort_metrics_too_cold(self):
        """17°C operative temp falls outside comfort zone."""
        res = calculate_comfort_metrics(17.0)
        self.assertFalse(res.in_comfort_zone)

    def test_comfort_result_dataclass(self):
        """calculate_comfort_metrics returns a valid ComfortResult."""
        res = calculate_comfort_metrics(24.0)
        self.assertTrue(isinstance(res, ComfortResult))

    # Comfort Percentage Tests (2)
    def test_comfort_percentage_calculation(self):
        """Calculates accurate comfort percentage over diurnal series."""
        temps = [24.0, 24.5, 25.0, 30.0]  # 3 in zone (22-26), 1 out
        pct, comp, discomp = comfort_percentage(temps)
        self.assertEqual(pct, 75.0)
        self.assertEqual(comp, 3)
        self.assertEqual(discomp, 1)

    def test_comfort_percentage_empty_list(self):
        """Empty temperatures list returns zeros."""
        self.assertEqual(comfort_percentage([]), (0.0, 0, 0))


if __name__ == "__main__":
    unittest.main()
