class Campus: 
    def __init__(self, name, city, state):
        self.name = name
        self.city = city
        self.state = state
        self.country = "USA" #default until indicated otherwise
        self.lots = []  # list of Lots
        self.buildings = []  # list of Buildings
        self.pass_types = None # list of available parking pass designations

class Lot:  # Lot class connects the levels. If only one level, this is just for basic info and walk times
    def __init__(self, name, num_levels, occupancy): 
        self.name = name
        self.levels = [Level(name, 10, 20) for i in range(num_levels)] # default sizes per level, can be changed/deleted. May also implement default depending on occupancy/ # levels
        self.occupancy = occupancy
        self.pass_types = None # list of available parking pass designations
        
class Level:    # Levels contain specific parking spaces. For now they are just a grid, but that may not work everywhere
    def __init__(self, name, x, y):
        self.name = name   # it's called name but probably just an int
        self.spots = [[Spot(x, y) for y in range(y)] for x in range(x)]
        self.pass_types = None    # parking classifications available (ideally w/ # of each)

class Spot:
    def __init__(self, x, y):
        self.x = x
        self.y = y
        self.isOccupied = False
        self.tags = []  # parking classifications (handicap, faculty, resident, etc.)
        
class Building:
    def __init__(self, name):
        self.name = name
        self.walk_times = None    # will be a dictionary w/ hard-coded walk times to each lot

# example output
duck_pond_example = Lot("Duck Pond", 1, 200) 
print(duck_pond_example.name)
for row in duck_pond_example.levels[0].spots:
    for spot in row:
        print(f"Spot ({spot.x}, {spot.y}) | Occupied: {spot.isOccupied}")