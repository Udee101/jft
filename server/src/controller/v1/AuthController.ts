import * as dotenv from "dotenv"
import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

dotenv.config({ path: ".env" });
export class AuthController {
  public static register = async(req:Request, res:Response) => {

    const Validator = require("fastest-validator");
    
    const { 
      first_name,
      last_name,
      username,
      email,
      phone,
      password,
    } = req.body

    const v = new Validator()
    const schema = {
      first_name: "string|required",
      last_name: "string|required",
      username: "string|required",
      email: "string|required|email",
      phone: "string|required",
      password: "string|required",
    }
    const check = v.compile(schema)

    const result = check({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      phone: phone,
      password: password
    })

    if (result !== true) {
      const errors = result.map((el) => el.message)
      return res.status(400).json(errors)
    }

    const userRepository = AppDataSource.getRepository(User)
    
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = userRepository.create({
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      phone: phone,
      password: hashedPassword,
    })
    
    await userRepository.save(user)
    
    return res.status(201).json({
      message: 'Registration Successfull!',
      'user': user
    })  
  };

  public static login = async(req:Request, res:Response) => {

    const { usernameOrEmail, password } = req.body
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: [
        { username: usernameOrEmail }, 
        { email: usernameOrEmail }
      ]
    })

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }
    const passwordCheck = await bcrypt.compare(password, user.password)
    if (!passwordCheck) {
      return res.status(401).json({
        message: "Invalid Credentials"
      })
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 10 })

    return res.status(200).json({
      message: 'Login Successfull',
      'user': user,
      'token': token
    })
  }
}
