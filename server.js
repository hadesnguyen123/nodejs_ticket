const express = require('express');
const path = require('path');   //thư viện path
const app = express();
const { sequelize } = require('./models');
const rootRouter = require('./routers');
const port = 8080
// cài ứng dụng sử dụng chuối json
//Phải đặt ở trên đây trc khi thực thi những cái khác
app.use(express.json())

// cài đặt router
app.use('/api/v1', rootRouter);


// cài đặt static file: lưu tài liệu hình ảnh, css, ...
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

//listion port
app.listen(port, () => {
  console.log('App listening on port http://localhost:8080');
})

const checkConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
checkConnect();

