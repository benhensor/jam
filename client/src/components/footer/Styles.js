import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: var(--color-dark);
  color: var(--color-dark-gray);
  text-align: center;
  padding: 2rem 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: clamp(var(--font-size-xxs), 1.5vw, var(--font-size-sm));
  z-index: 100;
  @media screen and (max-width: 768px) {
    padding: 1rem 0;
  }
  @media screen and (max-width: 450px) {
    padding: 1rem 0;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Text = styled.p`
  color: var(--color-dark-gray);
`

const Link = styled.a`
  color: var(--color-dark-gray);
  text-decoration: none;
  transition: .12s ease-in-out;
  &:hover {
    color: var(--color-primary);
  }
`

export { StyledFooter, Container, Text, Link }