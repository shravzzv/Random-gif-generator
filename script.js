const img = document.querySelector('img')
const btn = document.querySelector('button')
const loader = document.querySelector('.loader')
const URL = 'https://api.giphy.com/v1/gifs/random'
const API_KEY = 'uDu77HHFhXrEpWJCGuI83p9YtVnbhQAf'
// free api key

const generateSrc = () => {
  fetch(`${URL}?api_key=${API_KEY}`, {
    mode: 'cors',
  })
    .then((res) => res.json())
    .then((res) => {
      img.src = res.data.images.original.url
      img.style.display = 'block'
      loader.style.display = 'none'
    })
    .catch((err) => console.log(err))
}

const radomize = (e) => {
  img.style.display = 'none'
  loader.style.display = 'inline-block'
  generateSrc()
}

btn.addEventListener('click', radomize)

generateSrc()
