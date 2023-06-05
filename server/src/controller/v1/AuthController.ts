import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { validate } from "class-validator"

dotenv.config({ path: ".env" });
export class AuthController {
  public static register = async(req:Request, res:Response) => {

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User()
    user.first_name = req.body.first_name
    user.last_name = req.body.last_name
    user.username = req.body.username
    user.email = req.body.email
    user.phone = req.body.phone
    user.password = hashedPassword

    const userRepository = AppDataSource.getRepository(User)
    const errors = await validate(user, {validationError: { target: false}})
    if (errors.length > 0) {
      return res.status(400).json({ errors: errors })
    } else {
      const userAlreadyExist = await userRepository.findOne({
        where: [{ username: req.body.username }, { email: req.body.email }]
      })
  
      if (userAlreadyExist) {
        return res.status(400).json({
          message: "Username or email is already taken."
        })
      }
      await userRepository.insert(user)
      
      return res.status(201).json({
        message: "Registration Successfull!",
        user: user
      })  
    }
  };

  public static login = async(req:Request, res:Response) => {

    const { usernameOrEmail, password } = req.body

    if (!usernameOrEmail) {
      return res.status(400).json({
        message: "The username or email field is required"
      })
    }
    if (!password) {
      return res.status(400).json({
        message: "The password field is required"
      })
    }

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOne({
      where: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    })

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {
      return res.status(400).json({
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 20 })

    return res.status(200).json({
      message: "Login Successfull",
      user: user,
      token: token
    })
  }
}
