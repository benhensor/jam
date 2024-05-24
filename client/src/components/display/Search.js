import React from 'react'
import { useSearch } from '../../context/SearchContext'
import { usePlayer } from '../../context/PlayerContext'
import SearchIcon from '../icons/SearchIcon'
import BackIcon from '../icons/BackIcon'
import ShowPlaylistIcon from '../icons/ShowPlaylistIcon'
import { Header, StyledSearch, IconContainer, Controls, Filters, FilterButton } from './Styles'

export default function Search({ setShowPlaylist, activeFilter, setActiveFilter }) {
	const { value, setValue, searchSpotify, searchResults, resetSearch } = useSearch()
	const { stopTrack } = usePlayer()

	const formatSearchTerm = (searchTerm) => {
		return searchTerm
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}

	const handleFilterSelect = (filter) => {
		setActiveFilter(filter === activeFilter ? '' : filter)
	}

	const handleShowPlaylist = () => {
		setShowPlaylist((prev) => !prev)
	}

	const handleSearch = (e) => {
		if (e.key === 'Enter') {
			searchSpotify(e.target.value)
			setValue(formatSearchTerm(e.target.value))
		}
	}

	const handleResetSearch = () => {
		resetSearch()
		setValue('What do you want to listen to?')
		setShowPlaylist(false)
		stopTrack()
		setActiveFilter('')
	}

	const handleFocus = () => {
		if (value === 'What do you want to listen to?') {
			setValue('')
		}
	}

	const handleBlur = () => {
		if (value === '') {
			setValue('What do you want to listen to?')
		}
	}

	return (
		<Header>
			<StyledSearch>
				<IconContainer>
					{searchResults && searchResults.length === 0 ? (
						<SearchIcon />
					) : (
						<BackIcon onClick={handleResetSearch} />
					)}
				</IconContainer>
				<input
					id="search"
					name="search"
					type="text"
					value={value}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onChange={(e) => setValue(e.target.value)}
					onKeyDown={handleSearch}
					autoComplete='off'
				/>
			</StyledSearch>
			<Controls>
				<Filters $activeFilter={activeFilter}>
					<FilterButton
						$isActive={
							activeFilter === 'artists'
						}
						onClick={() =>
							handleFilterSelect(
								'artists'
							)
						}
					>
						artists
					</FilterButton>
					<FilterButton
						$isActive={
							activeFilter === 'songs'
						}
						onClick={() =>
							handleFilterSelect('songs')
						}
					>
						songs
					</FilterButton>
					<FilterButton
						$isActive={
							activeFilter === 'albums'
						}
						onClick={() =>
							handleFilterSelect('albums')
						}
					>
						albums
					</FilterButton>
				</Filters>
				<ShowPlaylistIcon
					onClick={() => handleShowPlaylist()}
				/>
			</Controls>
		</Header>
	)
}