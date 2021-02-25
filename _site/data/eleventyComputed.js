// Always ensure the key ends in a slash
const buildKeyFromURL = url => (url.match(/\/$/) ? url : url + '/')

module.exports = {
  eleventyNavigation: {
    key: data => {
      return buildKeyFromURL(data.page.url)
    },
    parent: data => {
      const url = data.page.url

      if (url === '/' || url === '') {
        return null
      }

      const sections = url.split('/')

      return buildKeyFromURL(
        sections.slice(0, -2).join('/')
      )
    },
    title: data => data.title,
    order: data => data.order
  }
}
