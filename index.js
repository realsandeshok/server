require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(cors({
  origin: 'https://stockmanagementsystem-client.vercel.app'
}))
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Debugging

  app.get('/', (req , res) => {
    res.send('Backend Working')
  })

  const userRoutes = require('./routes/userRoutes');
  const productRoutes = require('./routes/productRoutes');
  
  app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));