import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const PlaylistContext = createContext()

export const PlaylistProvider = ({ children }) => {
	const { accessToken } = useAuth()
	const [playlist, setPlaylist] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null) // For success feedback

	const addToPlaylist = (item) => {
		setPlaylist((prevPlaylist) => {
			const isDuplicate = prevPlaylist.some(
				(playlistItem) => playlistItem.itemId === item.itemId
			)
			if (!isDuplicate) {
				const newPlaylist = [...prevPlaylist, item]
				return newPlaylist
			} else {
				return prevPlaylist
			}
		})
	}

	const removeFromPlaylist = (index) => {
		setPlaylist((prevPlaylist) => {
			const updatedPlaylist = [...prevPlaylist]
			updatedPlaylist.splice(index, 1)
			return updatedPlaylist
		})
	}

	const createPlaylist = async (name) => {
		if (!accessToken) {
			setError('Invalid or missing access token')
			return
		}

		setLoading(true)
		setError(null)
		setSuccess(null)

		try {
			const response = await axios.post(
				'https://api.spotify.com/v1/me/playlists',
				{
					name: name,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			)

			if (response.status === 201) {
				setSuccess('Playlist created successfully!')
			} else {
				throw new Error('Failed to create playlist')
			}

			setPlaylist([])
		} catch (error) {
			console.error('Error creating playlist:', error)
			setError(
				error.response?.data?.error?.message ||
					'Error creating playlist'
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<PlaylistContext.Provider
			value={{
				playlist,
				addToPlaylist,
				removeFromPlaylist,
				createPlaylist,
				loading,
				error,
				success,
			}}
		>
			{children}
		</PlaylistContext.Provider>
	)
}

export const usePlaylist = () => {
	return useContext(PlaylistContext)
}
