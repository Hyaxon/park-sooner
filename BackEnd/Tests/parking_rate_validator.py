validLotsOnCampus = {"Union_lot", "Asp_lot", "Jenkins_lot", "Elm_lot", "Timberdell_lot"} #using set

def validate_parking_rate(parkingLot):
    return isinstance(parkingLot, str) and parkingLot.endswith("_lot") and parkingLot in validLotsOnCampus