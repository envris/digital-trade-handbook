const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)

  const markdownIt = require('markdown-it')
  const md = markdownIt()

  md.use(require('markdown-it-anchor'))

  md.use(require('markdown-it-emoji'))

  md.use(require('markdown-it-table-of-contents'), {
    containerHeaderHtml: '<h1>On this page:</h1>'
  })

  md.use(require('markdown-it-container'), 'info', {
    validate: function (params) {
      return params.trim().match(/^info(.*)$/)
    },
    render: function (tokens, idx) {
      return (tokens[idx].nesting === 1) ? '<div class="callout-info">' : '</div>\n'
    }
  }).use(require('markdown-it-container'), 'warning', {
    validate: function (params) {
      return params.trim().match(/^warning(.*)$/)
    },
    render: function (tokens, idx) {
      return (tokens[idx].nesting === 1) ? '<div class="callout-warning">' : '</div>\n'
    }
  }).use(require('markdown-it-container'), 'alert', {
    validate: function (params) {
      return params.trim().match(/^alert(.*)$/)
    },
    render: function (tokens, idx) {
      return (tokens[idx].nesting === 1) ? '<div class="callout-alert">' : '</div>\n'
    }
  })

  eleventyConfig.setLibrary('md', md)

  return {
    dir: {
      input: '../',
      output: 'build/',
      layouts: '_site/layouts',
      data: '_site/data',
      includes: '_site/includes'
    }
  }
}
