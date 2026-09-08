# Intelligent Customer Triage System

A machine-learning-based customer support ticket classification system. It predicts one of five ticket categories through a React frontend and FastAPI backend.

## Live Demo

- Frontend: [Vercel](https://intelligent-customer-triage-system.vercel.app)
- Backend API documentation: [Railway FastAPI Docs](https://intelligent-customer-triage-system-production.up.railway.app/docs)

## Project Overview

The system classifies customer support tickets into:

- `account_access`
- `billing`
- `bug_report`
- `refund_request`
- `shipping_delivery`

Users enter a ticket subject and description in the web application. The FastAPI backend preprocesses the text, uses the trained model, and returns the predicted category.

## Dataset and Features

The model uses customer support ticket data with two main input fields:

- `subject`
- `text`

These fields are combined into a single `combined_text` feature before preprocessing and vectorization.

## NLP Preprocessing

Text preprocessing includes:

1. Expanding contractions
2. Converting text to lowercase
3. Word tokenization
4. Removing punctuation
5. Removing stopwords while keeping `not` and `no`
6. POS tagging
7. Lemmatization

The preprocessing logic is in:

```text
Backend/preprocessing.py
```

## Feature Extraction and Model

Bag of Words (BoW) converts processed text into numerical features.

- Vectorizer: `Backend/bow_vectorizer.pkl`
- Model: `Backend/triage_Lr_model.pkl`
- Algorithm: Logistic Regression

The model was evaluated using accuracy, precision, recall, F1-score, a classification report, and a confusion matrix. It achieved approximately **88.5% accuracy** on the test data.

## API and WebSocket Features

The FastAPI application is in:

```text
Backend/app.py
```

### Prediction Endpoint

```text
POST /predict
```

Example request:

```json
{
  "subject": "Order not received",
  "text": "My order hasn't arrived yet and it's been 2 weeks."
}
```

Example response:

```json
{
  "prediction": "shipping_delivery"
}
```

### WebSocket Endpoint

```text
/ws
```

The frontend uses WebSockets to show live connection updates.

## Technology Stack

- React and Vite
- FastAPI and Uvicorn
- scikit-learn
- NLTK
- Logistic Regression
- CountVectorizer
- Railway for backend deployment
- Vercel for frontend deployment

## Project Structure

```text
Intelligent-Customer-triage-system/
├── Backend/
│   ├── app.py
│   ├── preprocessing.py
│   ├── download_nltk.py
│   ├── requirements.txt
│   ├── triage_Lr_model.pkl
│   └── bow_vectorizer.pkl
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   └── App.css
    ├── package.json
    └── vite.config.js
```

## Run Locally

### Backend

```bash
cd Backend
pip install -r requirements.txt
python download_nltk.py
uvicorn app:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://intelligent-customer-triage-system.vercel.app |
| Backend | Railway | https://intelligent-customer-triage-system-production.up.railway.app |
| API Docs | Railway | https://intelligent-customer-triage-system-production.up.railway.app/docs |

## Project Workflow

```text
Customer Support Ticket
          ↓
NLP Preprocessing
          ↓
Combined Subject + Text
          ↓
Bag of Words Vectorization
          ↓
Logistic Regression Model
          ↓
Predicted Support Category
```

## Author

Syeda Faiza Adil
