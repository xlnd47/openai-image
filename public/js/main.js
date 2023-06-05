function onSubmit(e) {
  e.preventDefault();

  document.querySelector('.msg').textContent = '';
  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size) {
  try {
    toggleButtonSpinner(true); // Show the spinner and disable the button

    const response = await fetch('/openai/generateimage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      throw new Error('The images could not be generated');
    }

    const data = await response.json();
    // console.log(data);

    const imageUrls = data.data;

    const imageContainer = document.querySelector('.image-container');
    imageContainer.innerHTML = ''; // Clear the previous images

    imageUrls.forEach((imageUrl) => {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imageElement.alt = 'Generated Image';
      imageElement.classList.add('generated-image');
      imageContainer.appendChild(imageElement);
    });

    toggleButtonSpinner(false); // Hide the spinner and enable the button
  } catch (error) {
    document.querySelector('.msg').textContent = error;
    toggleButtonSpinner(false); // Hide the spinner and enable the button
  }
}

function toggleButtonSpinner(showSpinner) {
  const generateButton = document.querySelector('#generate-button');

  if (showSpinner) {
    generateButton.classList.add('button-spinner');
    generateButton.setAttribute('disabled', 'disabled');
  } else {
    generateButton.classList.remove('button-spinner');
    generateButton.removeAttribute('disabled');
  }
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);
