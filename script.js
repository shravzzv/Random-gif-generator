const img = document.querySelector('img')
const btn = document.querySelector('button')
const loader = document.querySelector('.loader')
const search = document.querySelector('input')

const API_KEY = 'uDu77HHFhXrEpWJCGuI83p9YtVnbhQAf'
// free api key

const UIloading = () => {
  loader.style.display = 'inline-block'
  img.style.display = 'none'
}

const UIloadingFinished = () => {
  loader.style.display = 'none'
  img.style.display = 'block'
}

const radomize = (e) => {
  search.value = ''
  generateSrc()
}

const generateSrc = async () => {
  const URL = 'https://api.giphy.com/v1/gifs/random'
  UIloading()

  try {
    const res = await fetch(`${URL}?api_key=${API_KEY}`)
    if (!res.ok) throw new Error('Network response was not OK')
    const data = await res.json()
    img.src = data.data.images.original.url
  } catch (error) {
    console.error(error)
  } finally {
    UIloadingFinished()
  }
}

const handleSearch = async (query) => {
  const url = 'https://api.giphy.com/v1/gifs/search'
  UIloading()

  try {
    const res = await fetch(`${url}?api_key=${API_KEY}&q=${query}`)
    if (!res.ok) throw new Error('Network response was not OK')
    const data = await res.json()
    if (data.data.length < 1) {
      throw new Error('Invalid search input')
    } else {
      img.src = data.data[0].images.original.url
    }
  } catch (error) {
    console.error(error)
  } finally {
    UIloadingFinished()
  }
}

btn.addEventListener('click', radomize)

search.addEventListener('input', (e) => {
  if (e.target.value.trim()) {
    handleSearch(e.target.value)
  }
})

document.addEventListener('DOMContentLoaded', generateSrc)
