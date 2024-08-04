const apiKey = '12f11cf0d7de0aaedca3ddef';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount === "" || fromCurrency === "" || toCurrency === "") {
        alert("Please fill in all fields");
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result !== "success") {
                throw new Error("Failed to fetch exchange rates");
            }
            const exchangeRates = data.conversion_rates;
            const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
            document.getElementById('result-text').innerText = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('Failed to fetch exchange rates. Please try again later.');
        });
}

window.onload = function() {
    const currencySelects = document.querySelectorAll('select');
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.result !== "success") {
                throw new Error("Failed to fetch exchange rates");
            }
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.text = currency;
                currencySelects.forEach(select => select.appendChild(option.cloneNode(true)));
            });
        })
        .catch(error => {
            console.error('Error fetching exchange rates:', error);
            alert('Failed to fetch exchange rates. Please try again later.');
        });
};
