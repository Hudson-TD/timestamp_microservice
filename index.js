// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", (req, res) => {
  let utc = new Date().toUTCString();
  let unix = Math.floor(Date.now());
  res.json({
    unix: unix,
    utc: utc
  })
});

app.get("/api/:date", (req, res) => {
  let query = req.params.date;
  let validate = new Date(query);

  if (isNaN(validate)) {
    query = parseInt(query);

    if (isNaN(query)) {
      res.send({ error: "Invalid Date" })
    }

    let utc = new Date(query).toUTCString();
    res.json({
      unix: query,
      utc: utc
    })
  }

  res.json({
    unix: Math.floor(validate.getTime()),
    utc: validate.toUTCString()
  })
})
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

