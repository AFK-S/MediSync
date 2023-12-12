import pandas as pd
from Patient import Patient

file_path1 = 'pastMed.csv'
df1 = pd.read_csv(file_path1)

file_path2 = 'Symptom-severity.csv'
df2 = pd.read_csv(file_path2)

file_path3 = 'age.csv'
df3 = pd.read_csv(file_path3)

def med_hist(diseases):
    values = []
    sum_data, len_data = 0, 0
    if len(diseases) == 0: return {"sum_data" : sum_data, "len_data": len_data}
    for disease in diseases:
        try:
            value = df1.loc[df1['Disease'] == disease, 'weight'].values[0]
            values.append(value)
        except IndexError:
           return f"Disease '{disease}' not found"

    if not values:
        return "No valid diseases provided"

    sum_data = sum(values)
    len_data = len(values)

    return {"sum_data" : sum_data, "len_data": len_data}

def current_symptoms(symptoms):
    weights = []
    sum_weights, len_weights = 0, 0
    if len(symptoms) == 0: return {"sum_weights" : sum_weights, "len_weights": len_weights}
    for symptom in symptoms:
        try:
            weight = df2.loc[df2['Symptom'] == symptom, 'weight'].values[0]
            weights.append(weight)
        except IndexError:
            return f"Symptom '{symptom}' not found"

    if not weights:
        return "No valid symptoms provided"

    sum_weights = sum(weights)
    len_weights = len(weights)

    return {"sum_weights" : sum_weights, "len_weights": len_weights}

def age_weight(age):
        try:
            age_value = df3.loc[df3['age'] == age, 'weight'].values[0]
            return age_value
        except IndexError:
            return f"Incorrect age"

def severity(age, symptoms, diseases):
    current_symptoms_data = current_symptoms(symptoms)
    med_hist_data= med_hist(diseases)
    age = age_weight(age)
    severity_index = (age + current_symptoms_data["sum_weights"] + med_hist_data["sum_data"])/(1+current_symptoms_data["len_weights"]+med_hist_data["len_data"])
    return severity_index

def high_severity(symptoms, threshold=5):
    high_weight_count = sum((df2['Symptom'].isin(symptoms)) & (df2['weight'] >= threshold))
    return high_weight_count

def create_patient(name, age, symptoms, diseases, input_date):
    severity_index = severity(age, symptoms, diseases)
    high_severity_count = high_severity(symptoms)

    return Patient(name, age, severity_index, high_severity_count, input_date)