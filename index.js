require('dotenv').config();

const morgan = require('morgan');
const helmet = require('helmet');
const app = require('./app');

app.use(morgan);
app.use(helmet());

const productsRouter = require('./routes/productsRouter');

app.use('/products', productsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
