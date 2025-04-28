import unittest
from parking_rate_validator import validate_parking_rate

class TestParkingRateValidation(unittest.TestCase):
    def test_valid_lot_oncampus(self):
        self.assertTrue(validate_parking_rate("Union_lot"))

    def test_invalid_lot_offcampus(self):
        self.assertFalse(validate_parking_rate("Bricktown_lot"))

    def test_boundary_invalid_string(self):
        self.assertFalse(validate_parking_rate("UnionGarage"))

    def test_edge_valid_string_ending(self):
        self.assertTrue(validate_parking_rate("Union_lot"))

if __name__ == "__main__":
    unittest.main()