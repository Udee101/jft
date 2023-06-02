import * as express from "express"
import { UserController } from "../controller/v1/UserController"
import { AuthController } from "../controller/v1/AuthController"
import { authenticateToken } from "../middleware"
import { ListingController } from "../controller/v1/ListingController"

const router = express.Router()

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)

router.use('/users/:id', authenticateToken)
router.get('/users/:id', UserController.getUser)
router.post('/users/:id', UserController.update)
router.get('/users/:id/listings', ListingController.getUserListings)

router.get('/listings', ListingController.index)
router.post('/listings', authenticateToken, ListingController.create)

router.use('/listings/:id', authenticateToken)
router.get('/listings/:id', ListingController.show)
router.post('/listings/:id', ListingController.update)
router.delete('/listings/:id', ListingController.destroy)

export default router
