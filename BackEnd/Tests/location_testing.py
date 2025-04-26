import unittest
from location_validator import validate_location

class TestLocationValidation(unittest.TestCase):
    def test_valid_location(self):
        self.assertTrue(validate_location("validLocation"))
    def test_empty_location(self):
        self.assertFalse(validate_location(""))
    def test_max_length_location(self):
        max_length_location = "a" * 255
        self.assertTrue(validate_location(max_length_location))
    def test_exceeding_max_length_location(self):
        exceeding_length_location = "a" * 256
        self.assertFalse(validate_location(exceeding_length_location))
    def test_non_string_location(self):
        self.assertFalse(validate_location(123)) 

if __name__ == '__main__':
    unittest.main()