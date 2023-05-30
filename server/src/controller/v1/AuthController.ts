import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"


export class AuthController {
  public static register = async(req:Request, res:Response) => {
    try {
      const userRepository = AppDataSource.getRepository(User)

      const user = userRepository.create(req.body)

      await userRepository.save(user)

      return res.status(201).json({
        message: 'Registration Successfull!',
        'user': user
      })
      
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  };
}
