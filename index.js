require('dotenv').config();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const app = require('./app');

app.use(morgan('tiny'));
app.use(helmet());

const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');

app.use(bodyParser.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
