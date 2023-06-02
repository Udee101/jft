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
      email: "email|required",
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
      return res.status(400).json(result)
    }

    const userRepository = AppDataSource.getRepository(User)
    const checkIfUser = await userRepository.findOne({
      where: [{ username: username }, { email: email }]
    })

    if (checkIfUser) {
      return res.status(400).json({
        message: 'Username or email is already taken.'
      })
    }
      
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const user = userRepository.create({
      first_name,
      last_name,
      username,
      email,
      phone,
      password: hashedPassword,
    })
    
    await userRepository.insert(user)
    
    return res.status(201).json({
      message: 'Registration Successfull!',
      user: user
    })  
  };

  public static login = async(req:Request, res:Response) => {

    const Validator = require("fastest-validator");
    const { usernameOrEmail, password } = req.body

    const v = new Validator()
    const schema = {
      usernameOrEmail: 'string|required', 
      password: 'string|required'
    }

    const check = v.compile(schema)
    const result = check(req.body)

    if (result !== true) {
      return res.status(400).json(result)
    }

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: [
        { username: usernameOrEmail }, 
        { email: usernameOrEmail }
      ]
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

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)

    return res.status(200).json({
      message: 'Login Successfull',
      user: user,
      token: token
    })
  }
}
