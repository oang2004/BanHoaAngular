const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const categoryRoutes = require('./routes/category');
const logoutRouter = require('./routes/logout');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const productRoutes = require('./routes/products');
const orderRouter = require('./routes/order');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api', categoryRoutes);
app.use('/api', logoutRouter);
app.use('/api', registerRouter);
app.use('/api', productRoutes);
app.use('/api', loginRouter);
app.use('/api', orderRouter);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
