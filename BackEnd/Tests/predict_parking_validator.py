from datetime import datetime
def validate_prediction(time, tags):
    return time >= datetime(2025, 3, 24) and isinstance(tags, list) and len(tags) > 0
    