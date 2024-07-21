const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const sequelize = require('./models'); // Add this line

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
