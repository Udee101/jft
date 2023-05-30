import * as express from "express"
import { UserController } from "../controller/v1/UserController"
import { AuthController } from "../controller/v1/AuthController"

const router = express.Router()

router.post('/register', AuthController.register)
router.get('/users', UserController.getAllUsers)
router.get('/users/:id', UserController.getUser)
router.post('/users/:id', UserController.update)
router.delete('/users/:id', UserController.deleteUser)

export default router
