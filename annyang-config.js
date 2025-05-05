if (annyang) {
  let commands = {
    // Base voice commands
    'hello': () => alert('Hello World!'),

    'change the color to *color': (color) => {
      document.body.style.backgroundColor = color;
    },

    'navigate to *page': (page) => {
      const pageMap = { home: 'index', stocks: 'stocks', dogs: 'dogs' };
      const target = pageMap[page.toLowerCase()];
      if (target) {
        window.location.href = `${target}.html`;
      } else {
        alert(`Unknown page: ${page}`);
      }
    },

    // Stock page voice command
    'lookup *ticker': (ticker) => {
      if (window.location.pathname.includes('stocks')) {
        const input = document.getElementById('stock-input');
        if (input) {
          input.value = ticker.toUpperCase();
          fetchStock(); // defined in stocks.js
        }
      }
    },

    // Dogs page voice command
    'load dog breed *breedName': (breedName) => {
      if (window.location.pathname.includes('dogs') && window.allBreeds) {
        const match = window.allBreeds.find(b =>
          b.attributes.name.toLowerCase() === breedName.toLowerCase()
        );
        if (match) {
          showBreedInfo(match); // defined in dogs.js
        } else {
          alert(`Could not find dog breed: "${breedName}"`);
        }
      }
    }
  };

  annyang.addCommands(commands);
  annyang.start();
}
