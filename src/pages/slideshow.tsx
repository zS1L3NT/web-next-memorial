import { useEffect, useState } from "react"
import { GetServerSideProps } from "next"
import { readdir } from "fs/promises"
import { motion } from "framer-motion"

type Props = {
	list: string[]
	order: number[]
}

export default function Index({ list, order }: Props) {
	const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null)
	const [indexes, setIndexes] = useState<[number, number]>([0, 1])

	const toggle = () => {
		if (timeout) {
			console.log("pausing")
			clearInterval(timeout)
			setTimeout(null)
		} else {
			console.log("resuming")
			setTimeout(setInterval(next, 10000))
		}
	}

	const prev = () => {
		console.log("prev")
		setIndexes(([a, b]) => [
			a === 0 ? list.length - 1 : a - 1,
			b === 0 ? list.length - 1 : b - 1,
		])
	}

	const next = () => {
		console.log("next")
		setIndexes(([a, b]) => [(a + 1) % list.length, (b + 1) % list.length])
	}

	useEffect(toggle, [])

	useEffect(() => {
		console.log(indexes)
	}, [indexes])

	useEffect(() => {
		const onkeydown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") prev()
			if (e.key === "ArrowRight") next()
			if (e.key === " ") toggle()
		}

		document.addEventListener("keydown", onkeydown)
		return () => document.removeEventListener("keydown", onkeydown)
	}, [timeout])

	return (
		<>
			{indexes.map((index, i) => (
				<motion.img
					key={index}
					src={"/api/image?name=" + encodeURIComponent(list[order[index]])}
					transition={{ duration: 2 }}
					initial={{ opacity: 0 }}
					animate={{ opacity: i }}
					exit={{ opacity: 0 }}
				/>
			))}
		</>
	)
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const list = (await readdir("/Users/mac/Documents/For Mom/Slideshow/")).filter(
		f => f !== ".DS_Store",
	)
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
