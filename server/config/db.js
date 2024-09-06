const mongoose = require('mongoose');

const connectWithDb = () => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(process.env.DB_URL)
    .then(console.log(`DB 연결 완료`))
    .catch((err) => {
      console.log(`DB 실패 ERROR : ${err}`);
      process.exit(1);
    });
};

module.exports = connectWithDb;
