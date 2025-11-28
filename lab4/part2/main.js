const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('.dark');
const overlay = document.querySelector('.overlay');

// Remote image base URL from MDN
const baseUrl = 'https://mdn.github.io/shared-assets/images/examples/learn/gallery/';

// Image file names
const imageFiles = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];

// Alt text for each image
const imageAlts = [
  'Closeup of a human eye',
  'Rock that looks like a wave',
  'Purple and white pansies',
  'Section of wall from a pharaoh\'s tomb',
  'Large moth on a leaf'
];

// Create thumbnails
for (let i = 0; i < imageFiles.length; i++) {
  const newImage = document.createElement('img');
  newImage.src = baseUrl + imageFiles[i];
  newImage.alt = imageAlts[i];
  thumbBar.appendChild(newImage);

  newImage.addEventListener('click', () => {
    displayedImage.src = newImage.src;
    displayedImage.alt = newImage.alt;
  });
}

// Darken/Lighten button logic
btn.addEventListener('click', () => {
  if (btn.classList.contains('dark')) {
    btn.classList.replace('dark', 'light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  } else {
    btn.classList.replace('light', 'dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  }
});
