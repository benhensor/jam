import React, {
	createContext,
	useState,
	useEffect,
	useCallback,
	useContext,
} from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [accessToken, setAccessToken] = useState(
		localStorage.getItem('access_token')
	)
	const [refreshToken, setRefreshToken] = useState(
		localStorage.getItem('refresh_token')
	)
	const [userData, setUserData] = useState(null)

	const loginUrl = `${process.env.REACT_APP_BACKEND_URL}/login`
	const logoutUrl = `${process.env.REACT_APP_BACKEND_URL}/logout`

	const refreshAccessToken = useCallback(async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BACKEND_URL}/refresh_token`,
				{
					params: {
						refresh_token: refreshToken,
					},
					withCredentials: true,
				}
			)
			const newAccessToken = response.data.access_token
			localStorage.setItem('access_token', newAccessToken)
			setAccessToken(newAccessToken)
		} catch (error) {
			console.error('Error refreshing access token:', error)
		}
	}, [refreshToken])

	const login = () => {
		window.location.href = loginUrl
	}

	const handleCallback = () => {
		const params = new URLSearchParams(window.location.search)
		const accessToken = params.get('access_token')
		const refreshToken = params.get('refresh_token')

		if (accessToken && refreshToken) {
			localStorage.setItem('access_token', accessToken)
			localStorage.setItem('refresh_token', refreshToken)
			setAccessToken(accessToken)
			setRefreshToken(refreshToken)

			// Clear the query parameters from the URL
			window.history.replaceState(
				{},
				document.title,
				window.location.pathname
			)
		}
	}

	const logout = useCallback(async () => {
		try {
			await axios.get(logoutUrl, {
				withCredentials: true,
			})
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			setAccessToken(null)
			setRefreshToken(null)
			setUserData(null)
			window.location.reload()
		} catch (error) {
			console.error('Error logging out:', error)
		}
	}, [logoutUrl])

	const fetchUserData = useCallback(async () => {
		if (!accessToken) return

		try {
			const response = await axios.get('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setUserData(response.data)
		} catch (error) {
			if (error.response && error.response.status === 401) {
				// Token is expired or invalid, try to refresh it
				const newAccessToken = await refreshAccessToken()
				if (newAccessToken) {
					try {
						const response = await axios.get(
							'https://api.spotify.com/v1/me',
							{
								headers: {
									Authorization: `Bearer ${newAccessToken}`,
								},
							}
						)
						setUserData(response.data)
					} catch (innerError) {
						console.error(
							'Error fetching user data after token refresh:',
							innerError
						)
					}
				}
			} else {
				console.error('Error fetching user data:', error)
			}
		}
	}, [accessToken, refreshAccessToken])

	useEffect(() => {
		handleCallback()
		fetchUserData()
	}, [accessToken, fetchUserData])

	return (
		<AuthContext.Provider
			value={{
				accessToken,
				refreshAccessToken,
				userData,
				setAccessToken,
				setRefreshToken,
				login,
				logout,
				handleCallback,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}
