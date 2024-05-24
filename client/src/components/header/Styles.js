import styled from 'styled-components'

const StyledHeader = styled.header`
	position: fixed;
	top: 0;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-dark);
	height: 12rem;
	z-index: 100;
	border-bottom: 1px solid var(--color-primary);
	@media screen and (max-width: 1199px) {
		height: 10rem;
	}
	@media screen and (max-width: 768px) {
		height: 8rem;
	}
	@media screen and (max-width: 450px) {
		height: 7rem;
	}
`

const Container = styled.div`
	width: 100%;
	max-width: 120rem;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	@media screen and (max-width: 1199px) {
		margin: var(--tablet);
	}
	@media screen and (max-width: 768px) {
		justify-content: space-between;
		gap: 1rem;
	}
	@media screen and (max-width: 450px) {
		margin: var(--mobile);
	}
`

const Title = styled.h1`
	font-size: clamp(var(--font-size-xl), 5vw, var(--font-size-xxxl));
	line-height: 1.6rem;
	color: var(--color-light);
`

const Highlight = styled.span`
	color: var(--color-primary);
	line-height: 1rem;
`

const StyledUserControls = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    position: static;
    transform: none;
  }
`

const Button = styled.button`
	background-color: var(--color-primary);
  border: none;
	color: white;
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
  font-size: var(--font-size-sm);
	text-decoration: none;
	cursor: pointer;
	transition: 0.12s;
	&:hover {
		background-color: var(--color-tertiary);
    color: var(--color-dark);
	}
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-xs);
  }
  @media screen and (max-width: 450px) {
    font-size: var(--font-size-xxs);
  }
`

const WelcomeText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
	color: var(--color-light);
  font-size: clamp(var(--font-size-xxs), 2vw, var(--font-size-sm));
`

export { StyledHeader, Container, Title, Highlight, StyledUserControls, Button, WelcomeText }