def validate_location(location):
    return isinstance(location, str) and bool(location) and len(location) <= 255