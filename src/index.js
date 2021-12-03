const express = require('express');
const morgan = require('morgan');

require('./db/mongoose');
const employeeRouter = require('./middleware/emp-route');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(employeeRouter);

app.listen(port, () => {
    console.log('Server up and running on port: ' + port);
})
