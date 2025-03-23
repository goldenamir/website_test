{cryptoList.map((crypto) => (
  <div 
    key={crypto.id}
    onClick={() => crypto.link && window.open(crypto.link, '_blank')}
    style={{ cursor: crypto.link ? 'pointer' : 'default' }}
  >
    <img src={crypto.logo} alt={crypto.id} />
    {/* ... rest of your crypto item rendering ... */}
  </div>
))} 