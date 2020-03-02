const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Routes
const campgroundRoutes = require('./routes/api/campgrounds');
const userRoutes = require('./routes/api/user');
const paymentRoutes = require('./routes/api/payment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const db = process.env.mongodbURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Db connected'))
  .catch(err => console.log('DB error', err));

const port = process.env.PORT || 5000;

app.use('/api/campgrounds', campgroundRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);

app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

// app.use(express.static(PUBLIC_DIR));

app.listen(port, () => console.log(`App listening on port ${port}`));
