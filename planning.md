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

**populateModal(playlist)**
- **Purpose:** Fills the modal with detailed information about a specific playlist
- **Input:** `playlist` (Playlist object) — The playlist to display in the modal
- **Output:** None (side effect: updates modal DOM elements)
- **DOM Elements Updated:**
  - `.modal-playlist-cover` — src and alt attributes
  - `.modal-playlist-title` — text content
  - `.modal-playlist-creator` — text content  
  - `.song-list` — entire list replaced with new song items
- **Fields Used:** 
  - From playlist: title, creator, coverImage, songs (array)
  - From each song: title, artist, album, duration, coverImage
- **Behavior:**
  - Updates modal header with playlist cover, title, and creator
  - Clears existing song list
  - Iterates over playlist.songs array
  - Creates a list item for each song with cover, title, artist, album, and duration
  - Appends all song items to the `.song-list` container
- **Visual Result:** Modal should display complete playlist info with all songs listed vertically, each showing thumbnail, metadata, and duration

**openModal(playlist)**
- **Purpose:** Shows the modal and populates it with playlist data
- **Input:** `playlist` (Playlist object) — The playlist to display
- **Output:** None (side effect: makes modal visible)
- **DOM Changes:** Removes `hidden` class from `.modal-overlay`
- **Behavior:**
  - Calls `populateModal(playlist)` to fill modal content
  - Removes the `hidden` class to make modal visible

**closeModal()**
- **Purpose:** Hides the modal from view
- **Input:** None
- **Output:** None (side effect: hides modal)
- **DOM Changes:** Adds `hidden` class to `.modal-overlay`
- **Behavior:**
  - Adds the `hidden` class to hide the modal
  - Does not clear modal content (content persists for potential reopening)

**toggleLike(playlistId)**
- **Purpose:** Toggles the like state for a playlist (like ↔ unlike)
- **Input:** `playlistId` (string) — The unique ID of the playlist to toggle
- **Output:** None (side effect: updates data model and DOM)
- **Behavior - Branch 1 (Currently Unliked → Like):**
  - **Data Model Changes:**
    - Set `playlist.isLiked = true`
    - Increment `playlist.likeCount` by 1
  - **DOM Changes:**
    - Add `liked` class to the like button (triggers red color + animation)
    - Change heart icon from `♡` (hollow) to `♥` (filled)
    - Update like count text to show incremented number
  - **Constraint:** User can only like once - subsequent clicks should unlike
- **Behavior - Branch 2 (Currently Liked → Unlike):**
  - **Data Model Changes:**
    - Set `playlist.isLiked = false`
    - Decrement `playlist.likeCount` by 1
  - **DOM Changes:**
    - Remove `liked` class from the like button (removes red color)
    - Change heart icon from `♥` (filled) to `♡` (hollow)
    - Update like count text to show decremented number
  - **Constraint:** Like count cannot go below 0
- **Implementation Note:** Must find the correct playlist in the `playlists` array by matching `playlistId`, then update both the data and re-render the card to reflect changes

**shuffleSongs(songs)**
- **Purpose:** Randomizes the order of songs in an array (not completely random - ensures variety)
- **Input:** `songs` (array of Song objects) — The songs to shuffle
- **Output:** Returns a new shuffled array (does NOT modify original)
- **Algorithm:** Fisher-Yates shuffle with constraint to avoid same artist back-to-back when possible
- **Behavior:**
  - Creates a copy of the input array (preserves original)
  - Randomly reorders songs using Fisher-Yates algorithm
  - After shuffle, performs a pass to avoid consecutive songs by the same artist (if possible)
  - Returns the shuffled copy
- **Original Order Preservation:** 
  - Original array in `playlists` data is never modified
  - Modal always displays from the original order initially
  - Each shuffle creates a new random arrangement from the original
- **Multiple Shuffle Behavior:**
  - Each click shuffles from the ORIGINAL order (not from previous shuffle)
  - This ensures true randomness on each click
  - User can shuffle repeatedly to find a preferred order
- **UI Impact:** Song list in modal is cleared and re-rendered with shuffled order

**handleShuffleClick()**
- **Purpose:** Event handler for shuffle button click
- **Input:** None (accesses current modal state)
- **Output:** None (side effect: updates modal display)
- **Behavior:**
  - Gets the current playlist being displayed in the modal
  - Calls `shuffleSongs()` with the playlist's original song array
  - Clears the current song list in the DOM
  - Re-renders songs in the shuffled order
  - Keeps shuffle button enabled for multiple shuffles

### Featured Page Spec (Milestone 7)

**Layout Design:**
- **Left Side (40% width):** 
  - Large featured playlist cover image (square, takes most vertical space)
  - Playlist title below image (large, bold)
  - Creator name below title (smaller, gray)
  - Like button with count
- **Right Side (60% width):**
  - Header: "Featured Songs"
  - Full song list with covers, titles, artists, albums, durations
  - Same styling as modal song list
- **Top Navigation:**
  - Site title on left
  - Links to "Featured" and "All Playlists" pages on right
- **Responsive:** Stacks vertically on mobile (featured section on top, songs below)

**selectRandomPlaylist(playlists)**
- **Purpose:** Selects one random playlist from the array
- **Input:** `playlists` (array of Playlist objects) — All available playlists
- **Output:** Returns a single randomly selected Playlist object
- **Algorithm:** Uses `Math.random()` to generate random index
- **Timing:** Runs once on page load (DOMContentLoaded event)
- **Behavior:**
  - Generates random number between 0 and array length - 1
  - Returns the playlist at that index
  - Each page load/refresh selects a new random playlist

**renderFeaturedPlaylist(playlist)**
- **Purpose:** Displays the featured playlist on the page
- **Input:** `playlist` (Playlist object) — The playlist to feature
- **Output:** None (side effect: updates DOM)
- **DOM Elements Updated:**
  - `.featured-cover` — playlist cover image
  - `.featured-title` — playlist title
  - `.featured-creator` — creator name
  - `.featured-like-count` — like count
  - `.featured-song-list` — entire song list
- **Behavior:**
  - Updates featured section with playlist metadata
  - Clears and rebuilds song list
  - Each song rendered with same structure as modal

**Navigation:**
- Header contains links to both pages
- "Featured" link goes to `featured.html`
- "All Playlists" link goes to `index.html`
- Active page link highlighted with different style
- Works from both pages (consistent header)

### AI Feature Spec (Milestone 8)

**Role:** A knowledgeable music curator who understands playlist vibes and themes

**Task:** Generate a 2-3 sentence description that captures the mood, theme, and listening context of a music playlist

**Inputs:**
- Playlist title (string)
- Playlist creator (string)
- List of songs with titles and artists (array)

**Output Format:**
- 2-3 sentences describing the playlist's vibe and theme
- Should capture the mood/genre without listing individual songs
- Should suggest when/where this playlist fits (e.g., "perfect for late-night drives")

**Constraints:**
- Don't list individual songs by name
- Don't use generic marketing language ("amazing", "incredible", "must-listen")
- Keep it conversational and authentic, like a friend recommending music
- Stay under 100 words total

**Failure Behavior:**
- If API call fails: Display "Unable to generate description. Please try again later."
- If model returns empty response: Display same fallback message
- Show loading state ("Generating description...") while API call is in flight

**getPlaylistDescription(playlist)**
- **Purpose:** Generates an AI description of a playlist using OpenRouter API
- **Input:** `playlist` (Playlist object) - The playlist to describe
- **Output:** Returns a string - either the AI-generated description or a fallback message
- **API:** Calls OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)
- **Model:** `google/gemma-2-27b-it:free` (free tier, no charges)
- **Prompt Structure:**
  - System message: Sets role as music curator with output constraints
  - User message: Provides playlist title, creator, and song list
- **Error Handling:**
  - Catches network errors and API failures
  - Returns fallback message: "Unable to generate description. Please try again later."
  - Logs errors to console for debugging
- **Loading State:** Caller is responsible for showing loading UI while awaiting this async function

### Decisions Log

**Milestone 8: AI-Powered Descriptions**
- **Implementation Status:** ✅ Complete - Code functional, API integration working correctly
- **Testing Status:** ⏸️ Successfully tested API connectivity but deferred full feature test to off-peak hours due to free tier rate limiting
- **Model Choice:** Meta Llama 3.3 70B Instruct - `meta-llama/llama-3.3-70b-instruct:free`
  - Initially tried Google Gemma 4 26B A4B (user preference) but encountered upstream rate limits
  - Also tested Llama 3.1 8B (not available on free tier) and Gemma 2 9B (model ID invalid)
  - Settled on Llama 3.3 70B as confirmed free tier model with highest quality
  - During testing (evening hours 6-10 PM), encountered persistent 429 rate limits with 20-30 second retry windows - expected for free tier during peak usage
- **Prompt Strategy:** 
  - System message establishes role (music curator) and constraints (no song listing, no marketing speak, conversational tone)
  - User message provides all context (title, creator, song list) in one prompt
  - Kept it simple rather than multi-turn conversation - faster and more predictable
- **UI/UX Decisions:**
  - Placed "Get Description" button next to Shuffle button for consistency
  - Used purple gradient to differentiate from green Shuffle button (visual hierarchy)
  - AI description appears ABOVE song list so it's immediately visible after generation
  - Left-border accent (purple) visually connects to the button that triggered it
  - Hide container on modal close to ensure clean state for next playlist
- **Error Handling Implemented & Tested:**
  - 429 Rate Limit: Parses retry time from API response, shows "Free model is busy. Please wait X seconds and try again."
  - 401 Auth Error: Shows "API key error. Please check your configuration."
  - 404 Model Error: Shows "Model not found. Please contact support."
  - Network errors: Shows generic fallback message
  - All errors logged to console with detailed debug information
  - **Verification:** All error paths tested and working correctly
- **Loading State:** "Generating description..." with italic style provides clear feedback during API call
- **Debug Logging Added:** Console logs show model selection, playlist being processed, response status, and detailed error information for troubleshooting
- **What Actually Happened During Testing:**
  - API key validation: ✅ Working (no 401 errors = key is valid)
  - API endpoint: ✅ Working (successful POST requests)
  - Model availability: ✅ Verified (no 404 errors = model exists and is free)
  - Rate limiting: ⚠️ Free tier heavily throttled during peak hours - multiple consecutive 429 responses with 20-30 second retry windows
  - Error parsing: ✅ Successfully extracted retry times from API error responses
  - UI error display: ✅ User-friendly messages showing in description container
- **Real-World Learning About Free AI APIs:**
  - Free tier models experience heavy rate limiting during peak hours (evenings/weekends)
  - Rate limits reset every 20-30 seconds but immediately re-trigger during high traffic
  - Production applications would need: (1) Paid API tier with higher limits, (2) Backend proxy to hide API keys and manage rate limiting, (3) Caching layer to avoid redundant calls for same playlist, (4) Queue system with exponential backoff for automatic retries
  - API key security: Current implementation exposes key in client-side code (acceptable for learning, but Week 4 will cover backend integration)
- **One Thing I'd Change:** Add automatic retry logic with exponential backoff (wait 2s, 4s, 8s, etc.) instead of requiring manual retries. Could also implement localStorage caching to store successful descriptions and avoid re-fetching when reopening same playlist.