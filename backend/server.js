const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./utils/error-handler');
const messages = require('./routes/api/messages.api');
const users = require('./routes/api/users.api');

const app = express();

app.use(helmet())
app.use(cors());
app.use(bodyParser.json());

app.use('/api/messages', messages);
app.use('/api/users', users);

app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));