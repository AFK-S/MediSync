import face_recognition
import cv2
import numpy as np
import requests


class SimpleFacerec:
    def __init__(self):
        self.known_face_encodings = []
        self.known_face_names = []
        self.known_face_urls = []
        self.frame_resizing = 0.25

    def load_encoding_image_url(self, image_url):
        """Load face encoding from an image URL."""
        try:
            img = self.load_image_from_cloudinary(image_url)
            rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            filename = image_url.split("/")[-1].split("?")[0]

            # Assuming only the first face encoding is needed
            face_encodings = face_recognition.face_encodings(rgb_img)
            if not face_encodings:
                raise ValueError("No face found in the provided image.")
            img_encoding = face_encodings[0]

            self.known_face_encodings.append(img_encoding)
            self.known_face_names.append(filename)
            self.known_face_urls.append(image_url)
        except Exception as e:
            print(f"Error loading image from URL {image_url}: {e}")

    def load_image_from_cloudinary(self, image_url):
        img_data = requests.get(image_url).content
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img

    def detect_known_faces(self, frame):
        small_frame = cv2.resize(
            frame, (0, 0), fx=self.frame_resizing, fy=self.frame_resizing)
        rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(
            rgb_small_frame, face_locations)

        face_names = []
        face_urls = []
        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces(
                self.known_face_encodings, face_encoding)
            name = "Unknown"
            url = ""

            face_distances = face_recognition.face_distance(
                self.known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = self.known_face_names[best_match_index]
                url = self.known_face_urls[best_match_index]
            face_names.append(name)
            face_urls.append(url)

        face_locations = np.array(face_locations)
        face_locations = face_locations / self.frame_resizing
        return face_locations.astype(int), face_names, face_urls
