module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    //proxy: 'http://127.0.0.1:8080/'
      proxy:'https://8080-ae9eb555-d51d-461e-b6cc-6a73d847beb5.ws-us02.gitpod.io/'
  },
  pages: {
    index: {
      // entry for the page
      entry: 'src/pages/index/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'IEGM-Ranking',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common','index']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    
  }
}

