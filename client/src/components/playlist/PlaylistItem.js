import React from 'react'
import { useSearch } from '../../context/SearchContext'
import { usePlaylist } from '../../context/PlaylistContext'
import Remove from '../icons/RemoveIcon'
import { Container, ImgAndInfo, Image, Info, Title, Subtitle, SearchButton } from './Styles'

export default function PlaylistItem({ item }) {

  const { img, name, artistName, type, itemId, artistId } = item

  const { searchById } = useSearch()
  const { removeFromPlaylist } = usePlaylist()

  const handleSearchById = (id, type) => {
    searchById(id, type)
  }

  const handleRemove = () => {
    removeFromPlaylist(itemId);
  };
  
  return (
    <Container id={type}>
      <ImgAndInfo>
        <Image src={img} alt={name}/>
        <Info>
          <Title onClick={() => handleSearchById(itemId, type)}>{name}</Title>
          <Subtitle>
            {type}
            {type === 'track' || type === 'album' ? (
              <> {' • '} 
                <SearchButton onClick={() => handleSearchById(artistId, type)}>
                  <span>{artistName}</span>
                </SearchButton>
              </>
            ) : null}
          </Subtitle>
        </Info>
      </ImgAndInfo>
      <Remove onClick={handleRemove}/>
    </Container>
  )
}