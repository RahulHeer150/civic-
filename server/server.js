const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const issueRoutes=require('./routes/issue.routes')
const analyticsRoutes = require("./routes/analytics.routes");

dotenv.config();
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect to DB
connectDB();

// ✅ Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use("/analytics", analyticsRoutes);


// ✅ Mount routes

app.use('/users', authRoutes);
app.use("/issues",issueRoutes)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
