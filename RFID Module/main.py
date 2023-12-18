# More details can be found in TechToTinker.blogspot.com
# George Bantique | tech.to.tinker@gmail.com

from mfrc522 import MFRC522
from machine import Pin
from machine import SPI
import time
import urequests
import network

timeout = 0

wifi = network.WLAN(network.STA_IF)
wifi.active(True)

wifi.connect("iPhone 15", "#AFKS123")

if not wifi.isconnected():
    print('connecting..')
    while (not wifi.isconnected() and timeout < 5):
        print(5 - timeout)
        timeout = timeout + 1
        time.sleep(1)


# url = "http://192.168.0.107:8000/api/attendence/register/"

spi = SPI(2, baudrate=2500000, polarity=0, phase=0)
led_pin = Pin(2, Pin.OUT)
led_pin.off()
# Using Hardware SPI pins:
#     sck=18   # yellow
#     mosi=23  # orange
#     miso=19  # blue
#     rst=4    # white
#     cs=5     # green, DS
# *************************
# To use SoftSPI,
# from machine import SOftSPI
# spi = SoftSPI(baudrate=100000, polarity=0, phase=0, sck=sck, mosi=mosi, miso=miso)
spi.init()
rdr = MFRC522(spi=spi, gpioRst=4, gpioCs=5)
print("Place card")


rfid_list = {
    "0xb839e412": "Dr. Vaishali Gaidhane",
    "0xb8666212": "Dr. Karandeep Singh Sandhu",
    "0x7241d051": "Dr. Sarthak Deshmukh",
    "0x62c6be51": "Dr. Faizan Potrcik",
    "0xceee192a": "Dr. Sneha Deshmukh",
    "0x9e09e32a": "Dr. Abhishek Nyamati",
    "0xbe70ca2a": "Dr. Aditya Rai"
}


while True:

    (stat, tag_type) = rdr.request(rdr.REQIDL)
    if stat == rdr.OK:
        (stat, raw_uid) = rdr.anticoll()
        if stat == rdr.OK:
            card_id = "0x%02x%02x%02x%02x" % (
                raw_uid[0], raw_uid[1], raw_uid[2], raw_uid[3])
            if card_id in rfid_list:
                print(rfid_list[card_id])
            else:
                print(card_id)
            led_pin.on()
            time.sleep(10)

            response = urequests.post(
                "http://192.168.0.110:8000/api/attendance/register/" + str(card_id))

            print("Status Code:", response.status_code)
            if response.status_code == 200:
                print("Response Text:", response.text)
            response.close()
            led_pin.off()
