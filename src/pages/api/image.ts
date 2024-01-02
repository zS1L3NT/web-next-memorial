import { readFile } from "fs/promises"
import { NextApiRequest, NextApiResponse } from "next"
import { resolve } from "path"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Content-Type", "image/jpeg")
	res.send(await readFile(resolve("/Users/mac/Documents/For Mom/", req.query.name as string)))
}
