import unittest
from dropoff_locations import dropoff_locations

class TestDropoffLocations(unittest.TestCase):
    def test_valid_dropoff_locations(self):
        self.assertTrue(dropoff_locations(self) == {"Asp Avenue, Elm Avenue"})
    
    def test_invalid_dropoff_locations(self):
        self.assertFalse(dropoff_locations(self) == {"Linsey Street, Elm Avenue"})

if __name__ == "__main__":
    unittest.main()
    