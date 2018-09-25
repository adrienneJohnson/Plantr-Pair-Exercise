const html = require('html-template-tag');

module.exports = (planters) => html`<!DOCTYPE html>
<html>
  <head>
    <title>Plantr</title>
    <!-- other metadata, links to css -->
  </head>
  <body>
    <h1>Plantrs</h1>
    ${planters.map(planter => html`<p>${planter.name}</p>`)}
  </body>
</html>`

