/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
	duration: number
	list: string[]
	order: number[]
}

export default function Images({ duration, list, order }: Props) {
	const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null)
	const [index, setIndex] = useState(0)

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
		setIndex(i => (i === 0 ? list.length - 1 : i - 1))
	}

	const next = () => {
		console.log("next")
		setIndex(i => (i + 1) % list.length)
	}

	useEffect(toggle, [])

	useEffect(() => {
		console.log(index, order[index])
	}, [order, index])

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
		<AnimatePresence>
			<motion.img
				key={index}
				src={"/api/image?name=" + encodeURIComponent(list[order[index]])}
				transition={{ duration: 2 }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
			/>
		</AnimatePresence>
	)
}
