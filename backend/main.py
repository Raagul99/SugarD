# Import the necessary libraries , model execution, internally makes plugins, dataframe loading

import pickle
import mysql.connector
from flask import Flask, request, jsonify

# Create a Flask application
app = Flask (__name__)

# Database connection configuration
db = mysql.connector.connect (
    host="localhost",
    user="root",
    password="Raag@9949",
    database="userdetails"
)
cursor = db.cursor ()

# Load the trained Random Forest model
with open ('modelPossibility.pkl', 'rb') as model_file:
    model = pickle.load (model_file)

# Load the trained Type prediction model
with open ('modelType.pkl', 'rb') as type_model_file:
    type_model = pickle.load (type_model_file)


# Define a route for predicting possibility
@app.route ('/predictPossibility', methods=['POST'])
def predictPossibility():
    try:
        # Retrieve the data from the request
        data = request.json

        # Extract the features from the data
        gender = int (data['Gender'])
        age = int (data['Age'])
        hypertension = int (data['Hypertension'])
        heart_disease = int (data['HeartDisease'])
        smoking_history = int (data['SmokingHistory'])
        bmi = float (data['BMI'])
        HbA1c_level = float (data['HbA1cLevel'])
        glucose = float (data['Glucose'])

        # Prepare feature array for prediction
        features = [gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, glucose]

        # Make a prediction using the loaded model
        prediction = int (model.predict ([features])[0])

        # Return the prediction as a JSON response
        return jsonify ({'prediction': prediction})

    except Exception as e:
        return jsonify ({'error': str (e)}), 500


# Define a route for predicting type
@app.route ('/predictType', methods=['POST'])
def predictType():
    try:
        # Retrieve the data from the request
        data = request.json

        # Extract the features from the data
        gender = int (data['Gender'])
        age = int (data['Age'])
        hypertension = int (data['Hypertension'])
        heart_disease = int (data['HeartDisease'])
        smoking_history = int (data['SmokingHistory'])
        bmi = float (data['BMI'])
        HbA1c_level = float (data['HbA1cLevel'])
        glucose = float (data['Glucose'])

        # Prepare feature array for prediction
        features = [gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, glucose]

        # Make a prediction using the loaded type prediction model
        type_prediction = int (type_model.predict ([features])[0])

        # Return the type prediction as a JSON response
        return jsonify ({'type_prediction': type_prediction})

    except Exception as e:
        return jsonify ({'error': str (e)}), 500


# Define a route for user registration
@app.route ('/register', methods=['POST'])
def register():
    data = request.get_json ()
    username = data['username']
    email = data['email']
    password = data['password']
    confirm_password = data['confirm_password']
    contact_number = data['contactNumber']
    blood_type = data['bloodType']

    # Create a table for user information if it doesn't exist
    cursor.execute ("""
        CREATE TABLE IF NOT EXISTS usersinfo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            contact_no VARCHAR(15),
            blood_type VARCHAR(5)
        )
    """)

    if password != confirm_password:
        return jsonify (message="Passwords do not match.")

    query = "INSERT INTO usersinfo (username, email, password, contact_no, blood_type) VALUES (%s, %s, %s, %s, %s)"
    values = (username, email, password, contact_number, blood_type)

    try:
        cursor.execute (query, values)
        db.commit ()

        # Return the user data after registration
        user_data = {
            'username': username,
            'email': email,
            'contactNumber': contact_number,
            'bloodType': blood_type
        }
        return jsonify (message="Registration successful.", user=user_data)
    except mysql.connector.Error as e:
        db.rollback ()
        return jsonify (message=f"Error: {e}")


# Define a route for user login
@app.route ('/login', methods=['POST'])
def login():
    data = request.get_json ()
    username = data['username']
    password = data['password']

    query = "SELECT * FROM usersinfo WHERE username = %s AND password = %s"
    values = (username, password)

    try:
        cursor.execute (query, values)
        result = cursor.fetchone ()

        if result:
            # Return the user data after successful login
            user_data = {
                "username": result[2],
                "email": result[3],
                "contactNumber": result[4],
                "bloodType": result[5]
            }
            return jsonify (message="Login successful.", user=user_data)
        else:
            return jsonify (message="Invalid username or password.")
    except mysql.connector.Error as e:
        return jsonify (message=f"Error: {e}")


# Run the Flask application
if __name__ == '__main__':
    app.run (host='0.0.0.0', port=5000)
