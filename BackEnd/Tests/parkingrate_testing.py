import unittest
from parkingrate_validator import validate_parking_rate

class TestParkingRateValidation(unittest.TestCase):
    def test_valid_lot_oncampus(self):
        self.assertTrue(validate_parking_rate("Elm_lot"))
    def test_invalid_lot_offcampus(self):
        self.assertFalse(validate_parking_rate("Bricktown_lot"))
    def test_boundary_invalid_string_ending(self):
        self.assertFalse(validate_parking_rate("union"))
    def test_edge_valid_string_case_insensitive(self):
        self.assertTrue(validate_parking_rate("jEnKiNs_LOT")) 
    def test_empty_string(self):
        self.assertFalse(validate_parking_rate(""))

if __name__ == "__main__":
    unittest.main()