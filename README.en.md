# CDL Barcamp Documentation

Barcamp session documentation with an interactive knowledge map visualization.

## Setup

```bash
npm install
npm start
```

Knowledge map: `http://localhost:3000/knowledge-map`

## What's This?

Documentation of CDL Barcamp sessions with a D3.js visualization showing connections between sessions. Sessions are arranged in an outer circle, with overarching themes and challenges in the center.

## Adding a Session

### 1. Fork and clone repository

```bash
git clone https://github.com/YOUR-USERNAME/cdl-barcamp-doc-frontend.git
cd cdl-barcamp-doc-frontend
git checkout -b feature/new-session
```

### 2. Create session file

New Markdown file in `docs/sessions/` with this format:

```markdown
---
title: "Session Title"
description: "Brief description"
tags: ["tag1", "tag2"]
---

# Session Title

## Description
What was discussed...

## Key Points
- Point 1
- Point 2

## Challenges
- Challenge 1
- Challenge 2

## Solutions
- Approach 1
- Approach 2
```

### 3. Create Pull Request

```bash
git add docs/sessions/new_session.md
git commit -m "feat: add session 'Title'"
git push origin feature/new-session
```

Then create Pull Request on GitHub.

## Adding Documentation

### Create new page

```bash
# Create file
docs/new-section/page.md
```

### Configure sidebar

In `sidebars.ts`:

```typescript
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'New Section',
      items: ['new-section/page'],
    },
  ],
};
```

## Roadmap

### Planned: Automatic Knowledge Map

- **GitHub Action**: Automatic recalculation when new sessions are added
- **ParrotPark Integration**: CorrelAid's local LLM analyzes session content
- **Automatic Connections**: AI finds thematic connections between sessions

```yaml
# .github/workflows/update-knowledge-map.yml
name: Update Knowledge Map
on:
  push:
    paths: ['docs/sessions/**']
jobs:
  update-map:
    steps:
      - name: Analyze with ParrotPark
        run: |
          # Connect to ParrotPark LLM
          # Analyze new sessions
          # Update knowledge map
```

### Why 

Currently, connections between sessions need to be maintained manually. With ParrotPark, this becomes automatic:

1. New session is added
2. GitHub Action triggers
3. ParrotPark analyzes the content
4. Connections to other sessions are automatically created
5. Knowledge map updates itself

## Tech Stack

- **Docusaurus**: Documentation website
- **React + TypeScript**: Components
- **D3.js**: Interactive visualization
- **Tailwind CSS**: Styling

## Build & Deploy

```bash
npm run build
npm run deploy  # GitHub Pages
```

## Project Structure

```
docs/sessions/          # Session documentation
src/components/KnowledgeMap/  # Visualization
src/data/               # Graph data
```

## License

MIT
