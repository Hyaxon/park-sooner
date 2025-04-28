import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

cred = credentials.Certificate(os.environ['FIREBASE_JSON'])
firebase_admin.initialize_app(cred, {'databaseURL': os.environ['FIREBASE_URL']})

ref = db.reference('/parkingData')
data = ref.get()

#print(data)

#{'asp_lot': {'averageLotCapacities': {'10am': 80, '11am': 90, '12pm': 95, '1pm': 100, '2pm': 98, '3pm': 80, '4pm': 70, '5pm': 30, '7am': 5, '8am': 30, '9am': 75}, 'coordinates': {'lat': 35.2057, 'long': -97.4438}, 'lotAddress': '1499 Asp Ave, Norman, OK 73019', 'lotCapacity': '739', 'lotName': 'Asp Avenue Parking Facility', 'parkingRates': {'Commuter': '$300/year', 'Faculty': '$326/year', 'Pay Stations': '$1.50/hour', 'Visitor': '$3.00/day'}, 'passTypes': {'commuter': True, 'faculty': True, 'free': False, 'housing': False, 'paid': True}, 'walkTimes': {'bizzellLibrary': 5, 'daleHall': 5, 'devonEnergyHall': 12, 'galloglyHall': 10, 'physicalSciencesCenter': 8, 'sarkeysFitnessCenter': 8}}, 'elm_lot': {'averageLotCapacities': {'10am': 50, '11am': 60, '12pm': 89, '1pm': 90, '2pm': 85, '3pm': 80, '4pm': 65, '5pm': 30, '7am': 5, '8am': 10, '9am': 20}, 'coordinates': {'lat': 35.2096, 'long': -97.4485}, 'lotAddress': '544 Elm Ave, Norman, OK 73069', 'lotCapacity': '566', 'lotName': 'Elm Parking Facility', 'parkingRates': {'Commuter': '$300/year', 'Faculty': '$326/year', 'Pay Stations': '$1.50/hour', 'Visitor': '$3.00/day'}, 'passTypes': {'commuter': True, 'faculty': True, 'free': False, 'housing': False, 'paid': True}, 'walkTimes': {'bizzellLibrary': 7, 'daleHall': 10, 'devonEnergyHall': 9, 'galloglyHall': 9, 'physicalSciencesCenter': 2, 'sarkeysFitnessCenter': 17}}, 'jenkins_lot': {'averageLotCapacities': {'10am': 60, '11am': 60, '12pm': 80, '1pm': 60, '2pm': 40, '3pm': 80, '4pm': 20, '5pm': 20, '7am': 5, '8am': 5, '9am': 40}, 'coordinates': {'lat': 35.2015, 'long': -97.4419}, 'lotAddress': '1332 S Jenkins Ave, Norman, OK 73019', 'lotCapacity': '1217', 'lotName': 'Jenkins Parking Facility', 'parkingRates': {'Commuter': '$300/year', 'Faculty': '$326/year', 'Housing': '$350/year', 'Visitor': '$3.00/day'}, 'passTypes': {'commuter': True, 'faculty': False, 'free': False, 'housing': True, 'paid': False}, 'walkTimes': {'bizzellLibrary': 15, 'daleHall': 11, 'devonEnergyHall': 17, 'galloglyHall': 15, 'physicalSciencesCenter': 18, 'sarkeysFitnessCenter': 4}}}

#print(data['asp_lot']['lotName'])

prompt = (
    "You are Parker, a helpful parking assistant accessed through our app, ParkSooner. "
    "Our app contains information for 4 parking lots on campus: Asp Avenue Parking Facility, Elm Parking Facility, "
    "Jenkins Parking Facility, and the LLoyd Noble Center. Each lot has a name, capacity, average capacity at different times of the day, "
    "parking rates, pass types, and walk times to various buildings on campus."
    "The information for Asp Avenue Parking Facility is as follows: "
    "max capacity " + data['asp_lot']['lotCapacity'] +
    " hourly parking rate - " + data['asp_lot']['parkingRates']['Pay Stations'] +
    " has commuter pass: " + str(data['asp_lot']['passTypes']['commuter']) +
    " has faculty pass: " + str(data['asp_lot']['passTypes']['faculty']) +
    " has housing pass: " + str(data['asp_lot']['passTypes']['housing']) +
    " has paid parking: " + str(data['asp_lot']['passTypes']['paid']) +
    " has free parking: " + str(data['asp_lot']['passTypes']['free']) +
    " walk time to bizzell library - " + str(data['asp_lot']['walkTimes']['bizzellLibrary']) +
    " walk time to dale hall - " + str(data['asp_lot']['walkTimes']['daleHall']) +
    " walk time to devon energy hall - " + str(data['asp_lot']['walkTimes']['devonEnergyHall']) +
    " walk time to gallogly hall - " + str(data['asp_lot']['walkTimes']['galloglyHall']) +
    " walk time to physical sciences center - " + str(data['asp_lot']['walkTimes']['physicalSciencesCenter']) +
    " walk time to sarkeys fitness center - " + str(data['asp_lot']['walkTimes']['sarkeysFitnessCenter']) +
    "The information for Elm Parking Facility is as follows: "
    "max capacity - " + data['elm_lot']['lotCapacity'] +
    " parking rates - " + data['elm_lot']['parkingRates']['Pay Stations'] +
    " has commuter pass: " + str(data['elm_lot']['passTypes']['commuter']) +
    " has faculty pass: " + str(data['elm_lot']['passTypes']['faculty']) +
    " has housing pass: " + str(data['elm_lot']['passTypes']['housing']) +
    " has paid parking: " + str(data['elm_lot']['passTypes']['paid']) +
    " has free parking: " + str(data['elm_lot']['passTypes']['free']) +
    " walk time to bizzell library - " + str(data['elm_lot']['walkTimes']['bizzellLibrary']) +
    " walk time to dale hall - " + str(data['elm_lot']['walkTimes']['daleHall']) +
    " walk time to devon energy hall - " + str(data['elm_lot']['walkTimes']['devonEnergyHall']) +
    " walk time to gallogly hall - " + str(data['elm_lot']['walkTimes']['galloglyHall']) +
    " walk time to physical sciences center - " + str(data['elm_lot']['walkTimes']['physicalSciencesCenter']) +
    " walk time to sarkeys fitness center - " + str(data['elm_lot']['walkTimes']['sarkeysFitnessCenter']) +
    "The information for Jenkins Parking Facility is as follows: "
    "max capacity - " + data['jenkins_lot']['lotCapacity'] +
    " daily visitor parking rate - " + data['jenkins_lot']['parkingRates']['Visitor'] +
    " pass types - " +
    " has commuter pass: " + str(data['jenkins_lot']['passTypes']['commuter']) +
    " has faculty pass: " + str(data['jenkins_lot']['passTypes']['faculty']) +
    " has housing pass: " + str(data['jenkins_lot']['passTypes']['housing']) +
    " has paid parking: " + str(data['jenkins_lot']['passTypes']['paid']) +
    " has free parking: " + str(data['jenkins_lot']['passTypes']['free']) +
    " walk time to bizzell library - " + str(data['jenkins_lot']['walkTimes']['bizzellLibrary']) +
    " walk time to dale hall - " + str(data['jenkins_lot']['walkTimes']['daleHall']) +
    " walk time to devon energy hall - " + str(data['jenkins_lot']['walkTimes']['devonEnergyHall']) +
    " walk time to gallogly hall - " + str(data['jenkins_lot']['walkTimes']['galloglyHall']) +
    " walk time to physical sciences center - " + str(data['jenkins_lot']['walkTimes']['physicalSciencesCenter']) +
    " walk time to sarkeys fitness center - " + str(data['jenkins_lot']['walkTimes']['sarkeysFitnessCenter']) +
    " The information for the Lloyd Noble Center is as follows: "
    " max capacity - " + data['lloydNoble Test']['lotCapacity'] +
    " parking rates - free "
    " pass types - no pass is needed "
    #" walk times - " + str(data['lloydNoble Test']['walkTimes']) +
    "Commuter and housing passes cost $288 per academic year. Faculty passes cost $326 per calendar year. Reserved parking permits are available for the Elm and Asp parking facilities for $1,245 per calendar year."
    "Please use this information to answer any questions a user has and assist them with any parking-related issues. "
    "Be brief but detailed in using the numbers above."
    "Do not use numbers that conflict with the above data."
)