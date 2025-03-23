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
        console.error('Error fetching crypto