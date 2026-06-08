## Music Playlist Explorer — Planning Spec

### Data Shape

**Playlist Object:**
- id (string) — Unique identifier for the playlist
- title (string) — The name of the playlist displayed to users
- creator (string) — Name of the person who created the playlist
- coverImage (string) — Path or URL to the playlist's cover image
- likeCount (number) — Current number of likes the playlist has received
- isLiked (boolean) — Whether the current user has liked this playlist
- songs (array of Song objects) — List of songs included in this playlist

**Song Object:**
- id (string) — Unique identifier for the song
- title (string) — The name of the song
- artist (string) — Name of the artist who performed the song
- album (string) — Name of the album the song belongs to
- duration (string) — Length of the song in MM:SS format
- coverImage (string) — Path or URL to the song's cover art

### UI and Interaction Rules
[Leave blank — fill in before Milestone 1]
    What are the main sections of the homepage?
        -Header with title & Featured page / all page links
        -Playlists with covers, likes, and created by. 
    What happens when a user clicks a playlist card?
        -The card will pop-out and reveal the songs that are on the playlists. 
    What happens when a user clicks outside the modal?
        -It takes you back to the previous screen that was in view before clicking on the modal
    What happens when a user clicks the like icon?
        -I want it to like and play a little animation sort of like instagram does. 
    What does the shuffle button do?
        -Shuffles songs based on an algorithim. I don't believe it should be completely random. 

### Function Specs

**renderPlaylistCards(playlists)**
- **Purpose:** Dynamically creates and displays playlist cards on the homepage
- **Input:** `playlists` (array of Playlist objects) — The array of playlists to render
- **Output:** None (side effect: appends cards to DOM)
- **DOM Target:** Appends each card to `.playlist-cards` container
- **Fields Used:** title, creator, coverImage, likeCount, isLiked
- **Behavior:** 
  - Clears existing cards before rendering
  - Iterates over playlists array
  - Creates card HTML for each playlist
  - Attaches click event listener to open modal
  - Displays "No playlists found" message if array is empty

### AI Feature Spec (Milestone 8)
[Leave blank — fill in before Milestone 8]

### Decisions Log
[One entry per milestone where you make spec-informed decisions]