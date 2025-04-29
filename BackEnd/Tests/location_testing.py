import unittest
from location_validator import validate_location
# This unti test is designed to validate the functionality of the location validation function.
# The function checks if the input is a non-empty string and does not exceed 255 characters.
# The purpose of this test is to ensure that the function correctly identifies valid and invalid location strings.
class TestLocationValidation(unittest.TestCase):
    def test_valid_location(self):
        self.assertTrue(validate_location("validLocation"))  #This is a valid location string so it should return True
    def test_empty_location(self):
        self.assertFalse(validate_location("")) # An empty string is not a valid location, so it should return False
    def test_max_length_location(self):
        max_length_location = "a" * 255
        self.assertTrue(validate_location(max_length_location)) # A string of 255 characters is valid, so it should return True
    def test_exceeding_max_length_location(self):
        exceeding_length_location = "a" * 256
        self.assertFalse(validate_location(exceeding_length_location))  # A string of 256 characters exceeds the limit, so it should return False
    def test_non_string_location(self):
        self.assertFalse(validate_location(123)) # A non-string input is not valid, so it should return False

if __name__ == '__main__': # This allows the test to be run directly from the command line.
    unittest.main()