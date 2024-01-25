# Import necessary libraries for data manipulation, analysis, and model evaluation
import pandas as pd  # Pandas for data manipulation
from sklearn.model_selection import train_test_split  # Train-test split
from sklearn.ensemble import RandomForestClassifier  # Random Forest model
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score  # Model evaluation metrics
import pickle  # Save and load models

# Load your dataset
# Read the diabetes dataset from a CSV file into a pandas DataFrame
data = pd.read_csv('diabetesDataset.csv')

# Assuming you have features in X and target in y
# Select the features from the dataset and assign them to X
X = data[
    ['Gender', 'Age', 'Hypertension', 'HeartDisease', 'SmokingHistory', 'BMI', 'HbA1cLevel', 'Glucose']]
# Select the target variable from the dataset and assign it to y
y = data['Diabetes']

# Split data into training and testing sets
# Split the data into training and testing sets using train_test_split function
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the Random Forest model
# Create a random forest classifier model with 100 estimators
model = RandomForestClassifier(n_estimators=100, random_state=42)
# Train the model using the training data
model.fit(X_train, y_train)

# Save the trained model to a file
# Open a file in write binary mode to save the model
with open('modelPossibility.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

# Calculate and print additional evaluation metrics
# Predict the target variable using the testing data
y_pred = model.predict(X_test)

# Print the confusion matrix
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# Print the classification report
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Calculate and print the accuracy score
accuracy = accuracy_score(y_test, y_pred)
print(f"\nModel Accuracy: {accuracy * 100:.2f}%")
