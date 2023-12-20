import pandas as pd
from Patient import Patient

file_path1 = 'pastMed.csv'
df1 = pd.read_csv(file_path1)

file_path2 = 'Symptom-severity.csv'
df2 = pd.read_csv(file_path2)

file_path3 = 'age.csv'
df3 = pd.read_csv(file_path3)

file_path4 = 'Symptom-specialization.csv'
df4 = pd.read_csv(file_path4)

def med_hist(diseases):
    values = []
    sum_data = 0
    if len(diseases) == 0: return {"sum_data" : sum_data}
    for disease in diseases:
        try:
            value = df1.loc[df1['Disease'] == disease, 'weight'].values[0]
            values.append(value)
        except IndexError:
           return f"Disease '{disease}' not found"

    if not values:
        return "No valid diseases provided"

    sum_data = sum(values)
    return {"sum_data" : sum_data}

def current_symptoms(symptoms):
    weights = []
    sum_weights = 0
    if len(symptoms) == 0: return {"sum_weights" : sum_weights}
    for symptom in symptoms:
        try:
            weight = df2.loc[df2['Symptom'] == symptom, 'weight'].values[0]
            weights.append(weight)
        except IndexError:
            return f"Symptom '{symptom}' not found"

    if not weights:
        return "No valid symptoms provided"

    sum_weights = sum(weights)
    return {"sum_weights" : sum_weights}

def age_weight(age):
        try:
            age_value = df3.loc[df3['age'] == age, 'weight'].values[0]
            return age_value
        except IndexError:
            return f"Incorrect age"

def lifestyle_weight(lifestyle):
    if lifestyle == "urban": 
        return 4
    elif lifestyle == "rural": 
        return 2
    elif lifestyle == "urban-rural": 
        return 5
    elif lifestyle == "active": 
        return 1

def smoking_drinking(habits):
    if habits == "yes":
        return 5
    elif habits == "no":
        return 1

def severity(age, symptoms, diseases, lifestyle, habits):
    age_data = age_weight(age)
    current_symptoms_data = current_symptoms(symptoms)
    med_hist_data= med_hist(diseases)
    lifestyle_data = lifestyle_weight(lifestyle)
    habits_data = smoking_drinking(habits)
    
    print(age_data, current_symptoms_data, med_hist_data, lifestyle_data, habits_data)
    severity_index = ((age_data * 0.12 ) + (current_symptoms_data["sum_weights"] * 0.60) + (med_hist_data["sum_data"] * 0.12)  + (lifestyle_data * 0.08) + (habits_data * 0.08 )) 
    return severity_index

def high_severity(symptoms, threshold=4):
    high_weight_count = sum((df2['Symptom'].isin(symptoms)) & (df2['weight'] >= threshold))
    return high_weight_count

def create_patient(name, age, symptoms, diseases, input_date):
    severity_index = severity(age, symptoms, diseases)
    high_severity_count = high_severity(symptoms)

    return Patient(name, age, severity_index, high_severity_count, input_date)

def find_specialization(symptoms):
    spec = []
    for symptom in symptoms:
        try:
            value = df4.loc[df4['Symptom'] == symptom, 'Specialization'].values[0]
            spec.append(value)
        except IndexError:
           return f"Specialization for '{symptom}' not found"

    if not spec:
        return "No valid symptoms provided"
    return spec