const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false/";

const apiRequest = () => {
    fetch(API)
    .then(response => response.json())
    .then(data => {
        const firstCoinsData = data.slice(0,4);

        const coinsNames = firstCoinsData.map(item => item.name);
        const coinsCurrentPrices = firstCoinsData.map(item => item.current_price);
        
        const coinsMiddlePrices = firstCoinsData.map(item => (item.high_24h + item.low_24h)/2);
        const growth = [];
        for (let i = 0; i < coinsCurrentPrices.length; i++) {
            if(coinsCurrentPrices[i] > coinsMiddlePrices[i]) {
                growth.push(true);
            } else {
                growth.push(false);
            }
        };

        for (let i = 0; i < coinsNames.length; i++) {
            let cellName = document.getElementById(`n${i}`);
            cellName.innerHTML = coinsNames[i];
            
            let cellPrice = document.getElementById(`p${i}`);
            if (growth[i] === true) {
                cellPrice.innerHTML = `$${coinsCurrentPrices[i]}<span id="g${i}" class="trending-up">`;
            } else {
                cellPrice.innerHTML = `$${coinsCurrentPrices[i]}<span id="g${i}" class="trending-down">`;
            }
        }

        console.log(coinsNames, coinsCurrentPrices, growth);
})
    .catch(err => console.error(err));
};


apiRequest();

const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", apiRequest);