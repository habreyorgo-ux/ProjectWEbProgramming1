const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes=require('./routes/trainerRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/api/users', userRoutes);
app.use('/api/trainer',trainerRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
 
module.exports = app;
 