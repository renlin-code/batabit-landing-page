"use strict"
const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false/";
const animation = document.getElementById("loading-animation");


const apiRequest = async () => {
    try {
        animation.style.display = "flex";
        const response = await fetch(API_URL);
        const data = await response.json();
    
        const coinsNames = data.map(item => item.name);
        const coinsCurrentPrices = data.map(item => item.current_price);
        
        const coinsMiddlePrices = data.map(item => (item.high_24h + item.low_24h)/2);
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
        animation.style.display = "none";    
    } catch(err) {
        console.error(err);
        alert("Ups! Algo salió mal. Inténtelo más tarde :( ");
        animation.style.display = "none";
    };
};


apiRequest();

const refreshButton = document.getElementById("refresh-button");
refreshButton.addEventListener("click", apiRequest);