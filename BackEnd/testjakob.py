import unittest

def validate_location(location):
    return isinstance(location, str) and bool(location) and len(location) <= 255

def validate_time_between_locations(time):
    return isinstance(time, int) and 0 < time <= 1440

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
        self.assertFalse(validate_location(123))  # Ensuring only strings are allowed

class TestTimeBetweenLocationsValidation(unittest.TestCase):
    def test_valid_time(self):
        self.assertTrue(validate_time_between_locations(60))  # Example valid time
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






