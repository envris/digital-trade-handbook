const initNavigation = function () {
  initCollapsibleNav()
  initParentLists()
}

const initCollapsibleNav = function () {
  const nav = document.querySelector('nav.global')

  const title = nav.querySelector('h1')
  const toggle = createToggleEl(nav.classList, title)

  nav.classList.add('collapsible')
  nav.classList.add('closed')
  title.prepend(toggle)
}

const initParentLists = function () {
  const parentLists = document.querySelectorAll('nav.global li.has-children')

  parentLists.forEach(function (list, index) {
    const classList = list.classList

    classList.add('collapsible')
    classList.add(isSelected(list) ? 'open' : 'closed')

    const toggle = createToggleEl(classList)

    list.prepend(toggle)
  })
}

const isSelected = function (list) {
  return (list.classList.contains('selected') ||
    list.querySelectorAll('li.selected').length > 0)
}

const createToggleEl = function (classList, eventListener) {
  const toggle = document.createElement('i')
  toggle.className = 'toggle'

  const eventTarget = (eventListener !== undefined) ? eventListener : toggle

  eventTarget.addEventListener('click', () => {
    if (classList.contains('closed')) {
      classList.remove('closed')
      classList.add('open')
    } else {
      classList.remove('open')
      classList.add('closed')
    }
  })

  return toggle
}

document.addEventListener('DOMContentLoaded', initNavigation)
