import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
	useRef,
} from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const PlayerContext = createContext()

export const PlayerProvider = ({ children }) => {
	const { accessToken } = useAuth()
	const [isPremium, setIsPremium] = useState(false)
	const [player, setPlayer] = useState(null)
	const [deviceId, setDeviceId] = useState(null)
	const [paused, setPaused] = useState(true)
	const [track, setTrack] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')
	const [spotifyLoaded, setSpotifyLoaded] = useState(false)
	const [position, setPosition] = useState(0)
	const [duration, setDuration] = useState(0)
	const [isTrackEnded, setIsTrackEnded] = useState(false)
	const fetchStateInterval = useRef(null)

	// Load Spotify Web Playback SDK
	useEffect(() => {
		const script = document.createElement('script')
		script.src = 'https://sdk.scdn.co/spotify-player.js'
		script.async = true
		document.body.appendChild(script)

		return () => {
			document.body.removeChild(script)
		}
	}, [])

	useEffect(() => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			setSpotifyLoaded(true)
		}
	}, [])

	// Check Spotify Premium status
	useEffect(() => {
		const checkPremiumStatus = async () => {
			try {
				const response = await axios.get(
					'https://api.spotify.com/v1/me',
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				if (response.data.product === 'premium') {
					setIsPremium(true)
				} else {
					setErrorMessage(
						'Spotify Premium is required to use the player.'
					)
				}
			} catch (error) {
				setErrorMessage('Failed to verify Spotify account status.')
			}
		}

		if (accessToken) {
			checkPremiumStatus()
		}
	}, [accessToken])

	// Initialize Spotify player
	useEffect(() => {
		if (isPremium && spotifyLoaded && accessToken) {
			const player = new window.Spotify.Player({
				name: 'Your Web Player',
				getOAuthToken: (cb) => {
					cb(accessToken)
				},
				volume: 0.5,
			})

			// Error handling
			player.addListener('initialization_error', ({ message }) => {
				console.error(message)
			})
			player.addListener('authentication_error', ({ message }) => {
				console.error(message)
			})
			player.addListener('account_error', ({ message }) => {
				console.error(message)
			})
			player.addListener('playback_error', ({ message }) => {
				console.error(message)
			})

			// Playback status updates
			player.addListener('player_state_changed', (state) => {
				if (state) {
					setPaused(state.paused)
					setTrack(state.track_window.current_track)
					setPosition(state.position)
					setDuration(state.duration)
					if (
						state.paused &&
						state.position === 0 &&
						state.track_window.next_tracks.length === 0
					) {
						setIsTrackEnded(true)
					}
				}
			})

			// Ready
			player.addListener('ready', ({ device_id }) => {
				setDeviceId(device_id)
			})

			// Not Ready
			player.addListener('not_ready', ({ device_id }) => {
				console.log('Device ID has gone offline', device_id)
			})

			player.connect().then((success) => {
				if (success) {
					console.log('Player connected successfully')
				} else {
					console.error('Failed to connect player')
				}
			})

			setPlayer(player)

			return () => {
				player.disconnect()
			}
		}
	}, [isPremium, spotifyLoaded, accessToken])

	// Fetch device ID with retry logic
	const fetchDeviceId = useCallback(async () => {
		try {
			const response = await axios.get(
				'https://api.spotify.com/v1/me/player/devices',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			const devices = response.data.devices
			// console.log('Devices:', devices);
			if (devices.length > 0) {
				const webPlayer = devices.find(
					(device) => device.name === 'Your Web Player'
				)
				if (webPlayer) {
					setDeviceId(webPlayer.id)
				} else {
					console.error('Web Player not found in devices')
				}
			} else {
				console.error('No devices found')
			}
		} catch (error) {
			console.error('Error fetching devices:', error)
		}
	}, [accessToken])

	useEffect(() => {
		if (player) {
			fetchDeviceId()
		}
	}, [player, fetchDeviceId])

	const startFetchingState = () => {
		if (!fetchStateInterval.current) {
			fetchStateInterval.current = setInterval(() => {
				player.getCurrentState().then((state) => {
					if (state) {
						setPosition(state.position)
						setDuration(state.duration)
					}
				})
			}, 100)
		}
	}

	const stopFetchingState = () => {
		if (fetchStateInterval.current) {
			clearInterval(fetchStateInterval.current)
			fetchStateInterval.current = null
		}
	}

	const playTrack = async (uri) => {
		if (!deviceId) {
			console.error('Device ID is null. Player is not ready.')
			return
		}
		try {
			if (track && track.uri === uri && paused) {
				// Resume the current track
				await axios.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
					{},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				startFetchingState()
			} else {
				// Play a new track
				await axios.put(
					`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
					{
						uris: [uri],
					},
					{
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
				startFetchingState()
			}
		} catch (error) {
			console.error('Error playing track:', error)
		}
	}

	const pauseTrack = async () => {
		if (!deviceId) {
			console.error('Device ID is null. Player is not ready.')
			return
		}
		try {
			const state = await player.getCurrentState()
			setPosition(state.position) // Store the current position
			await axios.put(
				`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			stopFetchingState()
		} catch (error) {
			console.error('Error pausing track:', error)
		}
	}

	const stopTrack = async () => {
		if (!deviceId) {
			console.error('Device ID is null. Player is not ready.')
			return
		}
		try {
			await axios.put(
				`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`,
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)
			setTrack(null)
			setPosition(0)
			setPaused(true)
			stopFetchingState()
		} catch (error) {
			console.error('Error stopping track:', error)
		}
	}

	const seekPosition = async (position_ms) => {
		if (!deviceId) {
			console.error('Device ID is null. Player is not ready.')
			return
		}
		try {
			await axios.put(`https://api.spotify.com/v1/me/player/seek`, null, {
				params: { position_ms, device_id: deviceId },
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setPosition(position_ms)
		} catch (error) {
			console.error('Error seeking track:', error)
		}
	}

	return (
		<PlayerContext.Provider
			value={{
				player,
				track,
				paused,
				errorMessage,
				position,
				duration,
				isTrackEnded,
				playTrack,
				pauseTrack,
				stopTrack,
				seekPosition,
				setIsTrackEnded,
			}}
		>
			{children}
		</PlayerContext.Provider>
	)
}

export const usePlayer = () => {
	return useContext(PlayerContext)
}
