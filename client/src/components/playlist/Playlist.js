import React, { useState } from 'react'
import { usePlaylist } from '../../context/PlaylistContext'
import PlaylistItem from './PlaylistItem'
import { StyledPlaylist, Header, NameInput, PlaylistName, Button, List } from './Styles'

export default function Playlist({ setShowPlaylist }) {

  const { playlist, createPlaylist, loading, error } = usePlaylist()

  const [playlistName, setPlaylistName] = useState('New Playlist...')
  const [isEditing, setIsEditing] = useState(false)
  const [tempName, setTempName] = useState('')

  const handleCreatePlaylist = () => {
    if (playlistName) {
      createPlaylist(playlistName)
    }
    setPlaylistName('New Playlist...')
    setShowPlaylist(false)
  }

  const startEditing = () => {
    setTempName('')
    setIsEditing(true)
  }

  const stopEditing = () => {
    if (tempName.trim()) {
      setPlaylistName(tempName)
    }
    setIsEditing(false)
  }

  if (error) { return <div>{error}</div> }

  return (
    <StyledPlaylist>
      <Header>
        {isEditing ? (
          <NameInput
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={stopEditing}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                stopEditing()
              }
            }}
            autoFocus
          />
        ) : (
          <PlaylistName onClick={startEditing}>
            {playlistName}
          </PlaylistName>
        )}
        <Button onClick={handleCreatePlaylist} disabled={loading}>
          {loading ? 'Creating...' : 'Create Playlist'}
        </Button>
      </Header>
      <List>
        {playlist.map((item) => (
          <PlaylistItem key={item.itemId} item={item}/>
        ))}
      </List>
    </StyledPlaylist>
  )
}