import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib
import os

def train_model():
    """Train a Logistic Regression model on batch data and save it"""
    
    # Read the data
    data = pd.read_csv('batch_data.csv')
    
    # Prepare features and target
    X = data[['temp_c', 'humidity']]
    y = data['target']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train the model
    model = LogisticRegression(random_state=42)
    model.fit(X_train_scaled, y_train)
    
    # Evaluate the model
    train_score = model.score(X_train_scaled, y_train)
    test_score = model.score(X_test_scaled, y_test)
    
    print(f"Training accuracy: {train_score:.3f}")
    print(f"Testing accuracy: {test_score:.3f}")
    
    # Save the model and scaler
    joblib.dump(model, 'model.pkl')
    joblib.dump(scaler, 'scaler.pkl')
    
    print("Model and scaler saved as 'model.pkl' and 'scaler.pkl'")
    
    # Test some predictions
    test_cases = [
        {'temp_c': 4.5, 'humidity': 70},  # Should be Safe
        {'temp_c': 1.0, 'humidity': 65},  # Should be Spoiled
        {'temp_c': 9.0, 'humidity': 55},  # Should be Spoiled
        {'temp_c': 3.8, 'humidity': 48},  # Should be Safe
    ]
    
    print("\nTest predictions:")
    for i, case in enumerate(test_cases):
        features = [[case['temp_c'], case['humidity']]]
        features_scaled = scaler.transform(features)
        prediction = model.predict(features_scaled)[0]
        print(f"Case {i+1}: Temp={case['temp_c']}°C, Humidity={case['humidity']}% -> {prediction}")

if __name__ == "__main__":
    train_model()