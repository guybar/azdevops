const express = require('express')
const fileUpload = require('express-fileupload');
const undici = require('undici')
const path = require('path')
const fs = require('fs');
const app = express()
const port = 8080

function parseUrl(usrUrl){
  const slashIndex = usrUrl.indexOf('/')
  const slashNextIndex = usrUrl.indexOf('/', (slashIndex + 2))
  return usrUrl.slice(slashNextIndex), usrUrl.slice(0, slashNextIndex)
}

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function create_sql_connection() {}

app.use(fileUpload({parseNested: false}));

app.get('/', (req, res) => {
  console.log(path.join(__dirname+'/views/index.html'))
  res.sendFile(path.join(__dirname+'/views/index.html'));

})

app.post("/uploadFile", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.myFile;
  const path = __dirname + "/uploads/" + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});

app.post("/uploadPath", (req, res) => {
  const usrUrl = req.body.myURL
  let url, path = parseUrl(usrUrl)
  console.log(url)
  console.log(path)
  const {
    statusCode,
    headers,
    trailers,
    body
  } = undici.request({origin: url})

  fs.writeFile(__dirname + "/uploads/" + makeid(12), body, err => {
    if (err) {
      return res.status(500).send(err);
    }
  })

  return res.send({ status: "success", path: path });
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})