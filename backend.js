import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

export const EXPRESS_APP = express();
EXPRESS_APP.use(cors({origin: ['http://127.0.0.1:4200', 'http://localhost:4200']}));
EXPRESS_APP.use(bodyParser.urlencoded({
  extended: true
}));
EXPRESS_APP.use(bodyParser.json());
let profilePath = '';
EXPRESS_APP.post('/user/path', (req, res) => {
  profilePath = req.body.path;
  res.send();
});
EXPRESS_APP.get('/user/profile', (req, res) => {
  if (!profilePath) {
    res.status(500);
    return res.json({code: 'E1', message: 'Profile path not set.'})
  }
  let rawData;
  try {
    rawData = fs.readFileSync(profilePath, 'utf-8')
  } catch (e) {
    res.status(500);
    return res.json({code: 'E2', message: 'Invalid path'})
  }
  const userProfile = JSON.parse(rawData);
  res.json(userProfile)
});
//Starts the Express Server
EXPRESS_APP.listen('3000', () => {
  console.info(`Backend listening on port: 3000`)
});
