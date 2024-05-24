import React, { useState, useEffect } from 'react'
import { usePlayer } from '../../context/PlayerContext'
import ListItem from './ListItem'
import { StyledSearchResults, ListedResults } from './Styles'

export default function SearchResults({ results }) {
	const { playTrack, pauseTrack, isTrackEnded, setIsTrackEnded } = usePlayer()

	const [activeTrack, setActiveTrack] = useState(null)
	const [playingTrackUri, setPlayingTrackUri] = useState(null)

	const handleTrackClick = (trackId) => {
		setActiveTrack(trackId)
	}

	const handlePlayPauseClick = (trackUri) => {
		if (playingTrackUri === trackUri) {
			pauseTrack()
			setPlayingTrackUri(null)
      setActiveTrack(null)
		} else {
			playTrack(trackUri)
			setPlayingTrackUri(trackUri)
		}
	}

  useEffect(() => {
    if (isTrackEnded) {
      setPlayingTrackUri(null);
      setActiveTrack(null);
      setIsTrackEnded(false);
    }
  }, [isTrackEnded, setIsTrackEnded])

	return (
		<StyledSearchResults>
			<ListedResults>
				{results.map((item) => (
					<ListItem
						key={item.data.id}
						item={item}
						isActive={activeTrack === item.data.id}
						onTrackClick={handleTrackClick}
						isPlaying={playingTrackUri === item.data.uri}
						onPlayPauseClick={handlePlayPauseClick}
					/>
				))}
			</ListedResults>
		</StyledSearchResults>
	)
}