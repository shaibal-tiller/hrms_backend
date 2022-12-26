var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();



// Import All API Files
var ZoneApi = require('./routes/api/zone_wise_info');
var SNDApi = require('./routes/api/snd_wise_info');
var FeederApi = require('./routes/api/feeder_wise_info');
var DTApi = require('./routes/api/dt_wise_info');
var SubStationApi = require('./routes/api/substation_wise_info');
var BusbarAPI = require('./routes/api/busbar_info');
var cableAPI = require('./routes/api/cable_info');
var capacitorBankAPI = require('./routes/api/capacitorBank_info');
var conductorAPI = require('./routes/api/conductor_info');
var currentTransformerAPI = require('./routes/api/current_transformer_info');
var distributionTransformerAPI = require('./routes/api/distributionTransformer_info');
var LDBAPI = require('./routes/api/ldb_info');
var fuseAPI = require('./routes/api/fuse_info');
var meterAPI = require('./routes/api/meter_info');
var potentialTrAPI = require('./routes/api/potentialTransformer_info');
var powerTrAPI = require('./routes/api/powerTransformer_info');
var relayAPI = require('./routes/api/relay_info');
var rmuAPI = require('./routes/api/rmu_info');
var supportStructureAPI = require('./routes/api/supportStructure_info');
var surgeArrestorAPI = require('./routes/api/surgeArrestor_info');
var switchAPI = require('./routes/api/switch_info');
var switchgearAPI = require('./routes/api/switchGear_info');
var consumerAPI = require('./routes/api/consumer_info');
var summaryAPI = require('./routes/api/summary');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);


/**
 * Usage of All API 
 * In browser, URL should be: http://HOSTNAME/APIUSAGE
*/
app.use('/api/zone', ZoneApi);
app.use('/api/snd', SNDApi);
app.use('/api/feeder', FeederApi);
app.use('/api/dt', DTApi);
app.use('/api/ss', SubStationApi);
app.use('/api/busbar', BusbarAPI);
app.use('/api/cable', cableAPI);
app.use('/api/capacitorBank', capacitorBankAPI);
app.use('/api/conductor', conductorAPI);
app.use('/api/currenttransformer', currentTransformerAPI);
app.use('/api/distributiontransformer', distributionTransformerAPI);
app.use('/api/ldb', LDBAPI);
app.use('/api/fuse', fuseAPI);
app.use('/api/meter', meterAPI);
app.use('/api/potentialtransformer', potentialTrAPI);
app.use('/api/powertransformer', powerTrAPI);
app.use('/api/relay', relayAPI);
app.use('/api/rmu', rmuAPI);
app.use('/api/poles/', supportStructureAPI);
app.use('/api/surgearrestor', surgeArrestorAPI);
app.use('/api/switch', switchAPI);
app.use('/api/switchgear', switchgearAPI);
app.use('/api/consumer', consumerAPI);
// Summary Data
app.use('/api/summary', summaryAPI);





app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
