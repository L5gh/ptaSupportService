const express = require('express');

const app = express();

app.use(express.static('./'));
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.info('app listening on', port);
});
