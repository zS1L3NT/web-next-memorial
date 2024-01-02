/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
	duration: number
	list: string[]
	order: number[]
}

export default function Images({ duration, list, order }: Props) {
	const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null)
	const [indexes, setIndexes] = useState<[number, number]>([0, 1])

	const toggle = () => {
		if (timeout) {
			console.log("pausing")
			clearInterval(timeout)
			setTimeout(null)
		} else {
			console.log("resuming")
			setTimeout(setInterval(next, duration))
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
		console.log(indexes[1], order[indexes[1]])
	}, [order, indexes])

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
