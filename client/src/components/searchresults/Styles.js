import styled from 'styled-components'

/* SEARCH RESULTS STYLES */

const StyledSearchResults = styled.div`
  height: 100%;
  overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`

const ListedResults = styled.ul`
  list-style: none;
`

/* LIST ITEM STYLES */

const Container = styled.div`
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  user-select: none;
  transition: .12s;
  &:hover {
		background-color: #ffffff15;
	}
`

const ImgAndInfo = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`

const ImageContainer = styled.div`
  position: relative;
  width: 6.4rem;
  height: 6.4rem;
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
`

const PlayPause = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background-color: #00000095;
  z-index: 1;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Image = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  border-radius: ${props => props.$isArtist ? '50%' : '0.5rem'};
  flex-shrink: 0;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Title = styled.h3`
  font-size: var(--font-size-md);
  color: var(--color-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-xs);
  }
`

const Subtitle = styled.h4`
  font-size: var(--font-size-xs);
  color: var(--color-light-gray);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  span {
    cursor: pointer;
    color: var(--color-primary);
  }
  @media screen and (max-width: 768px) {
    font-size: var(--font-size-xxs);
    color: var(--color-dark-gray);
  }
`

const Button = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font: inherit;
`

export { StyledSearchResults, ListedResults, Container, ImgAndInfo, ImageContainer, PlayPause, Image, Info, Title, Subtitle, Button }