const fetchData = require("../src/utils/fetchData");
const API = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false/";

class Coin {
    constructor ({
        name,
        current_price,
        growth,
    }) {
        this.name = name;
        this.current_price = current_price;
        this.growth = growth;
    }
}
const coinsDataForRequest = [];


const apiRequest = async () => {
    try {
        const data = await fetchData(API);
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
        }
        
        const id0 = new Coin ({
            name: coinsNames[0],
            current_price: coinsCurrentPrices[0],
            growth: growth[0],
        })
        const id1 = new Coin ({
            name: coinsNames[1],
            current_price: coinsCurrentPrices[1],
            growth: growth[1],
        })
        const id2 = new Coin ({
            name: coinsNames[2],
            current_price: coinsCurrentPrices[2],
            growth: growth[2],
        })
        const id3 = new Coin ({
            name: coinsNames[3],
            current_price: coinsCurrentPrices[3],
            growth: growth[3],
        })

        coinsDataForRequest.push(id0, id1, id2, id3);

        console.log(coinsDataForRequest);

    } catch(error){
        console.error(error);
    }
}

apiRequest();