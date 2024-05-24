import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'
import { SearchProvider } from './context/SearchContext'
import { PlaylistProvider } from './context/PlaylistContext'
import { PlayerProvider } from './context/PlayerContext'
import './styles/GlobalStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
			<SearchProvider>
				<PlaylistProvider>
					<PlayerProvider>
						<App />
					</PlayerProvider>
				</PlaylistProvider>
			</SearchProvider>
		</AuthProvider>
  </React.StrictMode>
);