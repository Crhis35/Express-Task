const dotenv = require('dotenv');
const { sequelize } = require('./models');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION Shuting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });

const app = require('./app');

//Blue prints
app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), async () => {
  await sequelize.sync();
  console.log(`App runing on port ${app.get('port')}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UUNHANDLER REJECTION Shuting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
