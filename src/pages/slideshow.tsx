import { readdir } from "fs/promises"
import { GetServerSideProps } from "next"

import Images from "./components/Images"

type Props = {
	list: string[]
	order: number[]
}

export default function Slideshow({ list, order }: Props) {
	return (
		<Images
			duration={10 * 1000}
			list={list}
			order={order}
		/>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const list = (await readdir("/Users/mac/Documents/For Mom/Slideshow/"))
		.filter(f => !f.endsWith(".DS_Store"))
		.map(f => "Slideshow/" + f)
	return {
		props: {
			list,
			order: [
				...Array(list.length)
					.fill(0)
					.map((_, i) => i),
			].sort(() => 0.5 - Math.random()),
		},
	}
}
