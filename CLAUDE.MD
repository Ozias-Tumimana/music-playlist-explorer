# Music Playlist Explorer — Project Guide

## Project Context
This is Project #2 for CodePath SITE program, due June 10th, 2026. This is a high-stakes academic project that will be evaluated by instructors.

## Quality Standards
**We are aiming for excellence.** This project should:
- Go above and beyond the basic requirements
- Look polished, modern, and professional
- Demonstrate strong technical skills and attention to detail
- Be impressive enough to showcase in a portfolio

## Working Principles

### Spec-First Development
- Always update `planning.md` BEFORE implementing each milestone
- Write function specs before writing functions
- Validate implementations against the spec after completing them
- Use Claude to check if code matches the spec

### Design Philosophy
- Modern, clean aesthetic (think Spotify-level polish)
- Smooth animations and micro-interactions
- Responsive design is non-negotiable
- Generous whitespace and consistent spacing
- User-friendly error states and loading indicators

### Code Quality
- Semantic HTML with proper structure
- Clean, organized JavaScript (group related functions)
- DRY principles (but don't over-abstract)
- Graceful error handling everywhere
- Brief comments only for non-obvious logic

### User Experience Priorities
1. Visual polish matters — animations, hover states, transitions
2. Interactions should feel smooth and intuitive
3. Loading states should be informative, not just spinners
4. Empty states and errors should be handled gracefully
5. The app should work well on both desktop and mobile

## Project-Specific Notes
- The "like" feature should have an Instagram-style animation (scale + color)
- Shuffle algorithm should not be completely random (ensure variety)
- Modal should feel premium (backdrop blur, smooth transitions)
- Featured page should feel like a hero section

## What NOT to Do
- Don't add excessive comments explaining what code does (the code should be self-documenting)
- Don't create documentation files beyond planning.md unless explicitly requested
- Don't over-engineer — meet the requirements elegantly, then add polish
- Don't implement features halfway — each feature should be fully functional and polished

## Communication Standards (For Teaching & Learning)

### When Making Changes
Before every code change, Claude MUST explain:
1. **What** is being changed (specific files and functions)
2. **Why** this change is needed (connects to the milestone requirement)
3. **How** it works (brief explanation of the logic in plain English)
4. **What to watch for** (potential gotchas or important concepts)

### Code Comments for Learning
- Add brief explanatory comments for non-obvious patterns
- Explain *why* architectural decisions were made (not just *what* the code does)
- Point out best practices being demonstrated
- Highlight common pitfalls being avoided

### Teaching Moments
When introducing new concepts (async/await, array methods, DOM manipulation, event handling), include:
- A one-sentence explanation of what the concept does
- Why we're using it instead of alternatives
- A note about where to learn more (e.g., "This is the Fetch API - see MDN for details")

### After Implementation
Claude should provide:
- Summary of what was built
- How the pieces connect together
- Where to look in the code for specific functionality (with file:line references)
- Suggestions for experimenting or learning more

### Example Communication Format
```
I'm going to add the shuffle function to script.js.

**What:** Adding shuffleSongs() function
**Why:** Milestone 4 requires shuffle functionality that ensures variety
**How:** Uses Fisher-Yates algorithm to reorder songs, but checks to avoid placing songs by the same artist back-to-back
**Key Concept:** This algorithm works in-place, meaning it modifies the original array without creating a copy (memory efficient)

[makes the change]

✅ Done! The shuffle logic is at script.js:95. 
Try clicking any playlist's shuffle button. Notice how songs 
by the same artist won't play consecutively - this creates 
better listening flow than pure random shuffling.
```

## Beginner-Friendly Practices
- Avoid unexplained jargon (or define it inline the first time it appears)
- Prefer readable code over clever one-liners when teaching
- Always show file paths with line numbers for easy navigation: [script.js:95](script.js#L95)
- Celebrate learning moments ("Great question!", "This is a common pattern you'll see often...")
- When introducing new JavaScript features, briefly explain what they do

## Current Status
- Project deadline: June 10th, 2026 at 9:00 PM PDT
- Currently on: Milestone 3 (complete, pending diverse images)
- Next milestone: Milestone 4 - Modal functionality with song display
