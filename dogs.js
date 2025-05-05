function loadDogCarousel() {
  const carousel = document.getElementById('dog-carousel');
  carousel.innerHTML = '';

  const requests = Array.from({ length: 10 }, () =>
    fetch('https://dog.ceo/api/breeds/image/random').then(res => res.json())
  );

  Promise.all(requests).then(results => {
    const images = results.map(result => `<img src="${result.message}" />`);
    carousel.innerHTML = images.join('');
    new SimpleSlider(carousel, {
      interval: 3000,
      autoplay: true,
      pauseOnHover: true
    });
  });
}

function loadDogBreeds() {
  fetch('https://dogapi.dog/api/v2/breeds')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('breed-buttons');
      data.data.forEach(breed => {
        const btn = document.createElement('button');
        btn.textContent = breed.attributes.name;
        btn.classList.add('breed-button');
        btn.addEventListener('click', () => showBreedInfo(breed.attributes));
        container.appendChild(btn);
      });
    });
}

function showBreedInfo(info) {
  const container = document.getElementById('breed-info');
  container.innerHTML = `
    <h3>${info.name}</h3>
    <p>${info.description}</p>
    <p><strong>Life Expectancy:</strong> ${info.life.min}–${info.life.max} years</p>
  `;
  container.style.display = 'block';
}

if (annyang) {
  const dogCommand = {
    'load dog breed *name': function(name) {
      fetch('https://dogapi.dog/api/v2/breeds')
        .then(res => res.json())
        .then(data => {
          const breed = data.data.find(b => b.attributes.name.toLowerCase() === name.toLowerCase());
          if (breed) {
            showBreedInfo(breed.attributes);
            window.scrollTo({ top: document.getElementById('breed-info').offsetTop, behavior: 'smooth' });
          } else {
            alert(`No information found for breed: ${name}`);
          }
        });
    }
  };
  annyang.addCommands(dogCommand);
}

document.addEventListener('DOMContentLoaded', () => {
  loadDogCarousel();
  loadDogBreeds();
});
