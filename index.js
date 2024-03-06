// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let currentUTC = new Date();
  let currentTimeUnix = Math.floor(new Date().getTime() / 1000);

  let formatedGMT = currentUTC.toUTCString();

  res.json({ unix: currentTimeUnix, utc: formatedGMT })


})

app.get("/api/:date", (req, res) => {
  let query = req.params.date;
  let parsedDate = new Date(query);

  if (isNaN(parsedDate)) {
    res.send({ error: "Invalid Date" })
  } else {
    let formatedGMT = parsedDate.toUTCString()
    let parsedUnix = parsedDate.getTime() / 1000;
    res.json({ unix: parsedUnix, utc: formatedGMT })
  };

})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
