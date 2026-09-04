const form = document.getElementById('ticketform');
const result= document.getElementById('result');

form.addEventListener('submit', async function(event) {

    event.preventDefault();

    const subject = document.getElementById('subject').value
    const text = document.getElementById('text').value

    result.textContent = "Predicting....";

    try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                subject: subject,
                text: text
            })
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.detail || "Something went wrong");
        }

        result.textContent= "Prediction: " + data.prediction;

    } catch (error) {
        result.textContent = "Error: " + error.message;
    }

});