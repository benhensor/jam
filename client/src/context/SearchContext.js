import React, { createContext, useState, useContext } from 'react'
import axios from 'axios'
import { useAuth } from './AuthContext'

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
	const { accessToken } = useAuth()
	const [value, setValue] = useState('What do you want to listen to?')
	const [searchResults, setSearchResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const searchSpotify = async (query) => {
		if (!accessToken) {
			setError('Invalid or missing access token')
			return
		}

		setLoading(true)
		setError(null)

		try {
			const response = await axios.get(
				'https://api.spotify.com/v1/search',
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
					params: {
						q: query,
						type: 'track,artist,album',
					},
				}
			)

			const combinedResults = [
				...response.data.artists.items.map((item) => ({
					type: 'artist',
					data: item,
				})),
				...response.data.albums.items.map((item) => ({
					type: 'album',
					data: item,
				})),
				...response.data.tracks.items.map((item) => ({
					type: 'track',
					data: item,
				})),
			]
			setSearchResults(combinedResults)
		} catch (error) {
			console.error('Error searching Spotify:', error)
			setError('Error searching Spotify')
		} finally {
			setLoading(false)
		}
	}

	const removeDuplicates = (array, key) => {
		const seen = new Set()
		return array.filter((item) => {
			const value = item.data[key]
			if (seen.has(value)) {
				return false
			} else {
				seen.add(value)
				return true
			}
		})
	}

	const searchById = async (id, type) => {
		if (!accessToken) {
			setError('Invalid or missing access token')
			return
		}

		setLoading(true)

		try {
			let result

			if (type === 'artist') {
				result = await axios.get(
					`https://api.spotify.com/v1/artists/${id}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
			} else if (type === 'album') {
				result = await axios.get(
					`https://api.spotify.com/v1/albums/${id}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
			} else if (type === 'track') {
				result = await axios.get(
					`https://api.spotify.com/v1/tracks/${id}`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				)
			}

			await searchSpotify(result.data.name)

			setSearchResults((prevResults) => {
				const combinedResults = [
					{ type, data: result.data },
					...prevResults,
				]
				return removeDuplicates(combinedResults, 'id')
			})
		} catch (error) {
			console.error('Error fetching results by ID:', error)
			setError('Error fetching results by ID')
		} finally {
			setLoading(false)
		}
	}

	const resetSearch = () => {
		setValue('What do you want to listen to?')
		setSearchResults([])
	}

	return (
		<SearchContext.Provider
			value={{
				searchResults,
				value,
				setValue,
				searchSpotify,
				searchById,
				resetSearch,
				loading,
				error,
			}}
		>
			{children}
		</SearchContext.Provider>
	)
}

export const useSearch = () => {
	return useContext(SearchContext)
}
