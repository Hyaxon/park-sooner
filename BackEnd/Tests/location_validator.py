def validate_location(location): # This function checks if the location is a valid string.
    return isinstance(location, str) and bool(location) and len(location) <= 255