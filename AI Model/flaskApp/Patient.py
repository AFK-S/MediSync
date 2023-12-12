class Patient:
    patient_id_counter = 0

    def __init__(self, name, age, severity_index, high_severity_count, input_date):
        Patient.patient_id_counter += 1
        self.patient_id = Patient.patient_id_counter
        self.name = name
        self.age = age
        self.severity_index = severity_index
        self.high_severity_count = high_severity_count
        self.input_date = input_date
        

    def patient_info(self):
        return {
        "patient_id" : self.patient_id,
        "name" : self.name,
        "age" : self.age,
        "severity_index" : self.severity_index,
        "high_severity_count" : self.high_severity_count,  
        "input_date" : self.input_date   
        }