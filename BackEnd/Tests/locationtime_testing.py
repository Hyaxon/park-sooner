import unittest
from locationtime_validator import validate_time_between_locations

class TestTimeBetweenLocationsValidation(unittest.TestCase):
    def test_valid_time(self):
        self.assertTrue(validate_time_between_locations(60))  
    def test_zero_time(self):
        self.assertFalse(validate_time_between_locations(0))
    def test_negative_time(self):
        self.assertFalse(validate_time_between_locations(-5))
    def test_max_valid_time(self):
        self.assertTrue(validate_time_between_locations(1440))
    def test_exceeding_max_time(self):
        self.assertFalse(validate_time_between_locations(1441))
    def test_non_integer_time(self):
        self.assertFalse(validate_time_between_locations("60"))  

if __name__ == '__main__':
    unittest.main()