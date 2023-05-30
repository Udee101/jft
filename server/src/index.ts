import * as express from "express"
import * as dotenv from "dotenv"
import { AppDataSource } from "./data-source"
import router from "./routes/routes"

dotenv.config({ path: ".env" });

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized");
}).catch(error => console.log(error))

const PORT = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', router)

app.listen(PORT)

