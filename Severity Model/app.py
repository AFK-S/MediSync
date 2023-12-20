from flask import Flask, render_template, request
from datetime import datetime
from flask import jsonify
from Functions import create_patient, severity, high_severity, find_specialization
from flask_cors import CORS
from collections import Counter

app = Flask(__name__)
CORS(app)

@app.route('/api/patient/severity_index', methods=['POST'])
def patient_severity():
    try:
        patient_age = request.json["age"]
        patient_symptoms = request.json["symptoms"]
        patient_past_disease = request.json["past_disease"]
        patient_lifestyle = request.json["lifestyle"]
        patient_habits = request.json["habits"]
        severity_index = severity(patient_age, patient_symptoms, patient_past_disease, patient_lifestyle, patient_habits)
        severity_count = high_severity(patient_symptoms)
        
        return jsonify({
            "severity_index": severity_index,
            "severity_count": severity_count
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return error message and 500 status code for internal server error

@app.route('/api/max_no_of_specialization', methods=['POST'])
def max_no_of_specialization():
    data = request.get_json()
    if 'symptoms' in data:
        input_symptoms = data['symptoms']
        result = find_specialization(input_symptoms)
        specialization_counter = Counter(result)
        most_common_specialization = specialization_counter.most_common(1)[0][0]        
        print(most_common_specialization)
        return most_common_specialization
    else:
        return jsonify({'error' : 'Please provide symptoms'})

if __name__ == '__main__':
    app.run(host='192.168.0.114', debug=True) 

