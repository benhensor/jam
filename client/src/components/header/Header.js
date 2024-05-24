import React from 'react'
import UserControls from './UserControls'
import { Container, Highlight, StyledHeader, Title } from './Styles'

export default function Header() {

	return (
		<StyledHeader>
			<Container>
				<Title>
					Ja<Highlight>m</Highlight>
				</Title>
				<UserControls />
			</Container>
		</StyledHeader>
	)
}