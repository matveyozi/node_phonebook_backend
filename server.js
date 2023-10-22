// const app = require('./app');

// const {PORT} = process.env;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// });

const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Datababase connected http://localhost:${PORT}/`);
    app.listen(PORT);
  })
  .catch(err => {
    console.log('error==>>>', err.message);

    process.exit(1);
  });
