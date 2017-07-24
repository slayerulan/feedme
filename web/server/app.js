import express from 'express';
import path from 'path';
import fixtures from './routes/fixture.routes';
import { connect } from './mongo';
const app = express();

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/feedme';

// MongoDB Connection
connect(mongoURL);

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