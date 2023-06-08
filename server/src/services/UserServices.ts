import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

export class UserService {

  public static async updateUser(userId: number, data: any) {

    const userRepository = AppDataSource.getRepository(User)
    const user = await userRepository.findOneBy({ id: userId })

    await userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        first_name: data.first_name ?? user.first_name,
        last_name: data.last_name ?? user.last_name,
        middle_name: data.middle_name ?? user.middle_name,
        username: data.username ?? user.username,
        email: data.email ?? user.email,
        phone: data.phone ?? user.phone
      })
      .where("id = :id", { id: userId })
    .execute()

    return await userRepository.findOneBy({ id: userId })
  };
}
