import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"
import { validate } from "class-validator"
import  * as bcrypt from "bcrypt"


export class AuthController {
  public static register = async(req:Request, res:Response) => {

    const newUser = new User();
    newUser.first_name = req.body.first_name
    newUser.last_name = req.body.last_name
    newUser.username = req.body.username
    newUser.email = req.body.email
    newUser.phone = req.body.phone
    newUser.password = req.body.password

    const checkErrors = await validate(newUser, { validationError: { target: false } })
    if (checkErrors.length > 0) {
      return res.status(400).json(checkErrors)
    }

    const userRepository = AppDataSource.getRepository(User)

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = userRepository.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    })

    await userRepository.save(user)

    return res.status(201).json({
      message: 'Registration Successfull!',
      'user': user
    })
  };
}
