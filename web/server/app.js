import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import fixtures from './routes/fixture.routes';
const app = express();

const mongoURL = 'mongodb://localhost:27017/feedme';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api/health', (req, res) => {
    res.send('Hello');
});

app.use('/api', fixtures);

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;