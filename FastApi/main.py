import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# FastAPI app
app = FastAPI()

# Load the saved Random Forest model
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

# CORS configuration
origins = [
    "http://localhost:5173",  # Add your frontend URL here
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from the origins specified above
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define the input format for the prediction request
class PredictionRequest(BaseModel):
    input_data: List[float]  # Explicitly expecting a list of floats

# Define the prediction endpoint
@app.post("/predict")
def predict(request: PredictionRequest):
    # Log the incoming data to understand its structure
    print("Received input data:", request.input_data)
    
    input_data = request.input_data  # Get the input data
    try:
        # Make prediction
        prediction = model.predict([input_data])  # Ensure it's a 2D array
        return {"prediction": prediction.tolist()}  # Return prediction as list
    except Exception as e:
        return {"error": str(e)}  # Return any error details for debugging

# Optional: Root endpoint to check if the API is working
@app.get("/")
def read_root():
    return {"message": "API is running"}
