const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middleware/logger');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();


app.set('trust proxy', 1);

app.use(helmet());
app.use(express.json());
app.use(logger);

app.use(cors({
  origin: 'https://project-management-system-frontend-fwzi.onrender.com',
  credentials: true
}));

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions'
});

app.use(session({
  name: 'connect.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    httpOnly: true,
    secure: true,      
    sameSite: 'none',    
    maxAge: 1000 * 60 * 60 * 24
  }
}));

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reports', reportRoutes);

module.exports = app;
