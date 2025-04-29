# ParkSooner
## Product Overview
This interactive parking map of the OU campus allows users (mainly OU students, faculty, and visitors) to find available parking spots to make OU Parking faster,
simpler, and less stressful. We do this by having the app display open spaces and AI predictive models to anticipate parking availability. 

## Prerequisite Installations
### Python3 - 3.13.1
1. Go to [https://www.python.org](url) and download the correct version for your device.
2. Once downloaded, open the file and follow the pop-up instructions.
3. To ensure it is properly downloaded, launch cmd prompt and type in "python --version". It should show that you have it downloaded by showing the current version installed.

### Node.js - 22.15.0
1. Go to the to the link [https://nodejs.org](url) and download the correct version for your device
2. Download the Long-Term Support version that is recommended for most users. 
3. Once downloaded, open the file and follow the installation instructions 
4. To ensure it is properly downloaded, open your terminal and check if Node.js is installed by typing: “node -v” 

### Git - 2.43.0.windows.1 | 2.48.1 (MacOS)
1. Go to [https://git-scm.com/downloads](url) and download the correct version for your device.
2. Once downloaded, open the file and follow the pop-up instructions.
3. To ensure it is properly downloaded, launch cmd prompt and type in "git --version". It should show that you have it downloaded by showing the current version installed.

### Expo Go 
- **iOS**: Install from App Store
- **Android**: Install from Google Play


### Packages
**OpenCV:** 4.11.0

## Project Installation
1. Clone the project to a local installation using ``git clone`` through SSH or HTTPS.
2. Create a Python virtual environment within the project BackEnd directory. \
    ``python -m venv env`` (Windows) \
    ``python3 -m venv env`` (MacOS/Linux)
3. Activate the virtual environment. \
    ``env\Scripts\activate.bat`` or ``env\Scripts\activate`` (Windows) \
    ``source env/bin/activate`` (MacOS/Linux)
4. Install required packages according to requirements.txt while the environment is active. \
    ``pip install -r requirements.txt``
5. Deactivate the virtual environment when done. \
    ``deactivate``     
   
## Usage Guide
1. Open **Visual Studio Code**.
2. Go to **File > Open Folder** and select the folder where you extracted the ParkSooner `.zip` file.
3. Open the **Terminal** (Terminal > New Terminal) or use **Command Prompt**.
4. In the terminal, install dependencies:
   ```bash
   npm install
5. Copy the path to the ParkSooner_App folder (e.g., ../../Park-Sooner/FrontEnd/ParkSooner_App).
6. Navigate to the app directory
7. Start the Expo project:
    ```bash
    npx expo start
8. Open the Expo Go App on your mobile device.
9. Use your device’s camera to scan the QR code displayed in the terminal or browser.
10. The ParkSooner App will open on your device through Expo Go.

## Configuration
For regular use, no configuration is neccessary. Admin access requires Google Sign-In.

## Contributing Guidelines

## License
By using this software, you agree to comply with all University of Oklahoma parking regulations. The development team assumes no liability for parking violations or penalties.
