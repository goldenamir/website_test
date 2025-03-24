const cryptoList = [
    {
        id: 'ethereum',
        logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        link: 'https://coinmarketcap.com/currencies/ethereum/'
    },
    {
        id: 'bitcoin',
        logo: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        link: 'https://coinmarketcap.com/currencies/bitcoin/'
    },
    {
        id: 'binancecoin',
        logo: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        link: 'https://coinmarketcap.com/currencies/bnb/'
    },
    {
        id: 'dogecoin',
        logo: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
        link: 'https://coinmarketcap.com/currencies/dogecoin/'
    }
];

const translations = {
    en: {
        price: 'Price',
        change: '24h Change',
        bitcoin: 'Bitcoin',
        ethereum: 'Ethereum',
        binancecoin: 'Binance Coin',
        dogecoin: 'Dogecoin'
    },
    fa: {
        price: 'قیمت',
        change: 'تغییرات ۲۴ ساعته',
        bitcoin: 'بیت‌کوین',
        ethereum: 'اتریوم',
        binancecoin: 'بایننس کوین',
        dogecoin: 'دوج کوین'
    }
};

let currentLang = 'en';

function switchLanguage(lang) {
    currentLang = lang;
    document.body.className = lang === 'fa' ? 'rtl' : 'ltr';
    
    document.querySelectorAll('[data-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    fetchCryptoData();
}

async function fetchCryptoData() {
    try {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoList.map(crypto => crypto.id).join(',')}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

function displayCryptoData(data) {
    const container = document.getElementById('cryptoContainer');
    container.innerHTML = '';

    cryptoList.forEach(crypto => {
        const cryptoData = data[crypto.id];
        if (!cryptoData) return;

        const price = cryptoData.usd;
        const change = cryptoData.usd_24h_change;
        const changeClass = change >= 0 ? 'price-change-positive' : 'price-change-negative';
        const changeSymbol = change >= 0 ? '+' : '';

        const card = document.createElement('div');
        card.className = 'crypto-card';
        if (crypto.link) {
            card.onclick = () => window.open(crypto.link, '_blank');
        }

        card.innerHTML = `
            <div class="crypto-header">
                <img src="${crypto.logo}" alt="${crypto.id}" class="crypto-logo">
                <h2>${translations[currentLang][crypto.id]}</h2>
            </div>
            <p>${translations[currentLang].price}: $${price.toFixed(2)}</p>
            <p>${translations[currentLang].change}: <span class="${changeClass}">${changeSymbol}${change.toFixed(2)}%</span></p>
        `;

        container.appendChild(card);
    });
}

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    fetchCryptoData();
    // Set initial language based on HTML lang attribute
    const initialLang = document.documentElement.lang || 'en';
    switchLanguage(initialLang);
});