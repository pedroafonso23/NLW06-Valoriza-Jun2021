import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
    sub: string
}


export function ensureAuthenticate(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    // Receber o token
    const authToken = request.headers.authorization
    
    // Validar se token está preenchido
    if (!authToken) {
        return response.status(401).end()
    }

    const [, token] = authToken.split(" ")

    try {
        // Validar se token é válido
        const { sub } = verify(token, "019cb62eafdeb0bd6415c038674d516c") as IPayload

        // Recuperar informações do usuário
        request.user_id = sub

        return next()
    } catch(err) {
        return response.status(401).end()
    }
}