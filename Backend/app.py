from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

from preprocessing import preprocess_text

app = FastAPI()
connected_clients = set()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('triage_Lr_model.pkl')
vectorizer = joblib.load('bow_vectorizer.pkl')

class Ticket(BaseModel):
    subject: str
    text: str

@app.get("/")
def home():
    return {
        "message": "Customer Support Triage API is running"
    }

@app.post("/predict")
async def predict(ticket: Ticket):

    #check for empty/whitespace-only input
    if not ticket.subject.strip() and not ticket.text.strip():
        return {
            "error": "Please enter a ticket subject or description."
        }

    #check for input containing only symbols
    if not any (char.isalpha() for char in ticket.subject + ticket.text):
        return {
            "error": "Please enter a valid support ticket."
        }

    processed_subject = preprocess_text(ticket.subject)
    processed_text = preprocess_text(ticket.text)

    combined_text = processed_subject + processed_text
    combined_text = " ".join(combined_text)

    #check if meaningful text remains after preprocessing
    if not combined_text.strip():
        return {
            "error": "Please enter meaningful text."
        }

    x = vectorizer.transform([combined_text])

    prediction = model.predict(x)

    for client in connected_clients:
        await client.send_json({
            "message": f"New ticket classified: {prediction[0]}" 
        })

    return {"prediction": prediction[0]}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    await websocket.send_json({"message": "Live updates connected"})

    try:
        while True:
            await websocket.receive_text()


    except WebSocketDisconnect:
        connected_clients.remove(websocket)       
 
