import { Request, Response } from "express";
import { ListTagsServices } from "../services/ListTagsServices";


class ListTagsController {
    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsServices()

        const tags = await listTagsService.execute()

        return response.json(tags)
    }
}

export { ListTagsController }