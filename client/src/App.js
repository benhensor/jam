import React, { useEffect, useRef } from 'react'
import { useAuth } from './context/AuthContext'
import Header from './components/header/Header'
import Display from './components/display/Display'
import Footer from './components/footer/Footer'

const App = () => {
	const { userData } = useAuth()
	const displayRef = useRef(null)

	useEffect(() => {}, [userData])

	return (
		<>
			<Header />
			<main>
				<Display ref={displayRef} />
			</main>
			<Footer />
		</>
	)
}

export default App