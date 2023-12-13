import cv2
from simple_facerec import SimpleFacerec
from datetime import datetime, timedelta
import face_recognition
import requests
import os


cloudinary_urls = [
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321327/images/doctor_img/Dr.Sneha.png",
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321325/images/doctor_img/Dr.Sarthak.jpg",
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321324/images/doctor_img/Dr.Karandeep.jpg",
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321323/images/doctor_img/Dr.Faizan.jpg",
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321322/images/doctor_img/Dr.Aditya.jpg",
    "https://res.cloudinary.com/deshcj4pb/image/upload/v1702321320/images/doctor_img/Dr.Abhishek.jpg",
]


cap = cv2.VideoCapture(0)

threshold_distance = 0.9

last_response_time = datetime.now() - timedelta(minutes=2)

node_server_url = "http://localhost:8000"

sfr = SimpleFacerec()

for url in cloudinary_urls:
    sfr.load_encoding_image_url(url)

while True:
    ret, frame = cap.read()

    face_locations, face_names = sfr.detect_known_faces(frame)

    doctor_detected = False

    name = "Unknown"

    for face_loc, detected_name in zip(face_locations, face_names):
        y1, x2, y2, x1 = face_loc[0], face_loc[1], face_loc[2], face_loc[3]

        face_encodings = face_recognition.face_encodings(frame, [face_loc])[0]
        face_distance = face_recognition.face_distance(sfr.known_face_encodings, face_encodings)[0]

        # Extract only the name without the file extension
        name = os.path.splitext(detected_name)[0]

        cv2.putText(frame, f"{name}", (x1, y1 - 10), cv2.FONT_HERSHEY_DUPLEX, 1,
                    (0, 0, 200), 2)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 200), 4)

        if face_distance < threshold_distance:
            doctor_detected = True

    if doctor_detected and (datetime.now() - last_response_time).total_seconds() >= 60:
        current_time = datetime.now().strftime("%H:%M:%S")
        log_message = f"Time: {current_time} - {name} entered at Cam1"
        print(log_message)

        payload = {'log': log_message}
        try:
            response = requests.post(node_server_url + '/api/logs', data=payload)

        except requests.RequestException as e:
            print(f"Error sending logs to Node.js server: {e}")

        last_response_time = datetime.now()

    cv2.imshow("Frame", frame)

    key = cv2.waitKey(1)
    if key == 27:
        break

cap.release()
cv2.destroyAllWindows()
