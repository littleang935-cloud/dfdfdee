import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib
import os

def train_model():
    """Train a Logistic Regression model on batch data and save it"""
    
    # Read the data
    df = pd.read_csv('batch_data.csv')
    
    # Prepare features and target
    X = df[['temp_c', 'humidity']]
    y = df['target']
    
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
    
    # Test prediction
    test_prediction = model.predict(scaler.transform([[4.5, 70]]))
    print(f"Test prediction for temp=4.5°C, humidity=70%: {test_prediction[0]}")

if __name__ == "__main__":
    train_model()