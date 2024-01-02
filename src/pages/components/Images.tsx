/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"

type Props = {
	duration: number
	list: string[]
	order: number[]
}

const log = (message: string) => {
	message = `[${new Date().toLocaleTimeString("en-SG")}] ${message}`

	console.log(message)
	fetch("/api/log", {
		method: "POST",
		body: message,
	})
}

export default function Images({ duration, list, order }: Props) {
	const [timeout, setTimeout] = useState<NodeJS.Timeout | null>(null)
	const [index, setIndex] = useState(0)

	const toggle = () => {
		if (timeout) {
			log("PAUSE")
			clearInterval(timeout)
			setTimeout(null)
		} else {
			log("RESUME")
			setTimeout(setInterval(next, duration))
		}
	}

	const prev = () => {
		log("PREV")
		setIndex(i => (i === 0 ? list.length - 1 : i - 1))
	}

	const next = () => {
		log("NEXT")
		setIndex(i => (i + 1) % list.length)
	}

	useEffect(() => {
		log(`START: ${list.length} images, ${duration}ms duration`)
		toggle()
	}, [])

	useEffect(() => {
		log(`INDEX: ${index}, IN-ORDER: ${order[index]}, NAME: ${list[order[index]]}`)
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
