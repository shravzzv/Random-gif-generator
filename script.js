const img = document.querySelector('img')
const btn = document.querySelector('button')
const loader = document.querySelector('.loader')
const URL = 'https://api.giphy.com/v1/gifs/random'
const API_KEY = 'uDu77HHFhXrEpWJCGuI83p9YtVnbhQAf'
// free api key

const generateSrc = () => {
  loader.style.display = 'inline-block'
  img.style.display = 'none'
  fetch(`${URL}?api_key=${API_KEY}`, {
    mode: 'cors',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not OK')
      }
      return res.json()
    })
    .then((res) => {
      img.src = res.data.images.original.url
    })
    .catch((err) => {
      window.alert('An error occured! Check your internet connection.')
    })
    .finally(() => {
      loader.style.display = 'none'
      // in case of an error, previous gif continues displaying
      img.style.display = 'block'
    })
}

const radomize = (e) => {
  img.style.display = 'none'
  loader.style.display = 'inline-block'
  generateSrc()
}

btn.addEventListener('click', radomize)

generateSrc()
