from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# ----------------------------
# App Initialization
# ----------------------------
app = FastAPI(title="AI Moderation Service")

# ----------------------------
# CORS Configuration
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Load Models (Only Once)
# ----------------------------
try:
    toxic_model = joblib.load("toxic_model.pkl")
    toxic_vectorizer = joblib.load("tfidf_vectorizer.pkl")

    spam_model = joblib.load("spam_model.pkl")
    spam_vectorizer = joblib.load("spam_vectorizer.pkl")

    intent_model = joblib.load("intent_model.pkl")
    intent_vectorizer = joblib.load("intent_vectorizer.pkl")

except Exception as e:
    raise RuntimeError(f"Error loading models: {e}")

# ----------------------------
# Smart Reply Mapping
# ----------------------------
reply_map = {
    "greeting": ["Hi!", "Hello!", "Hey!"],
    "question": ["Yes", "No", "Maybe"],
    "confirmation": ["Okay", "Sure", "Got it"],
    "goodbye": ["Bye!", "See you!", "Take care!"],
    "appreciation": ["You're welcome!", "No problem!", "Anytime!"]
}

# ----------------------------
# Request Schema
# ----------------------------
class Message(BaseModel):
    text: str

# ----------------------------
# Health Check Endpoint
# ----------------------------
@app.get("/health")
def health():
    return {"status": "ML service running"}

# ----------------------------
# Analyze Endpoint
# ----------------------------
@app.post("/analyze")
def analyze_message(message: Message):

    text = message.text.strip()

    if not text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    try:
        # Toxic prediction
        toxic_vec = toxic_vectorizer.transform([text])
        toxic_score = float(toxic_model.predict_proba(toxic_vec)[0][1])

        # Spam prediction
        spam_vec = spam_vectorizer.transform([text])
        spam_score = float(spam_model.predict_proba(spam_vec)[0][1])

        # Intent prediction
        intent_vec = intent_vectorizer.transform([text])
        intent = intent_model.predict(intent_vec)[0]
        smart_replies = reply_map.get(intent, [])

        return {
            "toxic_score": round(toxic_score, 4),
            "spam_score": round(spam_score, 4),
            "smart_replies": smart_replies
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# uvicorn app:app --host 0.0.0.0 --port 8000 --reload 