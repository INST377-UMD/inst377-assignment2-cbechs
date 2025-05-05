// Voice command functions (common to all pages)
if (annyang) {
    const commands = {
      'hello': () => alert('Hello World'),
      'change the color to *color': (color) => {
        document.body.style.backgroundColor = color;
      },
      'navigate to *page': (page) => {
        const route = page.toLowerCase();
        if (route === 'home') window.location.href = 'index.html';
        if (route === 'stocks') window.location.href = 'stocks.html';
        if (route === 'dogs') window.location.href = 'dogs.html';
      }
    };
    annyang.addCommands(commands);
  }
  
  // Simple helper navigation function
  function navigate(page) {
    if (page === 'index') window.location.href = 'index.html';
    if (page === 'stocks') window.location.href = 'stocks.html';
    if (page === 'dogs') window.location.href = 'dogs.html';
  }
  
  // Fetch daily quote for home page
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('quote')) {
      fetch('https://zenquotes.io/api/random')
        .then(res => res.json())
        .then(data => {
          document.getElementById('quote').textContent = `"${data[0].q}" — ${data[0].a}`;
        })
        .catch(() => {
          document.getElementById('quote').textContent = "Failed to load quote.";
        });
    }
  });
  