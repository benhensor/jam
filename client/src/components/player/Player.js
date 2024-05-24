import React, { useEffect, useState } from 'react'
import { usePlayer } from '../../context/PlayerContext'
import { PlayerContainer, SliderContainer, Slider, ErrorMessage } from './Styles'

const SpotifyPlayer = () => {
	const { paused, errorMessage, position, duration, seekPosition } =
		usePlayer()
	const [progressBar, setProgressBar] = useState(0)

	useEffect(() => {
		let animationFrame

		const updateProgressBar = () => {
			setProgressBar((position / duration) * 100)
			animationFrame = requestAnimationFrame(updateProgressBar)
		}

		if (!paused) {
			updateProgressBar()
		} else {
			cancelAnimationFrame(animationFrame)
		}

		return () => cancelAnimationFrame(animationFrame)
	}, [paused, position, duration])

	const handleSliderClick = (e) => {
    const sliderContainer = e.currentTarget;
    const rect = sliderContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newPos = Math.floor((duration / rect.width) * x)

    seekPosition(newPos);
  }

	return (
		<PlayerContainer>
			{errorMessage ? (
				<ErrorMessage>{errorMessage}</ErrorMessage>
			) : (
				<SliderContainer onClick={handleSliderClick}>
					<Slider progressBar={progressBar} />
				</SliderContainer>
			)}
		</PlayerContainer>
	)
}

export default SpotifyPlayer