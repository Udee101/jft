import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"

export class UserController {

  public static getAllUsers = async(req:Request, res:Response) => {

    const users = await AppDataSource.getRepository(User).find()
    return res.status(200).json({
      'users': users
    })

  };

  public static getUser = async (req:Request, res:Response,) => {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.params.id) })

      return res.status(200).json(user)

    } catch (error) {
      return res.status(404).json({
        message: error.message
      })
    }
  };

  public static update = async(req:Request, res:Response) => {
    try {

      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOneBy({ id: parseInt(req.params.id)})

      user.first_name = req.body.first_name ?? user.first_name
      user.last_name = req.body.last_name ?? user.last_name
      user.middle_name = req.body.middle_name ?? user.middle_name
      user.username = req.body.username ?? user.username
      user.email = req.body.email ?? user.email
      user.phone = req.body.phone ?? user.phone

      await userRepository.save(user)

      return res.status(200).json({
        message: 'User Updated Successfully',
        'user': user
      })

    } catch (error) {
      return res.json({ message: error.message })
    }
  };

  public static deleteUser = async(req:Request, res:Response) => {
  try {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id: parseInt(req.params.id)})

    await userRepository.remove(user)
    
    return res.status(200).json({message: "User deleted successfully"})

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

}
