const apiKey = 'a_iwpSfJqUAXLwv9bgffqfNFrywCh4nj';
let stockChart = null;

function fetchStock() {
  const ticker = document.getElementById('stock-input').value.toUpperCase();
  const days = parseInt(document.getElementById('days-select').value);
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${startStr}/${endStr}?adjusted=true&sort=asc&limit=120&apiKey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.results || data.results.length === 0) {
        alert(`No data found for ${ticker}. It may be inactive or delisted.`);
        return;
      }

      const labels = data.results.map(item => new Date(item.t).toLocaleDateString());
      const values = data.results.map(item => item.c);
      const ctx = document.getElementById('stock-chart').getContext('2d');

      if (stockChart) stockChart.destroy();

      stockChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: `${ticker} Closing Prices`,
            data: values,
            borderWidth: 2,
            borderColor: '#2980b9',
            fill: false
          }]
        }
      });
    })
    .catch(err => {
      alert('Failed to fetch stock data. Please check the symbol.');
      console.error(err);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://tradestie.com/api/v1/apps/reddit?date=2022-04-03')
    .then(res => res.json())
    .then(data => {
      const top5 = data.slice(0, 5);
      const tbody = document.getElementById('reddit-stocks');

      top5.forEach(stock => {
        const row = document.createElement('tr');

        const ticker = document.createElement('td');
        const link = document.createElement('a');
        link.href = `https://finance.yahoo.com/quote/${stock.ticker}`;
        link.target = '_blank';
        link.textContent = stock.ticker;
        ticker.appendChild(link);

        const comments = document.createElement('td');
        comments.textContent = stock.no_of_comments;

        const sentiment = document.createElement('td');
        sentiment.textContent = stock.sentiment;
        sentiment.style.color = stock.sentiment.toLowerCase() === 'bullish' ? 'green' : 'red';

        row.appendChild(ticker);
        row.appendChild(comments);
        row.appendChild(sentiment);
        tbody.appendChild(row);
      });
    });
});

if (annyang) {
  const stockCommand = {
    'lookup *symbol': function(symbol) {
      document.getElementById('stock-input').value = symbol.toUpperCase();
      document.getElementById('days-select').value = '30';
      fetchStock();
    }
  };
  annyang.addCommands(stockCommand);
}
