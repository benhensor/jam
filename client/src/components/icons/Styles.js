import styled from 'styled-components'

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
  background: none;
  border: none;
  background-color: none;
  color: var(--color-white);
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: 0.12s;
  text-shadow: 0 0 0.2rem #000000;
  &:hover {
    color: var(--color-primary);
  }
	@media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`

const PlayerButton = styled.button`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
  background: none;
  border: none;
  background-color: none;
  color: var(--color-white);
	width: 3rem;
	height: 3rem;
  cursor: pointer;
  transition: 0.12s;
  text-shadow: 0 0 0.2rem #000000;
  &:hover {
    color: var(--color-primary);
  }
	@media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`

const RemoveButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
  min-width: 3rem;
  min-height: 3rem;
	color: var(--color-white);
	font-size: var(--font-size-sm);
  border-radius: 50%;
	margin-left: 1rem;
	&:hover {
		color: var(--color-error);
	}
`

const ShowPlaylistIcon = styled.button`
	background: none;
	background-color: none;
	color: var(--color-primary);
	width: 4rem;
	height: 4rem;
	border: 3px solid var(--color-primary);
	border-radius: 50%;
	cursor: pointer;
	transition: 0.12s;
	text-shadow: 0 0 0.2rem #000000;
	&:hover {
		color: var(--color-tertiary);
		border: 3px solid var(--color-tertiary);
	}
`

const SearchIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 3rem;
	height: 3rem;
	@media screen and (max-width: 768px) {
    width: 2rem;
    height: 2rem;
  }
`

const Icon = styled.svg`
  color: var(--color-primary);
	width: 24px;
	height: 24px;
`

export { Button, PlayerButton, RemoveButton, ShowPlaylistIcon, SearchIcon, Icon }