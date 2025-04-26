def validate_capacity(capacity):
    return isinstance(capacity, int) and capacity >= 0 and capacity <= 50000  