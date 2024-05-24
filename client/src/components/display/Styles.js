import styled from 'styled-components';

/* DISPLAY STYLES */

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	margin: 2rem 0;
	overflow: hidden;
	@media screen and (max-width: 1199px) {
		margin: 2rem 0;
	}
	@media screen and (max-width: 768px) {
		margin: 1rem 0;
		height: 100%;
	}
	@media screen and (max-width: 450px) {
		margin: 0;
	}
`

const StyledDisplay = styled.div`
	width: 100%;
	height: ${props => (props.$activeSearch ? 'calc(100% - 30rem)' : '100%')};
	max-width: 120rem;
	backdrop-filter: blur(7px);
	background-color: #00000099;
	border-radius: 1rem;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	@media screen and (max-width: 1199px) {
		height: ${props => (props.$activeSearch ? 'calc(100% - 5rem)' : '100%')};
		margin: 0 1rem;
	}
	@media screen and (max-width: 768px) {
		height: ${props => (props.$activeSearch ? 'calc(100% - 3rem)' : '100%')};
		margin: 0 0.5rem;
		padding: 0 1rem;
	}
	@media screen and (max-width: 450px) {
		margin: 0;
		padding: 0 0.5rem;
		border-radius: 0;
	}
`

const Content = styled.div`
	width: 100%;
	max-width: 120rem;
	display: grid;
	grid-template-columns: ${(props) =>
    props.$showPlaylist ? '1fr 1fr' : '1fr'};
	gap: 2rem;
	overflow: hidden;
	@media screen and (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-auto-flow: dense;
		& > *:nth-child(2) {
			order: -1;
		}
	}
	@media screen and (max-width: 450px) {
		margin: 0 0 1rem 0;
	}
`


/* SEARCH STYLES */

const Header = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1rem 0;
	gap: 1rem;
	margin-bottom: 1rem;
	border-bottom: 1px solid #00aa9050;
	@media screen and (max-width: 799px) {
		flex-direction: column;
		align-items: flex-start;
	}
	@media screen and (max-width: 450px) {
		padding: 1rem 0.5rem;
		border-radius: 0;
	}
`

const StyledSearch = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	input {
		width: 100%;
		border: none;
		border-radius: 5px;
		color: var(--color-light);
		background-color: transparent;
		font-size: clamp(var(--font-size-sm), 3vw, var(--font-size-xl));
		padding: 1rem;
		&:focus {
			outline: none;
		}
	}
`

const IconContainer = styled.div`
	width: 4rem;
	height: 4rem;
	color: var(--color-light);
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 768px) {
		width: 3rem;
		height: 3rem;
	}
	@media screen and (max-width: 450px) {
		width: 2rem;
		height: 2rem;
	}
`

const Controls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	@media screen and (max-width: 768px) {
		align-items: center;
	}
	@media screen and (max-width: 768px) {
		align-items: center;
	}
`

const Filters = styled.nav`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const FilterButton = styled.button`
	background-color: ${(props) =>
		props.$isActive ? 'var(--color-primary)' : '#00aa9025'};
	color: white;
	padding: 0.5rem 2rem;
	border: none;
	border-radius: 0.2rem;
	cursor: pointer;
	transition: 0.12s;
	text-shadow: 0 0 0.2rem #000000;
	&:hover {
		background-color: #00aa90;
	}
`

export { Container, Content, StyledDisplay, Header, StyledSearch, IconContainer, Controls, Filters, FilterButton }