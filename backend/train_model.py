import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

def train_model():
    # Load the data
    df = pd.read_csv('batch_data.csv')
    
    # Prepare features and target
    X = df[['temp_c', 'humidity']]
    y = df['target']
    
    # Encode target labels
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)
    
    # Train the model
    model = LogisticRegression(random_state=42)
    model.fit(X, y_encoded)
    
    # Save the model and label encoder
    joblib.dump(model, 'model.pkl')
    joblib.dump(label_encoder, 'label_encoder.pkl')
    
    print("Model trained and saved successfully!")
    print(f"Model accuracy: {model.score(X, y_encoded):.2f}")
    
    # Test predictions
    test_data = pd.DataFrame({
        'temp_c': [4.5, 9.2, 2.0],
        'humidity': [70, 65, 75]
    })
    
    predictions = model.predict(test_data)
    predicted_labels = label_encoder.inverse_transform(predictions)
    
    print("\nTest predictions:")
    for i, (temp, humidity, pred) in enumerate(zip(test_data['temp_c'], test_data['humidity'], predicted_labels)):
        print(f"Temp: {temp}°C, Humidity: {humidity}% -> {pred}")

if __name__ == "__main__":
    train_model()