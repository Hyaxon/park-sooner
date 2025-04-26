valid_lots = {"union_lot", "asp_lot", "jenkins_lot", "elm_lot"} #these will be stored in firebase

#tests if parking lot is on campus, if it's a string, if it ends with_lot, and accounts for case insensitivity
def validate_parking_rate(lot):
    return isinstance(lot, str) and lot.lower().endswith("_lot") and lot.lower() in valid_lots