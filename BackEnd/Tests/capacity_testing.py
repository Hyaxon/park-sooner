import unittest
from lot_capacity_validator import validate_capacity

class TestCapacityValidation(unittest.TestCase):
    def test_valid_capcity(self):
        self.assertTrue(validate_capacity(10))
    def test_invalid_negative_capacity(self):
        self.assertFalse(validate_capacity(-10))
    def test_invalid_extreme_capacity(self):
        self.assertFalse(validate_capacity(2147483647))
    def test_invalid_string_capacity(self):
        test = "FULL"
        self.assertFalse(validate_capacity(test))
    def test_invalid_double_capacity(self):
        self.assertFalse(validate_capacity(3.5))

if __name__ == "__main__":
    unittest.main()
