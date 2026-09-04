# Customer Support Triage System

## 1. Project Overview

This project is a machine learning-based customer support ticket classification system. It automatically classifies a customer support ticket into one of five categories:

- `account_access`
- `billing`
- `bug_report`
- `refund_request`
- `shipping_delivery`

The trained machine learning model is exposed through a FastAPI REST API.

## 2. Dataset

The project uses a customer support ticket dataset containing customer support subjects and text messages.

The main input features used for classification are:

- `subject`
- `text`

The two processed fields were combined into a single `combined_text` feature before vectorization.

## 3. NLP Preprocessing

The text was preprocessed before training the machine learning model.

The preprocessing steps include:

1. Expanding contractions
2. Converting text to lowercase
3. Word tokenization
4. Removing punctuation
5. Removing stopwords while keeping `not` and `no`
6. POS tagging
7. Lemmatization

The preprocessing logic is stored in:

`preprocessing.py`

## 4. Feature Extraction

Bag of Words (BoW) was used to convert the processed text into numerical features.

The trained vectorizer is saved as:

`bow_vectorizer.pkl`

The same vectorizer is loaded by the API when making predictions.

## 5. Machine Learning Model

A Logistic Regression classifier was trained using the Bag of Words features.

The trained model is saved as:

`triage_Lr_model.pkl`

The model was evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- Classification report
- Confusion matrix

The model achieved approximately **88.5% accuracy** on the test data.

## 6. FastAPI

FastAPI is used to provide an API for making predictions.

The main API file is:

`main.py`

The primary endpoint is:

`POST /predict`

The API receives a customer support ticket and returns the predicted category.

Example input:

```json
{
  "subject": "Order not received",
  "text": "My order hasn't arrived yet and it's been 2 weeks."
}
```

Example output:

```json
{
  "prediction": "shipping_delivery"
}
```

## 7. Project Structure

```text
Customer_triage_system_Project/
│
├── main.py
├── preprocessing.py
├── triage_Lr_model.pkl
├── bow_vectorizer.pkl
├── requirements.txt
└── README.md
```

## 8. Installation

Install the required packages using:

```bash
pip install -r requirements.txt
```

## 9. Running the API

Start the FastAPI server using:

```bash
uvicorn main:app --reload
```

The API will run locally at:

`http://127.0.0.1:8000`

FastAPI's interactive documentation can be accessed at:

`http://127.0.0.1:8000/docs`

Use the `/docs` page to test the `/predict` endpoint.

## 10. Project Workflow

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