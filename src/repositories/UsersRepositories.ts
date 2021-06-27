import { EntityRepository, Repository } from "typeorm"
import { User } from "../entities/User"

@EntityRepository(User)
class usersRepositories extends Repository<User> {}

export { usersRepositories }