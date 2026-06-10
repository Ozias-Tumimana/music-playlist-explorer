// ===================================
// SHARED MUSIC PLAYER
// Manages now playing state across all pages
// ===================================

const MusicPlayer = {
    // Current playback state
    currentSong: null,
    currentPlaylist: null,
    isPlaying: false,
    progressInterval: null,
    startTime: null,

    // Initialize player on page load
    init() {
        this.loadState();
        this.setupNowPlayingBar();
        this.startProgressTracking();
    },

    // Load saved state from localStorage
    loadState() {
        const saved = localStorage.getItem('musicPlayerState');
        if (saved) {
            const state = JSON.parse(saved);
            this.currentSong = state.currentSong;
            this.currentPlaylist = state.currentPlaylist;
            this.isPlaying = state.isPlaying;
            this.startTime = state.startTime;
        }
    },

    // Save state to localStorage
    saveState() {
        const state = {
            currentSong: this.currentSong,
            currentPlaylist: this.currentPlaylist,
            isPlaying: this.isPlaying,
            startTime: this.startTime
        };
        localStorage.setItem('musicPlayerState', JSON.stringify(state));
    },

    // Play a song
    playSong(song, playlist) {
        this.currentSong = song;
        this.currentPlaylist = playlist;
        this.isPlaying = true;
        this.startTime = Date.now();
        this.saveState();
        this.updateNowPlayingBar();
        this.startProgressTracking();

        // Broadcast to other tabs
        window.dispatchEvent(new Event('musicPlayerUpdate'));
    },

    // Pause playback
    pause() {
        this.isPlaying = false;
        this.saveState();
        this.stopProgressTracking();
    },

    // Resume playback
    resume() {
        this.isPlaying = true;
        this.startTime = Date.now();
        this.saveState();
        this.startProgressTracking();
    },

    // Convert duration string (e.g., "3:45") to seconds
    durationToSeconds(duration) {
        const parts = duration.split(':');
        const minutes = parseInt(parts[0], 10);
        const seconds = parseInt(parts[1], 10);
        return minutes * 60 + seconds;
    },

    // Setup now playing bar UI
    setupNowPlayingBar() {
        const nowPlayingBar = document.querySelector('.now-playing-bar');
        if (!nowPlayingBar) return;

        // If we have a current song, show the bar
        if (this.currentSong) {
            this.updateNowPlayingBar();
            nowPlayingBar.classList.remove('hidden');
        }

        // Listen for updates from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'musicPlayerState') {
                this.loadState();
                this.updateNowPlayingBar();
            }
        });

        window.addEventListener('musicPlayerUpdate', () => {
            this.loadState();
            this.updateNowPlayingBar();
        });
    },

    // Update now playing bar display
    updateNowPlayingBar() {
        const nowPlayingBar = document.querySelector('.now-playing-bar');
        if (!nowPlayingBar || !this.currentSong) return;

        const cover = nowPlayingBar.querySelector('.now-playing-cover');
        const title = nowPlayingBar.querySelector('.now-playing-title');
        const artist = nowPlayingBar.querySelector('.now-playing-artist');
        const progressFill = nowPlayingBar.querySelector('.progress-fill');

        if (cover) cover.src = this.currentSong.coverImage || 'assets/img/song.png';
        if (title) title.textContent = this.currentSong.title;
        if (artist) artist.textContent = this.currentSong.artist;

        // Reset progress animation
        if (progressFill) {
            progressFill.style.animation = 'none';
            setTimeout(() => {
                const duration = this.durationToSeconds(this.currentSong.duration);
                progressFill.style.animation = `progressAnimate ${duration}s linear`;
            }, 10);
        }

        nowPlayingBar.classList.remove('hidden');
    },

    // Start tracking progress
    startProgressTracking() {
        this.stopProgressTracking();

        if (!this.currentSong || !this.isPlaying) return;

        const duration = this.durationToSeconds(this.currentSong.duration);

        this.progressInterval = setInterval(() => {
            const elapsed = (Date.now() - this.startTime) / 1000;

            if (elapsed >= duration) {
                // Song finished, could auto-play next song here
                this.stopProgressTracking();
                this.isPlaying = false;
                this.saveState();
            }
        }, 1000);
    },

    // Stop tracking progress
    stopProgressTracking() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MusicPlayer.init());
} else {
    MusicPlayer.init();
}

// Export for use in other scripts
window.MusicPlayer = MusicPlayer;
