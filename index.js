const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', function(req, res, next){
  var name = req.query.name;
  res.render('index', {
    title: 'Home',
    name: name
  })
});

app.listen(process.env.PORT || 3000, function(err){
  if(err){
    console.log(err);
  }
  console.log('Listening on port ' + 3000);
});

function sanitize(string){
  return string.replace('<script>', '&lt;script&gt;');
}

function sanizeInputForXSS(req, res, next){
  let queryKeys = Object.keys(req.query);
  let paramsKeys = Object.keys(req.params);

  queryKeys.forEach(key => {
    req.query[key] = sanitize(req.query[key]);
  })

  paramsKeys.forEach(key => {
    req.params[key] = sanitize(req.params[key]);
  })

  next();
}

