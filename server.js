const express = require('express')
const dotenv = require('dotenv');
const path = require('path')
const bodyParser = require('body-parser');
const logger = require('morgan')
const createError = require('http-errors');
const cors = require('cors')
const dbConnection = require('./database/connection')
const AppError = require('../utils/AppError');
dotenv.config();

const app = express();

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

//db connectivity
dbConnection()

app.use(logger('dev',{
      skip:req => !req.url.endsWith(".html") && req.url.indexOf(".") > -1
}))
app.use(bodyParser.urlencoded({ limit:'10mb', extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //  console.log(req.headers);
  next();
});


//A BASE PATH ROUTE
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/user', userRoutes)



//catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.send('error for page');
// });

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
const PORT = process.env.PORT || 3010
app.listen(PORT, function(){
      console.log('app is running on:' , + PORT)
})



