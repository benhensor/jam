import styled from 'styled-components'

/* Playlist.js */

const StyledPlaylist = styled.div`
  backdrop-filter: blur(5px);
  padding: 1rem 0;
  overflow: hidden;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem 1rem 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

const PlaylistName = styled.h2`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: clamp(var(--font-size-md), 3vw, var(--font-size-xl));
  color: var(--color-light);
  height: 4rem;
  cursor: pointer;
  &:hover {
    color: var(--color-primary);
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const NameInput = styled.input`
  font-size: clamp(var(--font-size-md), 3vw, var(--font-size-xl));
  padding: 0.6rem 0;
  border: none;
  border-radius: 0.2rem;
  background-color: transparent;
  color: var(--color-light);
  height: 4rem;
  &:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
  }
`

const Button = styled.button`
  background-color: #00aa9025;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: .12s;
	text-shadow: 0 0 0.2rem #000000;
  &:hover {
    background-color: var(--color-primary);
  }
`

const List = styled.ul`
  height: 100%;
  list-style: none;
  overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`

/* PlaylistItem.js */

const Container = styled.div`
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

const Image = styled.img`
  width: 6.4rem;
  height: 6.4rem;
  margin-right: 1rem;
  border-radius: 0.5rem;
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    width: 4rem;
    height: 4rem;
  }
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

const SearchButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font: inherit;
`

export { StyledPlaylist, Header, PlaylistName, NameInput, Button, List, Container, ImgAndInfo, Image, Info, Title, Subtitle, SearchButton}