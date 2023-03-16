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
EXPRESS_APP.get('/user-profile', (req, res) => {
  const rawData = fs.readFileSync('F:/Tarkov Single Player/0.13.0.3.22032/user/profiles/bed1be640b83ca4aa59bc20b.json', 'utf-8')
  const userProfile = JSON.parse(rawData);
  res.json(userProfile)
})
//Starts the Express Server
EXPRESS_APP.listen('3000', () => {
  console.info(`Backend listening on port: 3000`)
});
