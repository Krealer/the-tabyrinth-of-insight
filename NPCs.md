# NPC Guide

## NPC #1: The Verdant Initiator ("Greenthought")

### Appearance
- **Color**: Green with a gentle pulsing glow to signal awareness.
- **Position**: Initially placed around tile `[14,17]` within the 30×30 grid.
- **Behavior**: Remains idle until a player approaches. When close, Greenthought turns to face the player. A double click or tap initiates dialogue.

### Dialogue Interaction Logic
1. Player double-clicks Greenthought.
2. Player movement is suspended and a modal dialogue box appears.
3. Greenthought speaks first, followed by two labeled responses for the player.
4. The selected label determines the next line and whether the dialogue continues or ends.

### Example Dialogue – First Encounter
```
Greenthought: "Greetings, wanderer. Are you adrift or seeking something deeper?"

1) "Oh, nothing. Just exploring."
2) "What do you have to offer?"
```
**If option 1 is chosen:**
```
Greenthought: "Very well. The grid is yours to roam. I shall remain here if your curiosity returns."
```
*Dialogue ends and movement resumes.*

**If option 2 is chosen:**
```
Greenthought: "Ah! I offer thoughts, not things. Wisdom fragments carried on the winds of forgotten minds. Would you hear one?"

1) "Yes, tell me something useful."
2) "No thanks, maybe later."
```
Selecting label 1 yields a short "Thought Fragment" (one of the hidden truths). Selecting label 2 ends the dialogue as above.

### Reusability
- This structure can be reused for future NPCs.
- Each NPC can supply a different set of "Thought Fragments" or pose new questions that influence the player's imagined "Insight Meter." The grid remains unobstructed so interaction and dialogue drive exploration rather than walls or puzzles.
