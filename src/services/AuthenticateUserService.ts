import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IAuthenticateRequest {
    email: string
    password: string
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const userRepositories = getCustomRepository(UsersRepositories)

        // Verificar se email existe
        const user = await userRepositories.findOne({
            email
        })

        if (!user) {
            throw new Error("E-mail or Password incorrect")
        }

        // Verificar se a senha está correta
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error("E-mail or Password incorrect")
        }

        // Gerar Token
        const token = sign({
            email: user.email
        }, "019cb62eafdeb0bd6415c038674d516c", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }