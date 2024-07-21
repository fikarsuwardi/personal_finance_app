const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Tambahkan ini

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors()); // Tambahkan ini

app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
