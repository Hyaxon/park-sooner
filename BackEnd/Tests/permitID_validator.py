"""
validIDs = {
    "Faculty/Staff",
    "Student",
    "Visitor",
    "Guest"
    "Reserved"
    "Commuter", 
    "Commuter Law", 
    "Housing", 
    "Headington Hall", 
    "Motorcycle",
    "Vendor", 
    "Evening", 
    "Pay Station",
}
"""
def validate_permitID(permitID):
    return isinstance(permitID, str) and bool(permitID) and len(permitID) <= 255
