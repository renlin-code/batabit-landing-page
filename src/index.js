const fetchData = require("../src/utils/fetchData");
const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false/";

const apiRequest = async (url_api) => {
    try {
        const data = await fetchData(url_api);
        const firstCoinsData = data.slice(0,4);

        const coinsNames = firstCoinsData.map(item => item.name);
        const coinsCurrentPrices = firstCoinsData.map(item => item.current_price);
        const coinsMiddlePrices = firstCoinsData.map(item => (item.high_24h + item.low_24h)/2);
        const behavior = [];
        
        const compare = (current_price, middle_price) => {
            for (let i = 0; i < current_price.length; i++) {
                if(current_price[i] > middle_price[i]) {
                    behavior.push(true);
                } else {
                    behavior.push(false);
                }
            }
        }
        console.log("Coins Names: ", coinsNames);
        console.log("Coins Current Prices: ", coinsCurrentPrices);
        console.log("Coins Middle Prices: ", coinsMiddlePrices);
        compare(coinsCurrentPrices, coinsMiddlePrices);
        console.log("It's growing: ", behavior);

    } catch(error){
        console.error(error);
    }
}

apiRequest(API);