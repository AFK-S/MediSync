import cv2
from simple_facerec import SimpleFacerec
from datetime import datetime, timedelta
import face_recognition
import requests
import os

result = []
photos_url = "http://192.168.0.110:8000/api/photos"

response = requests.get(photos_url)
if response.status_code == 200:
    result = response.json()
    # print(result)
else:
    print("Server is down")


cap1 = cv2.VideoCapture(1)
sfr1 = SimpleFacerec()

# cap2 = cv2.VideoCapture(1)
# sfr2 = SimpleFacerec()


threshold_distance = 10

last_response_time = datetime.now() - timedelta(minutes=2)

for url in result:
    sfr1.load_encoding_image_url(url)
    # sfr2.load_encoding_image_url(url)

while True:
    ret1, frame1 = cap1.read()
    # ret2, frame2 = cap2.read()

    face_locations, face_names, face_urls = sfr1.detect_known_faces(frame1)
    # face_locations, face_names = sfr2.detect_known_faces(frame2)

    doctor_detected = False
    name = "Unknown"
    url = ""

    for face_loc, detected_name, detected_url in zip(face_locations, face_names, face_urls):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        face_encodings = face_recognition.face_encodings(frame1, [face_loc])[0]
        face_distance = face_recognition.face_distance(
            sfr1.known_face_encodings, face_encodings)[0]
        # face_encodings = face_recognition.face_encodings(frame2, [face_loc])[0]
        # face_distance = face_recognition.face_distance(
        #     sfr2.known_face_encodings, face_encodings)[0]

        # Extract only the name without the file extension
        name = os.path.splitext(detected_name)[0]
        name = name.replace("%20", " ")
        url = detected_url

        cv2.putText(frame1, f"{name}", (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1,
                    (0, 0, 200), 2)
        cv2.rectangle(frame1, (x1, y1), (x2, y2), (0, 0, 200), 4)
        # cv2.putText(frame2, f"{name}", (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1,
        #             (0, 0, 200), 2)
        # cv2.rectangle(frame2, (x1, y1), (x2, y2), (0, 0, 200), 4)

        if face_distance < threshold_distance:
            doctor_detected = True

    if doctor_detected and (datetime.now() - last_response_time).total_seconds() >= 20:
        current_time = datetime.now().strftime("%H:%M:%S")
        log_message = f"{name} found in Cam1 - Time {current_time}"
        print(log_message)

        response = requests.post(
            "http://192.168.0.110:8000/api/log/cctv/register", data={
                "photo_url": url,
                "status": "CAM1",
            })
        print(response.status_code)
        if response.status_code == 200:
            print(response.text)
        else:
            print("Server is down")

        last_response_time = datetime.now()

    cv2.imshow("Frame", frame1)
    # cv2.imshow("Frame", frame2)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap1.release()
# cap2.release()
cv2.destroyAllWindows()
