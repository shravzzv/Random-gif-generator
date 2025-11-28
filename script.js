const img = document.querySelector('img')
const btn = document.querySelector('button')
const loader = document.querySelector('.loader')
const search = document.querySelector('input')

const BASE = 'https://giphy-proxy.saishravan384.workers.dev'

const UIloading = () => {
  loader.style.display = 'inline-block'
  img.style.display = 'none'
}

const UIloadingFinished = () => {
  loader.style.display = 'none'
  img.style.display = 'block'
}

const radomize = () => {
  search.value = ''
  generateSrc()
}

const generateSrc = async () => {
  UIloading()

  try {
    const res = await fetch(`${BASE}/random`)
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
  UIloading()

  try {
    const res = await fetch(`${BASE}/search?q=${encodeURIComponent(query)}`)
    if (!res.ok) throw new Error('Network response was not OK')
    const data = await res.json()
    if (!data.data || data.data.length < 1) {
      throw new Error('Invalid search input')
    }
    img.src = data.data[0].images.original.url
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
