import unittest
from predict_parking_validator import validate_prediction
from datetime import datetime

class TestPredictionValidation(unittest.TestCase):
    def test_invalid_input(self):
        time = datetime(2022, 1, 3)
        tags = ["Commuter"]
        self.assertFalse(validate_prediction(time, tags))
    def test_valid_datetime(self):
        time = datetime.now()
        tags = ["Resident"]
        self.assertTrue(validate_prediction(time, tags))
    def test_invalid_tags(self):
        time = datetime.now()
        tags = []
        self.assertFalse(validate_prediction(time, tags))
    def test_valid_tags(self):
        time = datetime.now()
        tags = ["Resident"]
        self.assertTrue(validate_prediction(time, tags))
        
if __name__ == '__main__':
    unittest.main()