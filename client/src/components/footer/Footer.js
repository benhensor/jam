import React from 'react'
import { StyledFooter, Container, Text, Link } from './Styles'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <StyledFooter>
      <Container>
        <Text>&copy; {year} <Link href="https://benhensordev.netlify.app/" rel="noreferrer" target="_blank">Ben Hensor</Link></Text>
      </Container>
    </StyledFooter>
  )
}