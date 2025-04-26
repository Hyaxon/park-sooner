import unittest
from permitID_validator import validate_permitID

class TestPermit_ID_Validation(unittest.TestCase):
    def test_valid_permitID(self):
        self.assertTrue(validate_permitID("validPermitID"))
    def test_empty_permitID(self):
        self.assertFalse(validate_permitID(""))
    def test_max_length_permitID(self):
        max_length_permitID = "a" * 255
        self.assertTrue(validate_permitID(max_length_permitID))
    def test_exceeding_max_length_permitID(self):
        exceeding_length_permitID = "a" * 256
        self.assertFalse(validate_permitID(exceeding_length_permitID))
    def test_non_string_permitID(self):
        self.assertFalse(validate_permitID(123))

if __name__ == "__main__":
    unittest.main()