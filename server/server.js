const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const issueRoutes=require('./routes/issue.routes')

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to DB
connectDB();

// ✅ Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Mount routes
app.use('/users', authRoutes);
app.use("/issues",issueRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
