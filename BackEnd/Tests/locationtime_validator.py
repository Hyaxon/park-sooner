def validate_time_between_locations(time):
    return isinstance(time, int) and 0 < time <= 1440