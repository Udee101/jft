import * as express from "express"
import { UserController } from "../controller/v1/UserController"
import { AuthController } from "../controller/v1/AuthController"
import { authenticateToken } from "../middleware"

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.get('/users', authenticateToken, UserController.getAllUsers)

router.use('/users/:id', authenticateToken)
router.get('/users/:id', UserController.getUser)
router.post('/users/:id', UserController.update)
router.delete('/users/:id', UserController.deleteUser)

export default router
