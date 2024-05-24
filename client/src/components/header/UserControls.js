import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Opening from '../icons/OpeningIcon'
import Closing from '../icons/ClosingIcon'
import { StyledUserControls, Button, WelcomeText } from './Styles'

export default function UserControls() {
	const { accessToken, userData, login, logout } = useAuth()

	return (
		<StyledUserControls>
			{accessToken && userData && (
				<WelcomeText>
					<Opening /> {userData.display_name} <Closing />
				</WelcomeText>
			)}
			{!accessToken ? (
				<Button onClick={login}>Sign in to Spotify</Button>
			) : (
				<Button onClick={logout}>Sign Out</Button>
			)}
		</StyledUserControls>
	)
}
