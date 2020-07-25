#!/usr/bin/python
import time 
import math
import datetime
from flask import jsonify
from flask import request
from flask import Flask, render_template
import random
from smbus import SMBus
import sys
from as7265x import AS7265X
from time import sleep
  

app = Flask(__name__)

i2c = SMBus(1)
sensor = AS7265X(i2c)

if not sensor.begin():
    print("Error : Device not connected.")
    sys.exit()

print("SoftReset!")
sensor.softReset()
time.sleep(2)



labelsSpectrumA = [
    'A', 'B', 'C', 'D','E', 'F', 'G', 'H','R', 
    'I', 'S', 'J','T', 'U', 'V', 'W', 'K','L'
]

labelsSpectrum = [
    '410', '435', '460', '485','510', '535', '560', '585','610', 
    '645', '680', '705','730', '760', '810', '860', '900','940'
]

labelsSpectrumCal = [
    '410', '435', '460', '485','510', '535', '560', '585','610', 
    '645', '680', '705','730', '760', '810', '860', '900','940'
]
values = [

]

@app.route('/')
def readAll():
	now = datetime.datetime.now()
	timeString = now.strftime("%Y-%m-%d %H:%M")
	deviceType = sensor.getDeviceType()
	hardwareVersion = sensor.getHardwareVersion()
	MajorFirmwareVersion = sensor.getMajorFirmwareVersion()
	patchFirmwareVersion = sensor.getPatchFirmwareVersion()
	BuildFirmwareVersion = sensor.getBuildFirmwareVersion()
	tempAS72651 = sensor.getTemperature(0)
	tempAS72652 = sensor.getTemperature(1)
	tempAS72653 = sensor.getTemperature(2)
	tempAverage = sensor.getTemperatureAverage()
		
	print("Device type:{:X}".format(sensor.getDeviceType()))
	print("HW Version:{:X}".format(sensor.getHardwareVersion()))
	print("FW Major version:{:d}".format(sensor.getMajorFirmwareVersion()))
	print("FW Patch version:{:d}".format(sensor.getPatchFirmwareVersion()))
	print("FW Build version:{:d}".format(sensor.getBuildFirmwareVersion()))
	print("Temperature-AS72651:{:d}".format(sensor.getTemperature(0)))
	print("Temperature-AS72652:{:d}".format(sensor.getTemperature(1)))
	print("Temperature-AS72653:{:d}".format(sensor.getTemperature(3)))
	print("Average temperature:{:.2f}".format(sensor.getTemperatureAverage()))

	templateData = {
		'Title' : 'Tunik Spectrometer Dashboard ',
		'time': timeString,
		'deviceType': deviceType,
		'hardwareVersion': hardwareVersion,
		'MajorFirmwareVersion': MajorFirmwareVersion,
		'patchFirmwareVersion': patchFirmwareVersion,
		'BuildFirmwareVersion': BuildFirmwareVersion,
		'tempAS72651': tempAS72651,
		'tempAS72652': tempAS72652,
		'tempAS72653': tempAS72653,
		'tempAverage': tempAverage
		}
	return render_template('index.html', **templateData)

	
@app.route('/GetAS7265x')
def ReadCalibratedTempRecord():
	time.sleep(1)
	print("takeMeasurements Continuous")
	print("    Mode:6ch continuous")
	print("    Gain:64X")
	print("    IntegrationCycle:1")
	print("Calibrated value (Raw value)")
	sensor.setMeasurementMode(2)
	sensor.enableBulb(0)
	sensor.enableBulb(1)
	sensor.enableBulb(2)
	sensor.disableIndicator()
	sensor.setIntegrationCycles(1)

	G = sensor.getG()
	H = sensor.getH()
	I = sensor.getI()
	J = sensor.getJ()
	K = sensor.getK()
	L = sensor.getL()
	
	R = sensor.getR()
	S = sensor.getS()
	T = sensor.getT()
	U = sensor.getU()
	V = sensor.getV()
	W = sensor.getW()
	
	A = sensor.getA()
	B = sensor.getB()
	C = sensor.getC()
	D = sensor.getD()
	E = sensor.getE()
	F = sensor.getF()
	
	# bar_labels=labelsSpectrumA
	bar_values= [ A, B, C, D, E, F, G, H, R, I, S, J, T , U, V, W, K, L]
	
	return jsonify(bar_values)
	   
@app.route('/GetCalibrated18CHanSpectrum')
def ReadTemperature():
						#puts sensor in active mode
	time.sleep(1)
	sensor.setGain(3)
	sensor.setMeasurementMode(0)
	sensor.takeMeasurementsWithBulb()
	
	Cal_G = sensor.getCalibratedG()
	Cal_H = sensor.getCalibratedH()
	Cal_I = sensor.getCalibratedI()
	Cal_J = sensor.getCalibratedJ(),
	Cal_K = sensor.getCalibratedK()
	Cal_L = sensor.getCalibratedL()
	
	Cal_R = sensor.getCalibratedR(),
	Cal_S = sensor.getCalibratedS()
	Cal_T = sensor.getCalibratedT()
	Cal_U = sensor.getCalibratedU()
	Cal_V = sensor.getCalibratedV()
	Cal_W = sensor.getCalibratedW()
	
	Cal_A = sensor.getCalibratedA()
	Cal_B = sensor.getCalibratedB()
	Cal_C = sensor.getCalibratedC()
	Cal_D = sensor.getCalibratedD()
	Cal_E = sensor.getCalibratedE()
	Cal_F = sensor.getCalibratedF()
	values = [Cal_G,Cal_H,Cal_I ,Cal_J ,Cal_K ,Cal_L ,Cal_R ,Cal_S ,Cal_T ,Cal_U ,Cal_V ,Cal_W ,Cal_A ,Cal_B ,Cal_C ,Cal_D ,Cal_E ,Cal_F]	
	return jsonify(values)


def UVon():
	print("bl")
	sensor.enableBulb(0)

def UVoff():
	print("bl")
	sensor.disableBulb(0)

def IRLEDon():
	print("bl")
	sensor.enableBulb(1)
	
def IRLEDoff():
	print("bl")
	sensor.enableBulb(1)
	
def WhiteLEDon():
	print("bl")
	sensor.enableBulb(2)


def WhiteLEDoff():
	print("bl")
	sensor.disableBulb(2)
	

	
	
 
@app.route("/RGB" ,methods=['POST'])
def RGB():
	if request.method == 'POST':
		button = str(request.json['name'])
		bstatus = str(request.json['status'])
		
		if button == 'Red' and bstatus == 'True':
			UVLEDon()
		if button == 'Red' and bstatus == 'False':
			UVLEDoff()
		if button == 'Green' and bstatus == 'True':
			GreenLEDon()
		if button == 'Green' and bstatus == 'False':
			IRLEDoff()
		if button == "Blue" and bstatus == "True":
			WhiteLEDon()
		if button == 'Blue' and bstatus == 'False':
			WhiteLEDoff()
			
	return render_template('index.html')
	
if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5050, debug=True)

