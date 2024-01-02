import { readFile } from "fs/promises"
import { resolve } from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Content-Type", "image/jpeg")
	res.send(await readFile(resolve("/Users/mac/Documents/For Mom/Slideshow/", req.query.name as string)))
}
