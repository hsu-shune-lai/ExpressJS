import express, { Request, Response, json } from "express";
import fs from "fs";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("appData.json");
  res.send(data.toString());
});
app.post("/", (req: Request, res: Response) => {
  const data = req.body;
  fs.writeFileSync("appData.json", JSON.stringify(data));
  res.send(`Received: ${req.method}`);
});
app.put("/", (req: Request, res: Response) => {
  const data = req.body;
  const existingData = JSON.parse(fs.readFileSync("appData.json").toString());
  const newData = [...existingData, data];
  fs.writeFileSync("appData.json", JSON.stringify(newData));
  res.send(`Received: ${req.method}`);
});

app.delete("/", (req: Request, res: Response) => {
  const { name } = req.query;
  const filename = name as string;
  fs.unlinkSync;
  fs.unlink(filename, (err) => {
    console.log(err);
    res.send(`Received: ${req.method}`);
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
