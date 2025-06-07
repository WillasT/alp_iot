import time
import pyfirmata
import serial
import firebase_admin
from firebase_admin import credentials, db

# Initialize connection to Firebase
cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://alpiot-a0c3a-default-rtdb.firebaseio.com/'
})

# Connect to Arduino
ser = serial.Serial('/dev/cu.usbmodem11301', 9600, timeout=1)  # adjust port accordingly
time.sleep(2)  # wait for connection to stabilize

def parse_sensor_line(line):
    try:
        parts = line.strip().split('|')
        temp = float(parts[0].split(':')[1])
        water = int(parts[1].split(':')[1])
        return temp, water
    except:
        return None, None
    
def send_control_to_arduino():
    control = db.reference("manualControl").get()

    mode = control.get("mode", {})
    trigger = control.get("trigger", {})

    mode_cmd = f"MODE:light={int(mode.get('light', 0))},feed={int(mode.get('feed', 0))},water={int(mode.get('water', 0))}\n"
    trigger_cmd = f"TRIGGER:light={int(trigger.get('light', 0))},feed={int(trigger.get('feed', 0))},water={int(trigger.get('water', 0))}\n"

    ser.write(mode_cmd.encode())
    time.sleep(0.2)
    ser.write(trigger_cmd.encode())
    time.sleep(0.2)

    # Reset trigger flags
    db.reference("manualControl/trigger").set({
        "light": False,
        "feed": False,
        "water": False
    })

while True:
    line = ser.readline().decode('utf-8').strip()
    if line:
        temperature, water_level = parse_sensor_line(line)
        if temperature is not None and water_level is not None:
            print(f"Temperature: {temperature}°C | Water Level: {water_level}%")
            sensor_data = {
                'temperature': temperature,
                'waterLevel': int((water_level / 1023.0) * 100)  # Convert to percentage
            }
            db.reference('sensorData').set(sensor_data)
    
    send_control_to_arduino()
    
    time.sleep(1)