import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entity/User"

export class UserController {

  public static getUser = async (req:Request, res:Response,) => {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.params.id) })

      return res.status(200).json({
        user: user
      })

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

      await userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          first_name: req.body.first_name ?? user.first_name,
          last_name: req.body.last_name ?? user.last_name,
          middle_name: req.body.middle_name ?? user.middle_name,
          username: req.body.username ?? user.username,
          email: req.body.email ?? user.email,
          phone: req.body.phone ?? user.phone
        })
        .where('id = :id', { id: parseInt(req.params.id) })
      .execute()

      return res.status(200).json({
        message: 'User Updated Successfully',
        user: user
      })

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  };
}
