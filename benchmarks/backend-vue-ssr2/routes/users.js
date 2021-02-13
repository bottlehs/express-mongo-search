const Vue = require('vue');
const express = require('express');
var router = express.Router();

const template = require('fs').readFileSync('./views/index.template.html', 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
  template,
});

const context = {
    title: 'vue ssr',
    metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};

router.get('/', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>The visited URL is: {{ url }}</div>`,
  });

  renderer
  .renderToString(app, context, (err, html) => {
    console.log(html);
    console.log(err);
    if (err) {
      res.status(500).end('Internal Server Error')
      return;
    }
    res.end(html);
  });
})

module.exports = router;