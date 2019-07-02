import { writable, get } from 'svelte/store'
const store = writable({})
const { subscribe, set } = store

function go ({ branch, action, id, redirect = false }) {
  const prev = get(store)
  const args = arguments[0]
  const query = []
  ;['id', 'page', 'query'].forEach(prop => {
    const val = prop in args ? args[prop] : prev[prop] || null
    if (val !== null) query.push(prop + '=' + val)
  })
  let href = '/' + (branch || prev.branch || 'main') + '/'
  href += action || prev.action || (id ? 'view' : 'index')
  href += query.length ? '?' + query.join('&') : ''
  if (!redirect) history.pushState({}, '', href)
  else history.replaceState({}, '', href)
  parse()
}

function parse () {
  const result = {}
  const path = location.pathname.slice(1)
  const query = location.search.slice(1)
  if (query) {
    query.split('&').forEach(str => {
      const [prop, val] = decodeURI(str)
        .toLowerCase()
        .split('=')
      if (prop && val) result[prop] = val
    })
  }
  set({
    ...search(result.query),
    id: result.id || null,
    query: result.query || '',
    page: result.page ? +result.page || 0 : null,
    branch: path.split('/')[0] || 'main',
    action: path.split('/')[1] || 'index'
  })
}

function search (search) {
  search = (search || '').trim()
  const result = {}
  const start = search.indexOf('(')
  const end = search.lastIndexOf(')')
  if (!search || !~start) return { search }
  if (!~end) return { search: search.slice(0, start) }
  search
    .slice(start + 1, end)
    .split(',')
    .forEach(str => {
      const [prop, val] = str.split(':')
      if (prop && val) result[prop.trim()] = val.trim()
    })
  result.search = search.slice(0, start)
  result.search += search.slice(end + 1, search.length)
  return result
}

window.addEventListener('popstate', () => parse())
window.addEventListener('click', e => {
  if (e.target.href) {
    e.preventDefault()
    history.pushState({}, '', e.target.href)
  }
})
parse()

export default { go, subscribe }
