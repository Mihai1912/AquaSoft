const express = require('express');
const app = express();
const port = 3000;
const { sequelize } = require('./models');
const hotelsRoutes = require('./routes/hotelsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const citiesRoutes = require('./routes/citiesRoutes');
const regionsRoutes = require('./routes/regionsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

app.use(express.json())

sequelize.sync({})
  .then(() => {
    console.log('Database connection established and synchronized successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Mini Sprint 2 API!');
});

app.use('/hotels', hotelsRoutes);
app.use('/user', usersRoutes);
app.use('/cities', citiesRoutes);
app.use('/regions', regionsRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
