const newsData = {
    finance: {
        en: [
            {
                title: "Markets Snap 4-Week Losing Streak as Tech Stocks Lead Rally",
                content: "U.S. stocks closed higher on Friday, with major indexes snapping a four-week losing streak as technology shares led a broad-based rally. The S&P 500 gained 1.2%, while the Nasdaq Composite rose 2.1%, marking their best weekly performances since November.",
                date: "March 15, 2024",
                link: "https://www.perplexity.ai/page/markets-snap-4-week-losing-str-3ooX9WiBT1uz0TIiVdXZLg"
            }
        ],
        fa: [
            {
                title: "پایان روند نزولی ۴ هفته‌ای بازار با رهبری سهام تکنولوژی",
                content: "سهام آمریکا روز جمعه با افزایش به کار خود پایان داد و شاخص‌های اصلی به روند نزولی چهار هفته‌ای خود پایان دادند، در حالی که سهام تکنولوژی پیشتاز این رشد گسترده بود. شاخص S&P 500 با ۱.۲ درصد و شاخص نزدک با ۲.۱ درصد افزایش، بهترین عملکرد هفتگی خود را از نوامبر تاکنون ثبت کردند.",
                date: "۲۵ اسفند ۱۴۰۲",
                link: "https://www.perplexity.ai/page/markets-snap-4-week-losing-str-3ooX9WiBT1uz0TIiVdXZLg"
            }
        ]
    }
};

function showCategory(category) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add('active');

    // Get current language
    const lang = document.body.className.includes('rtl') ? 'fa' : 'en';
    
    // Get news for selected category
    const news = newsData[category]?.[lang] || [];
    
    // Display news
    const container = document.getElementById('newsContainer');
    container.innerHTML = news.map(item => `
        <div class="news-card" onclick="window.open('${item.link}', '_blank')">
            <h3>${item.title}</h3>
            <p>${item.content}</p>
            <div class="news-date">${item.date}</div>
        </div>
    `).join('');
}

// Show finance news by default when page loads
document.addEventListener('DOMContentLoaded', () => {
    showCategory('finance');
});