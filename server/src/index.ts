import * as express from "express"
import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

dotenv.config({ path: ".env" });

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized");
}).catch(error => console.log(error))

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())

app.get("/users", async function(req:Request, res:Response) {
    const users = await AppDataSource.getRepository(User).find()
    res.json(users)
})

app.listen(PORT)

