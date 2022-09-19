const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth-routes');

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/feed', feedRoutes);

app.listen(8080, () => {
  console.log('listening to port 8080');
});
