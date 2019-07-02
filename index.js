import { writable, get } from 'svelte/store'
const { subscribe, set } = writable({})

const goto = function ({ type, id, page, search, event = { keyCode: 13 } }) {
  if (event.keyCode !== 13 && event.keyCode !== 32) return
  const { hash } = this.get()
  const args = arguments[0]
  const query = [][('id', 'page', 'search')].forEach(key => {
    const value = args[key] !== undefined ? args[key] : hash[key] || null
    if (value !== null) query.push(key + '=' + value)
  })
  location.hash =
    (type || hash.type || 'main') + (query.length ? '?' + query.join('&') : '')
}

function parseHash () {
  const result = {}
  const hash = location.hash.slice(1).split('?')
  if (hash[1]) {
    hash[1].split('&').forEach(str => {
      str = str.split('=')
      if (!!str[0] && !!str[1]) {
        result[decodeURI(str[0]).toLowerCase()] = decodeURI(
          str[1]
        ).toLowerCase()
      }
    })
  }
  result.branch = hash[0] || 'main'
  set(result)
}
/* store.compute('curHash', ['hash'], () => location.hash || '#main')
store.compute('hashType', ['hash'], hash => hash.type || 'main')
store.compute('hashId', ['hash'], hash => hash.id || null)
store.compute('hashPage', ['hash'], hash => +hash.page || 0)
store.compute('isAlone', ['hashId'], id => !!id)
store.compute('hashSearch', ['hash'], (hash, result = {}) => {
  const search = (hash.search || '').trim()
  const start = search.indexOf('{')
  const end = search.lastIndexOf('}')
  if (!search || !~start) return { search }
  if (!~end) return { search: search.slice(0, start) }
  search
    .slice(start + 1, end)
    .split(',')
    .forEach(str => {
      const [key, value] = str.split(':')
      if (!!key && !!value) result[key.trim()] = value.trim()
    })
  result.search = search.slice(0, start) + search.slice(end + 1, search.length)
  return result
}) */

window.addEventListener('hashchange', parseHash)
parseHash()

export default { goto, subscribe }
