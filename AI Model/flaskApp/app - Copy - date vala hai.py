from flask import Flask, render_template, request
from datetime import datetime
from flask import jsonify
from Functions import create_patient

app = Flask(__name__)

patients = {}
patients_by_day = {}
booking = {
    'date': None,
    'patients': patients_by_day
}

@app.route('/')
def index(): return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    # global patients_by_day

    patient_name = request.form['patient_name']
    input_age = int(request.form['age'])
    input_symptoms = request.form['symptoms'].split(',')
    input_symptoms = [symptom.strip() for symptom in input_symptoms if len(symptom) != 0]
    input_past_med = request.form['past_med'].split(',')
    input_past_med = [disease.strip() for disease in input_past_med if len(disease) != 0]

    new_patient = create_patient(patient_name, input_age, input_symptoms, input_past_med)
    patients[new_patient.patient_id] = new_patient
    current_date = datetime.now().strftime('%Y-%m-%d')
    
    ##    
    if current_date not in patients_by_day:
        patients_by_day[current_date] = []

    # Append the new patient to the respective day
    patients_by_day[current_date].append(new_patient.__dict__)

    return render_template('index.html', patients=patients_by_day[current_date])

@app.route('/patient/<int:patient_id>')
def patient_details(patient_id):
    patient = patients.get(patient_id)
    if patient: return patient.patient_info()
    else: return "Patient not found."

@app.route('/sorted_patients')
def sorted_patients():
    sorted_patients_list = sorted(patients.values(), key=lambda patient: (-patient.patient_info()['severity_index'], -patient.patient_info()['high_severity_count']))
    sorted_list = [patient.patient_info() for patient in sorted_patients_list]
    return jsonify(sorted_list)

@app.route('/patients_by_day')
def get_patients_by_day():
    return jsonify(patients_by_day)

if __name__ == '__main__':
    app.run(debug=True)



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