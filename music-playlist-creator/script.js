let playlists = [];

async function loadPlaylists() {
    try {
        const response = await fetch('data/data.json');
        playlists = await response.json();
        renderPlaylistCards(playlists);
    } catch (error) {
        console.error('Error loading playlists:', error);
        displayErrorMessage();
    }
}

function renderPlaylistCards(playlistsArray) {
    const container = document.querySelector('.playlist-cards');

    container.innerHTML = '';

    if (!playlistsArray || playlistsArray.length === 0) {
        container.innerHTML = '<p class="no-playlists">No playlists found</p>';
        return;
    }

    playlistsArray.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        container.appendChild(card);
    });
}

function createPlaylistCard(playlist) {
    const article = document.createElement('article');
    article.className = 'playlist-card';
    article.dataset.playlistId = playlist.id;

    const heartIcon = playlist.isLiked ? '♥' : '♡';
    const likedClass = playlist.isLiked ? 'liked' : '';

    article.innerHTML = `
        <img src="${playlist.coverImage}" alt="${playlist.title} cover" class="playlist-cover">
        <div class="playlist-info">
            <h2 class="playlist-title">${playlist.title}</h2>
            <p class="playlist-creator">${playlist.creator}</p>
            <div class="playlist-footer">
                <button class="like-button ${likedClass}" aria-label="Like playlist">
                    <span class="heart-icon">${heartIcon}</span>
                    <span class="like-count">${playlist.likeCount}</span>
                </button>
            </div>
        </div>
    `;

    article.addEventListener('click', (e) => {
        if (!e.target.closest('.like-button')) {
            openModal(playlist);
        }
    });

    const likeButton = article.querySelector('.like-button');
    likeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleLike(playlist.id);
    });

    return article;
}

function displayErrorMessage() {
    const container = document.querySelector('.playlist-cards');
    container.innerHTML = '<p class="error-message">Failed to load playlists. Please try again later.</p>';
}

function openModal(playlist) {
    console.log('Opening modal for:', playlist.title);
}

function toggleLike(playlistId) {
    console.log('Toggling like for playlist:', playlistId);
}

document.addEventListener('DOMContentLoaded', loadPlaylists);
