// ===================================
// MAIN APP - Simplified with Modal-Only
// ===================================

let playlists = [];
let currentModalPlaylist = null;
let currentView = 'home';

// Hard-coded trending music (currently popular albums/playlists)
const trendingMusic = [
    {
        id: "trending-1",
        title: "Short n' Sweet",
        artist: "Sabrina Carpenter",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b2/Sabrina_Carpenter_-_Short_n%27_Sweet.png",
        type: "Album",
        year: "2024",
        tracks: ["Espresso", "Please Please Please", "Taste", "Good Graces", "Bed Chem"],
        description: "Pop perfection with catchy hooks and witty lyrics"
    },
    {
        id: "trending-2",
        title: "Hit Me Hard and Soft",
        artist: "Billie Eilish",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/1/15/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png",
        type: "Album",
        year: "2024",
        tracks: ["Lunch", "Birds of a Feather", "Wildflower", "The Greatest", "L'Amour de Ma Vie"],
        description: "Billie's most mature and emotionally raw album to date"
    },
    {
        id: "trending-3",
        title: "Cowboy Carter",
        artist: "Beyoncé",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/5/5d/Beyonc%C3%A9_-_Cowboy_Carter.png",
        type: "Album",
        year: "2024",
        tracks: ["Texas Hold 'Em", "16 Carriages", "Bodyguard", "Jolene", "II Most Wanted"],
        description: "Beyoncé's bold exploration of country music and Americana"
    },
    {
        id: "trending-4",
        title: "The Tortured Poets Department",
        artist: "Taylor Swift",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/4/4f/Taylor_Swift_-_The_Tortured_Poets_Department.png",
        type: "Album",
        year: "2024",
        tracks: ["Fortnight", "Down Bad", "I Can Do It With a Broken Heart", "Who's Afraid of Little Old Me?"],
        description: "Taylor's introspective deep dive into heartbreak and healing"
    },
    {
        id: "trending-5",
        title: "Chromakopia",
        artist: "Tyler, The Creator",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/d/dc/Tyler%2C_the_Creator_-_Chromakopia.png",
        type: "Album",
        year: "2024",
        tracks: ["St. Chroma", "Rah Tah Tah", "Noid", "Darling, I", "Hey Jane"],
        description: "Tyler's genre-bending masterpiece with lush production"
    },
    {
        id: "trending-6",
        title: "Eternal Sunshine",
        artist: "Ariana Grande",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/9/94/Ariana_Grande_-_Eternal_Sunshine.png",
        type: "Album",
        year: "2024",
        tracks: ["yes, and?", "we can't be friends", "eternal sunshine", "the boy is mine"],
        description: "Ariana's return with sophisticated pop and R&B"
    },
    {
        id: "trending-7",
        title: "One Thing at a Time",
        artist: "Morgan Wallen",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/b/b3/Morgan_Wallen_-_One_Thing_at_a_Time.png",
        type: "Album",
        year: "2023",
        tracks: ["Last Night", "Everything I Love", "Tennessee Fan", "Man Made a Bar"],
        description: "Country hits dominating charts for over a year"
    },
    {
        id: "trending-8",
        title: "SOS",
        artist: "SZA",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/a/ae/SZA_-_SOS.png",
        type: "Album",
        year: "2023",
        tracks: ["Kill Bill", "Snooze", "I Hate U", "Good Days", "Shirt"],
        description: "SZA's genre-defying sophomore album still trending"
    },
    {
        id: "trending-9",
        title: "Scarlet",
        artist: "Doja Cat",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/3/3f/Doja_Cat_-_Scarlet.png",
        type: "Album",
        year: "2023",
        tracks: ["Paint The Town Red", "Demons", "Agora Hills", "Balut"],
        description: "Raw, unfiltered hip-hop from Doja's darker side"
    },
    {
        id: "trending-10",
        title: "For All The Dogs",
        artist: "Drake",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/1/14/Drake_-_For_All_the_Dogs.png",
        type: "Album",
        year: "2023",
        tracks: ["IDGAF", "First Person Shooter", "8AM in Charlotte", "Slime You Out"],
        description: "Drake's latest chart-topping hip-hop collection"
    },
    {
        id: "trending-11",
        title: "The Record",
        artist: "boygenius",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/8/8d/Boygenius_-_The_Record.png",
        type: "Album",
        year: "2023",
        tracks: ["Not Strong Enough", "$20", "Emily I'm Sorry", "True Blue"],
        description: "Indie supergroup's critically acclaimed debut"
    },
    {
        id: "trending-12",
        title: "Midnights",
        artist: "Taylor Swift",
        coverImage: "https://upload.wikimedia.org/wikipedia/en/9/9f/Midnights_-_Taylor_Swift.png",
        type: "Album",
        year: "2022",
        tracks: ["Anti-Hero", "Lavender Haze", "Karma", "Bejeweled", "Midnight Rain"],
        description: "Still trending after breaking streaming records"
    }
];

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    loadPlaylists();
    initializeSidebar();
    initializePlaybar();
    setupNavigation();
});

// ===================================
// DATA LOADING
// ===================================
async function loadPlaylists() {
    try {
        console.log('Loading playlists from data/data.json...');
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('Failed to load playlists');

        playlists = await response.json();
        console.log('Loaded', playlists.length, 'playlists');
        console.log('First playlist:', playlists[0]);

        renderLibrary();
        renderView('home');
    } catch (error) {
        console.error('Error loading playlists:', error);
        alert('Failed to load playlists. Make sure you are using Live Server!');
    }
}

// ===================================
// SIDEBAR - Resizable
// ===================================
function initializeSidebar() {
    const resizeHandle = document.getElementById('sidebar-resize-handle');
    const sidebar = document.getElementById('app-sidebar');
    const appLayout = document.querySelector('.app-layout');

    let isResizing = false;
    let startX = 0;
    let startWidth = 0;

    resizeHandle.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = sidebar.offsetWidth;
        resizeHandle.classList.add('resizing');
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const delta = e.clientX - startX;
        let newWidth = startWidth + delta;

        // Constrain width
        newWidth = Math.max(200, Math.min(500, newWidth));

        appLayout.style.setProperty('--sidebar-width', `${newWidth}px`);
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            resizeHandle.classList.remove('resizing');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';

            // Save width
            const width = sidebar.offsetWidth;
            localStorage.setItem('sidebarWidth', width);
        }
    });

    // Restore saved width
    const savedWidth = localStorage.getItem('sidebarWidth');
    if (savedWidth) {
        appLayout.style.setProperty('--sidebar-width', `${savedWidth}px`);
    }
}

function renderLibrary() {
    const container = document.getElementById('library-playlists');
    container.innerHTML = playlists.map(playlist => `
        <div class="library-playlist-item" data-playlist-id="${playlist.id}">
            <img src="${playlist.coverImage}" alt="${playlist.title}" class="library-playlist-cover" onerror="this.src='assets/img/playlist.png'">
            <div class="library-playlist-info">
                <p class="library-playlist-title">${playlist.title}</p>
                <p class="library-playlist-creator">${playlist.creator}</p>
            </div>
        </div>
    `).join('');

    // Add click listeners to library items
    container.querySelectorAll('.library-playlist-item').forEach(item => {
        item.addEventListener('click', () => {
            const playlistId = item.dataset.playlistId;
            const playlist = playlists.find(p => p.id === playlistId);
            if (playlist) openModal(playlist);
        });
    });
}

// ===================================
// NAVIGATION
// ===================================
function setupNavigation() {
    document.querySelectorAll('.sidebar-link[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.dataset.view;
            renderView(view);

            // Update active state
            document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('main-search-input');
    const searchButton = document.getElementById('search-button');
    const clearButton = document.getElementById('clear-button');

    // Search on button click
    searchButton?.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            renderView('search');
            performSearch(query);
        }
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                renderView('search');
                performSearch(query);
            }
        }
    });

    // Clear search button
    clearButton?.addEventListener('click', () => {
        searchInput.value = '';  // Clear the input field
        renderView('home');      // Go back to home view with all playlists
    });

    // Real-time search as you type (keep existing behavior)
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (currentView === 'search') {
                performSearch(e.target.value);
            }
        }, 300);
    });
}

// ===================================
// VIEW RENDERING
// ===================================
function renderView(viewName) {
    currentView = viewName;
    const content = document.getElementById('main-content');

    switch(viewName) {
        case 'home':
            renderHomeView(content);
            break;
        case 'browse':
            renderBrowseView(content);
            break;
        case 'search':
            renderSearchView(content);
            break;
        case 'featured':
            renderFeaturedView(content);
            break;
    }
}

function renderHomeView(container) {
    const featured = playlists;

    container.innerHTML = `
        <section class="welcome-section">
            <h2 class="section-title-large">Welcome back</h2>
            <p class="section-subtitle">Here's what's playing today</p>
        </section>

        <section class="content-section">
            <div class="section-header">
                <h3 class="section-title">Featured Playlists</h3>
            </div>
            <div class="playlist-grid">
                ${featured.map(p => createPlaylistCard(p)).join('')}
            </div>
        </section>
    `;

    attachCardListeners();
}

function renderBrowseView(container) {
    container.innerHTML = `
        <section class="browse-section">
            <h2 class="section-title-large">All Playlists</h2>
            <p class="section-subtitle">Browse your entire collection</p>

            <div class="sort-container" style="margin: 24px 0;">
                <label for="sort-select-view" class="sort-label">Sort by:</label>
                <select id="sort-select-view" class="sort-select">
                    <option value="default">Default</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="likes-desc">Most Liked</option>
                    <option value="likes-asc">Least Liked</option>
                </select>
            </div>

            <div class="playlist-grid" id="browse-grid">
                ${playlists.map(p => createPlaylistCard(p)).join('')}
            </div>
        </section>
    `;

    attachCardListeners();

    // Sort functionality
    document.getElementById('sort-select-view')?.addEventListener('change', (e) => {
        const sorted = sortPlaylists([...playlists], e.target.value);
        document.getElementById('browse-grid').innerHTML = sorted.map(p => createPlaylistCard(p)).join('');
        attachCardListeners();
    });
}

function renderSearchView(container) {
    container.innerHTML = `
        <section class="search-section">
            <h2 class="section-title-large">Search</h2>
            <p class="section-subtitle">Find your favorite playlists and songs</p>

            <div class="playlist-grid" id="search-results">
                ${playlists.map(p => createPlaylistCard(p)).join('')}
            </div>
        </section>
    `;

    attachCardListeners();
}

function renderFeaturedView(container) {
    // Select random playlist from user's library
    const randomIndex = Math.floor(Math.random() * playlists.length);
    const featuredPlaylist = playlists[randomIndex];

    container.innerHTML = `
        <section class="featured-section">
            <div class="featured-container">
                <!-- Left side: Featured playlist hero (40%) -->
                <div class="featured-hero">
                    <img src="${featuredPlaylist.coverImage}" alt="${featuredPlaylist.title}" class="featured-cover" onerror="this.src='assets/img/playlist.png'">
                    <div class="featured-info">
                        <p class="featured-type">Featured Playlist</p>
                        <h2 class="featured-title">${featuredPlaylist.title}</h2>
                        <p class="featured-creator">by ${featuredPlaylist.creator}</p>
                        <button class="featured-like-button ${featuredPlaylist.liked ? 'liked' : ''}" data-playlist-id="${featuredPlaylist.id}">
                            <span class="heart-icon">${featuredPlaylist.liked ? '♥' : '♡'}</span>
                            <span class="like-count">${featuredPlaylist.likeCount}</span>
                        </button>
                    </div>
                </div>

                <!-- Right side: Song list (60%) -->
                <div class="featured-songs-container">
                    <h3 class="featured-songs-header">Featured Songs</h3>
                    <ul class="featured-song-list">
                        ${featuredPlaylist.songs.map((song, index) => `
                            <li class="song-item">
                                <span class="song-number">${index + 1}</span>
                                <button class="song-play-button" data-song-index="${index}">▶</button>
                                <img src="${song.coverImage}" alt="${song.title}" class="song-cover">
                                <div class="song-info">
                                    <p class="song-title">${song.title}</p>
                                    <p class="song-artist">${song.artist}</p>
                                    <p class="song-album">${song.album}</p>
                                </div>
                                <span class="song-duration">${song.duration}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        </section>
    `;

    // Add like button listener
    const likeBtn = container.querySelector('.featured-like-button');
    likeBtn?.addEventListener('click', () => {
        toggleLike(featuredPlaylist.id);
        renderFeaturedView(container);
    });

    // Add play button listeners
    container.querySelectorAll('.song-play-button').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const song = featuredPlaylist.songs[index];
            if (window.MusicPlayer) {
                window.MusicPlayer.playSong(song, featuredPlaylist);
            }
        });
    });
}

function performSearch(query) {
    const results = searchPlaylists(query);
    const resultsContainer = document.getElementById('search-results');

    if (!resultsContainer) return;

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-illustration">🔍</div>
                <h3 class="empty-title">No matches found</h3>
                <p class="empty-message">Try different keywords</p>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = results.map(p => createPlaylistCard(p)).join('');
        attachCardListeners();
    }
}

// ===================================
// CARD CREATION
// ===================================
function createPlaylistCard(playlist) {
    return `
        <article class="playlist-card" data-playlist-id="${playlist.id}">
            <div class="playlist-cover-wrapper">
                <img src="${playlist.coverImage}" alt="${playlist.title}" class="playlist-cover" onerror="this.src='assets/img/playlist.png'">
            </div>
            <h3 class="playlist-title">${playlist.title}</h3>
            <p class="playlist-creator">${playlist.creator}</p>
            <div class="playlist-actions">
                <button class="like-button ${playlist.liked ? 'liked' : ''}" data-playlist-id="${playlist.id}">
                    <span class="heart-icon">${playlist.liked ? '♥' : '♡'}</span>
                    <span class="like-count">${playlist.likeCount}</span>
                </button>
            </div>
        </article>
    `;
}

function createTrendingCard(album) {
    return `
        <article class="trending-card" data-trending-id="${album.id}">
            <div class="trending-cover-wrapper">
                <img src="${album.coverImage}" alt="${album.title}" class="trending-cover">
                <div class="trending-overlay">
                    <span class="trending-badge">${album.type} · ${album.year}</span>
                </div>
            </div>
            <div class="trending-info">
                <h4 class="trending-title">${album.title}</h4>
                <p class="trending-artist">${album.artist}</p>
                <p class="trending-description">${album.description}</p>
            </div>
        </article>
    `;
}

function attachTrendingListeners() {
    document.querySelectorAll('.trending-card').forEach(card => {
        card.addEventListener('click', () => {
            const trendingId = card.dataset.trendingId;
            const album = trendingMusic.find(a => a.id === trendingId);
            if (album) {
                openTrendingModal(album);
            }
        });
    });
}

function openTrendingModal(album) {
    const modal = document.getElementById('playlist-modal');
    if (!modal) return;

    // Populate modal with album info
    modal.querySelector('.modal-playlist-cover').src = album.coverImage;
    modal.querySelector('.modal-playlist-title').textContent = album.title;
    modal.querySelector('.modal-playlist-creator').textContent = album.artist;

    // Create song list from track names (no durations available for trending)
    const songList = modal.querySelector('.song-list');
    songList.innerHTML = album.tracks.map((track, index) => `
        <li class="song-item">
            <span class="song-number">${index + 1}</span>
            <img src="${album.coverImage}" alt="${track}" class="song-cover">
            <div class="song-info">
                <p class="song-title">${track}</p>
                <p class="song-artist">${album.artist}</p>
                <p class="song-album">${album.title}</p>
            </div>
            <span class="song-duration">--:--</span>
        </li>
    `).join('');

    // Show modal
    modal.classList.remove('hidden');

    // Setup close handlers (reuse existing modal close functionality)
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = () => {
        modal.classList.add('hidden');
    };

    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    };
}

function attachCardListeners() {
    const cards = document.querySelectorAll('.playlist-card');
    console.log('Attaching listeners to', cards.length, 'cards');

    // Playlist card clicks -> Open modal
    cards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            console.log('Card clicked!', index);
            // Don't open modal if clicking on the like button or playlist actions area
            if (!e.target.closest('.like-button') && !e.target.closest('.playlist-actions')) {
                const playlistId = card.getAttribute('data-playlist-id');
                console.log('Playlist ID:', playlistId);
                const playlist = playlists.find(p => p.id === playlistId);
                console.log('Found playlist:', playlist ? playlist.title : 'NOT FOUND');

                if (playlist) {
                    console.log('Opening modal for:', playlist.title);
                    openModal(playlist);
                } else {
                    console.error('Playlist not found for ID:', playlistId);
                    console.log('Available IDs:', playlists.map(p => p.id));
                }
            }
        });
    });

    // Like button clicks - attach to ALL like buttons with event delegation
    document.querySelectorAll('.like-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Like button clicked!');
            const playlistId = btn.getAttribute('data-playlist-id');
            console.log('Toggling like for:', playlistId);
            toggleLike(playlistId);
        });
    });
}

// ===================================
// MODAL
// ===================================
function openModal(playlist) {
    console.log('openModal called with:', playlist.title);
    currentModalPlaylist = playlist;
    const modal = document.getElementById('playlist-modal');

    if (!modal) {
        console.error('Modal element not found!');
        return;
    }

    console.log('Modal element found, populating...');

    // Populate modal
    modal.querySelector('.modal-playlist-cover').src = playlist.coverImage;
    modal.querySelector('.modal-playlist-title').textContent = playlist.title;
    modal.querySelector('.modal-playlist-creator').textContent = playlist.creator;

    // Populate songs
    const songList = modal.querySelector('.song-list');
    songList.innerHTML = playlist.songs.map(song => createSongItem(song, playlist)).join('');

    // Add song play button listeners
    songList.querySelectorAll('.song-play-button').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const song = playlist.songs[index];
            if (window.MusicPlayer) {
                const isPlaying = btn.classList.contains('playing');
                if (isPlaying) {
                    window.MusicPlayer.pause();
                } else {
                    window.MusicPlayer.playSong(song, playlist);
                }
                openModal(playlist); // Refresh to update play states
            }
        });
    });

    // Show modal
    console.log('Removing hidden class from modal...');
    modal.classList.remove('hidden');
    console.log('Modal should now be visible. Modal classes:', modal.className);

    // Setup modal controls
    setupModalControls(playlist);
}

function createSongItem(song, playlist) {
    const isPlaying = window.MusicPlayer?.currentSong?.title === song.title && window.MusicPlayer.isPlaying;

    return `
        <li class="song-item">
            <button class="song-play-button ${isPlaying ? 'playing' : ''}">
                ${isPlaying ? '⏸' : '▶'}
            </button>
            <img src="${song.coverImage}" alt="${song.title}" class="song-cover">
            <div class="song-info">
                <p class="song-title">${song.title}</p>
                <p class="song-artist">${song.artist}</p>
                <p class="song-album">${song.album}</p>
            </div>
            <span class="song-duration">${song.duration}</span>
        </li>
    `;
}

function setupModalControls(playlist) {
    const modal = document.getElementById('playlist-modal');

    // Close button
    modal.querySelector('.close-button').onclick = () => {
        modal.classList.add('hidden');
        modal.querySelector('.ai-description-container').classList.add('hidden');
    };

    // Click outside
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.querySelector('.ai-description-container').classList.add('hidden');
        }
    };

    // Shuffle
    modal.querySelector('.shuffle-button').onclick = () => {
        const shuffled = shuffleSongs([...playlist.songs]);
        playlist.songs = shuffled;
        openModal(playlist);
    };

    // AI Description
    modal.querySelector('.ai-description-button').onclick = async () => {
        const container = modal.querySelector('.ai-description-container');
        const text = modal.querySelector('.ai-description-text');

        text.textContent = 'Generating description...';
        container.classList.remove('hidden');

        const description = await getAIDescription(playlist);
        text.textContent = description;
    };
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function toggleLike(playlistId) {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return;

    // Toggle like state with animation
    playlist.liked = !playlist.liked;
    playlist.likeCount += playlist.liked ? 1 : -1;

    // Find the button that was clicked and update it immediately for visual feedback
    const likeButtons = document.querySelectorAll(`[data-playlist-id="${playlistId}"]`);
    likeButtons.forEach(btn => {
        const heartIcon = btn.querySelector('.heart-icon');
        const likeCount = btn.querySelector('.like-count');

        if (playlist.liked) {
            btn.classList.add('liked');
            if (heartIcon) heartIcon.textContent = '♥';
        } else {
            btn.classList.remove('liked');
            if (heartIcon) heartIcon.textContent = '♡';
        }

        if (likeCount) likeCount.textContent = playlist.likeCount;
    });

    // Re-render views to persist changes
    renderView(currentView);
    renderLibrary();
}

function shuffleSongs(songs) {
    const shuffled = [...songs];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function searchPlaylists(query) {
    if (!query.trim()) return playlists;

    const term = query.toLowerCase();
    return playlists.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.creator.toLowerCase().includes(term) ||
        p.songs.some(s => s.title.toLowerCase().includes(term) || s.artist.toLowerCase().includes(term))
    );
}

function sortPlaylists(arr, type) {
    const sorted = [...arr];
    switch(type) {
        case 'name-asc': return sorted.sort((a, b) => a.title.localeCompare(b.title));
        case 'name-desc': return sorted.sort((a, b) => b.title.localeCompare(a.title));
        case 'likes-desc': return sorted.sort((a, b) => b.likeCount - a.likeCount);
        case 'likes-asc': return sorted.sort((a, b) => a.likeCount - b.likeCount);
        default: return sorted;
    }
}

async function getAIDescription(playlist) {
    const API_KEY = "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";
    const songList = playlist.songs.map(s => `"${s.title}" by ${s.artist}`).join(', ');

    try {
        console.log('Requesting AI description with openrouter/auto (free)');

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openrouter/auto:free",
                messages: [
                    { role: "system", content: "You are a music curator. Write 2-3 sentences." },
                    { role: "user", content: `Describe "${playlist.title}" with: ${songList}` }
                ]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ AI description generated successfully');
            return data.choices[0].message.content;
        } else {
            console.log(`❌ API failed with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error getting AI description:', error);
    }

    // Fallback message
    return `A curated collection of ${playlist.songs.length} tracks. Perfect for any mood.`;
}

// ===================================
// PLAYBAR
// ===================================
function initializePlaybar() {
    const playPauseBtn = document.getElementById('play-pause-btn');

    playPauseBtn.addEventListener('click', () => {
        if (window.MusicPlayer?.isPlaying) {
            window.MusicPlayer.pause();
            playPauseBtn.querySelector('.control-icon').textContent = '▶';
        } else if (window.MusicPlayer?.currentSong) {
            window.MusicPlayer.resume();
            playPauseBtn.querySelector('.control-icon').textContent = '⏸';
        }
    });

    // Listen for music player updates
    window.addEventListener('musicPlayerUpdate', updatePlaybar);
    window.addEventListener('storage', (e) => {
        if (e.key === 'musicPlayerState') updatePlaybar();
    });

    updatePlaybar();
}

function updatePlaybar() {
    if (!window.MusicPlayer?.currentSong) return;

    const song = window.MusicPlayer.currentSong;

    document.getElementById('playbar-cover').src = song.coverImage || 'assets/img/song.png';
    document.getElementById('playbar-title').textContent = song.title;
    document.getElementById('playbar-artist').textContent = song.artist;
    document.getElementById('play-pause-btn').querySelector('.control-icon').textContent = window.MusicPlayer.isPlaying ? '⏸' : '▶';
    document.getElementById('total-time').textContent = song.duration;

    // Animate progress
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.animation = 'none';
    setTimeout(() => {
        const duration = window.MusicPlayer.durationToSeconds(song.duration);
        progressFill.style.animation = `progressAnimate ${duration}s linear`;
    }, 10);
}

// Add CSS for missing styles
const styles = document.createElement('style');
styles.textContent = `
    .section-title-large { font-family: 'DM Serif Display', serif; font-size: 40px; margin: 0 0 8px 0; }
    .section-subtitle { font-size: 16px; color: var(--text-secondary); margin: 0 0 32px 0; }
    .section-subtitle-inline { font-size: 14px; color: var(--text-secondary); margin: 0; }
    .content-section { margin-bottom: 48px; }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .section-title { font-family: 'DM Serif Display', serif; font-size: 28px; margin: 0; }
    .playlist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px; }

    /* Playlist Single Cover */
    .playlist-cover-wrapper { position: relative; margin-bottom: 16px; }
    .playlist-cover { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; box-shadow: var(--shadow-md); transition: transform 0.3s; }
    .playlist-card:hover .playlist-cover { transform: scale(1.05); }

    .empty-state { grid-column: 1 / -1; text-align: center; padding: 80px 20px; }
    .empty-illustration { font-size: 80px; opacity: 0.6; }
    .empty-title { font-family: 'DM Serif Display', serif; font-size: 28px; margin: 16px 0 8px; }
    .empty-message { font-size: 16px; color: var(--text-secondary); }

    /* Trending Cards (Home Page) */
    .trending-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
    .trending-card { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.3s; border: 2px solid rgba(255, 154, 118, 0.15); }
    .trending-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); border-color: rgba(255, 154, 118, 0.3); }
    .trending-cover-wrapper { position: relative; margin-bottom: 12px; }
    .trending-cover { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 12px; }
    .trending-overlay { position: absolute; top: 8px; right: 8px; }
    .trending-badge { background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px); color: white; padding: 4px 12px; border-radius: 12px; font-size: 11px; font-weight: 600; }
    .trending-info { display: flex; flex-direction: column; gap: 4px; }
    .trending-title { font-family: 'DM Serif Display', serif; font-size: 18px; margin: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .trending-artist { font-size: 14px; color: var(--text-secondary); margin: 0; font-weight: 600; }
    .trending-description { font-size: 12px; color: var(--text-muted); margin: 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    /* Trending Full Page */
    .trending-full-section { padding: 0; }
    .trending-header { margin-bottom: 32px; }
    .trending-full-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 24px; }
    .trending-full-card { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); border-radius: 20px; overflow: hidden; border: 2px solid rgba(255, 154, 118, 0.2); transition: all 0.3s; }
    .trending-full-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); border-color: rgba(255, 154, 118, 0.4); }
    .trending-full-cover-wrapper { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; }
    .trending-full-cover { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
    .trending-full-card:hover .trending-full-cover { transform: scale(1.05); }
    .trending-full-overlay { position: absolute; top: 16px; right: 16px; }
    .trending-full-badge { background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(8px); color: white; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; }
    .trending-full-info { padding: 20px; }
    .trending-full-title { font-family: 'DM Serif Display', serif; font-size: 24px; margin: 0 0 4px 0; }
    .trending-full-artist { font-size: 16px; color: var(--text-secondary); margin: 0 0 12px 0; font-weight: 600; }
    .trending-full-description { font-size: 14px; color: var(--text-muted); margin: 0 0 16px 0; line-height: 1.5; }
    .trending-tracks { background: rgba(255, 154, 118, 0.1); border-radius: 12px; padding: 12px; }
    .tracks-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0; color: var(--text-secondary); }
    .tracks-list { list-style: none; padding: 0; margin: 0; font-size: 13px; line-height: 1.8; color: var(--text-primary); }
    .tracks-more { color: var(--text-secondary); font-style: italic; }

    /* Featured Page Styles */
    .featured-container { display: grid; grid-template-columns: 40% 60%; gap: 48px; align-items: start; }
    .featured-hero { position: sticky; top: 80px; }
    .featured-cover { width: 100%; aspect-ratio: 1; border-radius: 16px; box-shadow: var(--shadow-xl); margin-bottom: 24px; object-fit: cover; transition: transform 0.3s; }
    .featured-cover:hover { transform: scale(1.02); }
    .featured-info { text-align: center; }
    .featured-type { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); margin: 0 0 8px 0; }
    .featured-title { font-family: 'DM Serif Display', serif; font-size: 36px; margin: 0 0 8px 0; line-height: 1.2; }
    .featured-creator { font-size: 16px; color: var(--text-secondary); margin: 0 0 16px 0; }
    .featured-like-button { padding: 12px 24px; border-radius: 24px; border: 2px solid var(--accent-green); background: transparent; cursor: pointer; font-weight: 600; transition: all 0.3s; }
    .featured-like-button:hover { background: var(--accent-green); color: white; transform: scale(1.05); }
    .featured-like-button.liked { background: var(--accent-red); border-color: var(--accent-red); color: white; }
    .featured-songs-header { font-family: 'DM Serif Display', serif; font-size: 24px; margin: 0 0 16px 0; }
    .featured-song-list { list-style: none; padding: 0; margin: 0; }
    .song-number { font-size: 14px; color: var(--text-secondary); min-width: 20px; }

    @media (max-width: 968px) {
        .trending-grid { grid-template-columns: 1fr; }
        .trending-full-grid { grid-template-columns: 1fr; }
        .featured-container { grid-template-columns: 1fr; gap: 32px; }
        .featured-hero { position: relative; top: 0; }
    }

    @keyframes progressAnimate { from { width: 0%; } to { width: 100%; } }
`;
document.head.appendChild(styles);
