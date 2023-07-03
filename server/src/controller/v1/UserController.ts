import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../model/User"
import { UserService } from "../../services/UserServices";

export class UserController {

  public static getUser = async (req:Request, res:Response,) => {

    const user = await AppDataSource.getRepository(User).findOneBy({ id: parseInt(req.params.id) })

    return res.status(200).json({
      user: user
    })
  };

  public static update = async(req:Request, res:Response) => {

    const user = await UserService.updateUser(parseInt(req.params.id), req.body)

    return res.status(200).json({
      message: 'User Updated Successfully',
      user: user
    })
  };
}
