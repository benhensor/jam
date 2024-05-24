import React, { useState, useEffect } from 'react'
import { useSearch } from '../../context/SearchContext'
import { usePlaylist } from '../../context/PlaylistContext'
import Player from '../player/Player'
import PlayerSliderWrapper from '../player/PlayerSliderWrapper'
import PlayIcon from '../icons/PlayIcon'
import PauseIcon from '../icons/PauseIcon'
import AddIcon from '../icons/AddIcon'
import { Container, ImgAndInfo, ImageContainer, PlayPause,  Image, Info, Title, Subtitle, Button } from './Styles'

export default function Listitem({ item, isActive, onTrackClick, isPlaying, onPlayPauseClick }) {

  const { searchById } = useSearch()
  const { addToPlaylist } = usePlaylist()

  const [ITEM, setITEM] = useState({})
  const [isArtist, setIsArtist] = useState(false)
  const [isTrackImageHovered, setIsTrackImageHovered] = useState(false)

  const tabletAndMobile = window.matchMedia('(max-width: 768px)').matches

  useEffect(() => {
    const formatListitem = (item) => {
      const itemData = item.data
      switch (itemData.type) {
        case 'artist': {
          const img = itemData.images[0]?.url
          const artistName = itemData.name
          const type = itemData.type
          const itemId = itemData.id
          return { img: img, name: artistName, type: type, itemId: itemId }
        }
        case 'album': {
          const img = itemData.images[0]?.url
          const albumName = itemData.name
          const artistName = itemData.artists[0]?.name
          const type = itemData.type
          const itemId = itemData.id
          const artistId = itemData.artists[0]?.id
          return { img: img, name: albumName, artistName: artistName, type: type, itemId: itemId, artistId: artistId }
        }
        case 'track': {
          const img = itemData.album.images[0]?.url
          const trackName = itemData.name
          const artistName = itemData.artists[0]?.name
          const type = itemData.type
          const itemId = itemData.id
          const artistId = itemData.artists[0]?.id
          const trackUri = itemData.uri
          return { img: img, name: trackName, artistName: artistName, type: type, itemId: itemId, artistId: artistId, trackUri: trackUri} 
        }
        default:
          return {}
      }
    }

    const formatted = formatListitem(item)
    setITEM(formatted)
    setIsArtist(formatted.type === 'artist')
  }, [item])

  const handleSearchById = (id, type) => {
    searchById(id, type)
  }

  const handleAddToPlaylist = () => {
    addToPlaylist(ITEM)
  }

  const handlePlayPauseClick = (e) => {
    e.stopPropagation();
    onTrackClick(ITEM.itemId);
    onPlayPauseClick(ITEM.trackUri);
  };

  return (
    <>
      <Container id={ITEM.type}>
        <ImgAndInfo>
          <ImageContainer 
            onMouseEnter={() => setIsTrackImageHovered(true)}
            onMouseLeave={() => setIsTrackImageHovered(false)}
          >
            {ITEM.type === 'track' && isTrackImageHovered ? (
              <PlayPause>
              {isPlaying ? (
                  <PauseIcon onClick={handlePlayPauseClick} />
                ) : (
                  <PlayIcon onClick={handlePlayPauseClick} />
                )}
              </PlayPause>
            ) : null}
            <Image src={ITEM.img} alt={ITEM.name} $isArtist={isArtist} onClick={tabletAndMobile ? handlePlayPauseClick : null}/>
          </ImageContainer>
          <Info>
            <Title onClick={() => handleSearchById(ITEM.itemId, ITEM.type)}>{ITEM.name}</Title>
            <Subtitle>
              {!isArtist ? (
                <>{ITEM.type} {' • '}
                  <Button onClick={() => handleSearchById(ITEM.artistId, 'artist')}>
                    <span>{ITEM.artistName}</span>
                  </Button>
                </>
              ) : null}
            </Subtitle>
          </Info>
        </ImgAndInfo>
        {!isArtist && (<AddIcon onClick={handleAddToPlaylist} />)}
      </Container>
      {ITEM.type === 'track' &&
        <PlayerSliderWrapper isVisible={isActive}>
          <Player />
        </PlayerSliderWrapper>
      }
    </>
  )
}