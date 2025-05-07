// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // DOM elements
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('#expose img');
  const hornAudio = document.querySelector('audio');
  const volumeSlider = document.getElementById('volume');
  const volumeIcon = document.querySelector('#volume-controls img');
  const playButton = document.querySelector('button');

  const jsConfetti = new JSConfetti();

  // Mapping horn values to images and sounds
  const hornData = {
    'air-horn': {
      img: 'assets/images/air-horn.svg',
      audio: 'assets/audio/air-horn.mp3',
    },
    'car-horn': {
      img: 'assets/images/car-horn.svg',
      audio: 'assets/audio/car-horn.mp3',
    },
    'party-horn': {
      img: 'assets/images/party-horn.svg',
      audio: 'assets/audio/party-horn.mp3',
    }
  };

  // Update horn image and audio on selection
  hornSelect.addEventListener('change', () => {
    const selectedHorn = hornSelect.value;
    if (hornData[selectedHorn]) {
      hornImage.src = hornData[selectedHorn].img;
      hornAudio.src = hornData[selectedHorn].audio;
    }
  });

  // Update volume icon and audio volume on slider input
  volumeSlider.addEventListener('input', () => {
    const volumeValue = Number(volumeSlider.value);
    hornAudio.volume = volumeValue / 100;

    let volumeLevel;
    if (volumeValue === 0) {
      volumeLevel = 0;
    } else if (volumeValue < 33) {
      volumeLevel = 1;
    } else if (volumeValue < 67) {
      volumeLevel = 2;
    } else {
      volumeLevel = 3;
    }

    volumeIcon.src = `assets/icons/volume-level-${volumeLevel}.svg`;
  });

  // Play sound and trigger confetti click
  playButton.addEventListener('click', () => {
    hornAudio.play();
    if (hornSelect.value === 'party-horn') {
      jsConfetti.addConfetti();
    }
  });
}