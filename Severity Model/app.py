from flask import Flask, render_template, request
from datetime import datetime
from flask import jsonify
from Functions import create_patient, severity, high_severity, find_specialization
from flask_cors import CORS
from collections import Counter

app = Flask(__name__)
CORS(app)

# patients = {}
# patients_by_day = {'slots': []}

# @app.route('/process', methods=['POST'])
# def process():

#     patient_name = request.form['patient_name']
#     input_age = int(request.form['age'])
#     input_symptoms = request.form['symptoms'].split(',')
#     input_symptoms = [symptom.strip() for symptom in input_symptoms if len(symptom) != 0]
#     input_past_med = request.form['past_med'].split(',')
#     input_past_med = [disease.strip() for disease in input_past_med if len(disease) != 0]
#     input_date = request.form['date']
    
#     new_patient = create_patient(patient_name, input_age, input_symptoms, input_past_med, input_date)
#     patients[new_patient.patient_id] = new_patient
    
#     current_date = input_date
#     # current_date = datetime.now().strftime('%Y-%m-%d')
#     ##
#     current_slot = next((slot for slot in patients_by_day['slots'] if slot['date'] == current_date), None)

#     # Create a new slot if the current date doesn't exist
#     if not current_slot:
#         current_slot = {'date': current_date, 'patients': []}
#         patients_by_day['slots'].append(current_slot)

#     # Append the new patient to the respective day's 'patients' list
#     current_slot['patients'].append(new_patient.__dict__)

#     return render_template('index.html', patients=current_slot['patients'])

# @app.route('/patient/<int:patient_id>')
# def patient_details(patient_id):
#     patient = patients.get(patient_id)
#     if patient: return patient.patient_info()
#     else: return "Patient not found."

# @app.route('/sorted_patients')
# def sorted_patients():
#     sorted_patients_list = sorted(patients.values(), key=lambda patient: (-patient.patient_info()['severity_index'], -patient.patient_info()['high_severity_count']))
#     sorted_list = [patient.patient_info() for patient in sorted_patients_list]
#     return jsonify(sorted_list)

# @app.route('/sorted_patients')
# def sorted_patients():
#     sorted_patients_by_date = []

#     for slot in patients_by_day['slots']:
#         sorted_patients_for_date = sorted(slot['patients'], key=lambda patient: (-patient['severity_index'], -patient['high_severity_count']))
#         sorted_patients_by_date.append({'date': slot['date'], 'patients': sorted_patients_for_date})

#     return render_template('sorted_patients.html', sorted_patients_by_date=sorted_patients_by_date)

# @app.route('/patients_by_day')
# def get_patients_by_day():
#     return jsonify(patients_by_day)

# @app.route('/slots/<int:slot_index>')
# def get_slot_by_index(slot_index):
#     if 0 <= slot_index < len(patients_by_day['slots']):
#         return jsonify(patients_by_day['slots'][slot_index])
#     else:
#         return "Slot index out of range"

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
               
        # most_common_specialization = [spec for spec, count in specialization_counter.most_common() if count == specialization_counter.most_common(1)[0][1]]
        
        print(most_common_specialization)
        return most_common_specialization
    else:
        return jsonify({'error' : 'Please provide symptoms'})

if __name__ == '__main__':
    app.run(host='192.168.0.114', debug=True) 



# patients_by_day = { [{
#     'date' : date_val,
#     'patients' : [
#         {'patient_id': 1, 'name': 'Alice', 'age': 30, 'severity_index': 0.75, 'high_severity_count': 3},
#         {'patient_id': 2, 'name': 'Bob', 'age': 35, 'severity_index': 0.92, 'high_severity_count': 2}
#         ],
#     },
#     {
#     'date' : date_val,
#     'patients' : [
#             {'patient_id': 3, 'name': 'Alice', 'age': 30, 'severity_index': 0.75, 'high_severity_count': 3},
#             {'patient_id': 4, 'name': 'Bob', 'age': 35, 'severity_index': 0.92, 'high_severity_count': 2}
#     ]
#         },
#     ]
# }