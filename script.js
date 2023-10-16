const img = document.querySelector('img')
const btn = document.querySelector('button')
const loader = document.querySelector('.loader')
const search = document.querySelector('input')

const API_KEY = 'uDu77HHFhXrEpWJCGuI83p9YtVnbhQAf'
// free api key

const generateSrc = async () => {
  const URL = 'https://api.giphy.com/v1/gifs/random'

  loader.style.display = 'inline-block'
  img.style.display = 'none'

  try {
    const res = await fetch(`${URL}?api_key=${API_KEY}`)
    if (!res.ok) throw new Error('Network response was not OK')
    const data = await res.json()
    img.src = data.data.images.original.url
  } catch (err) {
    window.alert('An error occured! Check your internet connection.')
    console.error(err)
  }

  loader.style.display = 'none'
  img.style.display = 'block'
}

const radomize = (e) => {
  search.value = ''
  img.style.display = 'none'
  loader.style.display = 'inline-block'
  generateSrc()
}

const handleSearch = (e) => {
  const url = 'https://api.giphy.com/v1/gifs/search'
  const query = e.target.value.trim()
  loader.style.display = 'inline-block'
  img.style.display = 'none'

  if (query === '') {
    generateSrc()
    return
  }

  fetch(`${url}?api_key=${API_KEY}&q=${query}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not OK')
      }
      return res.json()
    })
    .then((res) => {
      if (res.data.length < 1) {
        throw new Error('Invalid search input')
      } else {
        img.src = res.data[0].images.original.url
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      loader.style.display = 'none'
      img.style.display = 'block'
    })
}

btn.addEventListener('click', radomize)

search.addEventListener('input', handleSearch)

document.addEventListener('DOMContentLoaded', (event) => {
  generateSrc()
})
