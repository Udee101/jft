import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import  * as bcrypt from "bcrypt"

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
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    
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
}
