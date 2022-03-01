import express, { Application, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import xml2js from 'xml2js';
import 'dotenv/config';

const PORT: number = +process.env.PORT;
const app: Application = express();
app.use(cors());

app.get('/API1', async (req: Request, res: Response) => {
  try {
    const delayOne: number = +process.env.DELAY_1;
    const fileRoute: string = path.resolve('database');
    const fileData = await fs.promises.readFile(fileRoute + '/persons.json');
    setTimeout(() => {
      res.json({ person: JSON.parse(fileData.toString()) });
    }, delayOne);
  } catch (err) {
    //log error
    console.log(err);
    res.sendStatus(500);
  }
});

app.get('/API2', async (req: Request, res: Response) => {
  try {
    const delayOne: number = +process.env.DELAY_2;
    const fileRoute: string = path.resolve('database');
    const fileData = await fs.promises.readFile(fileRoute + '/persons.xml');
    const parser = new xml2js.Parser({
      explicitArray: false,
    });
    const jsonData = await parser.parseStringPromise(fileData);
    setTimeout(() => {
      res.send(jsonData);
    }, delayOne);
  } catch (err) {
    //log error
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT} port`);
});
