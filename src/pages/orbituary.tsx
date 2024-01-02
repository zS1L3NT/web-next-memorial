import { readdir } from "fs/promises"
import { GetServerSideProps } from "next"

import Images from "./components/Images"

type Props = {
	list: string[]
	order: number[]
}

export default function Index({ list, order }: Props) {
	return (
		<Images
			duration={5 * 60 * 1000}
			list={list}
			order={order}
		/>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const list = (await readdir("/Users/mac/Documents/For Mom/Orbituary/"))
		.filter(f => !f.endsWith(".DS_Store"))
		.map(f => "Orbituary/" + f)
	return {
		props: {
			list,
			order: Array(list.length)
				.fill(0)
				.map((_, i) => i),
		},
	}
}
