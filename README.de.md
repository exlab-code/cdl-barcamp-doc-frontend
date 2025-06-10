# CDL Barcamp Dokumentation

Dokumentation der Barcamp-Sessions mit interaktiver Wissenskarte.

## Setup

```bash
npm install
npm start
```

Wissenskarte: `http://localhost:3000/knowledge-map`

## Was ist das?

Dokumentation der CDL Barcamp Sessions mit einer D3.js-Visualisierung, die Verbindungen zwischen den Sessions zeigt. Sessions sind im äußeren Kreis angeordnet, übergreifende Themen und Herausforderungen in der Mitte.

## Session hinzufügen

### 1. Repository forken und klonen

```bash
git clone https://github.com/IHR-USERNAME/cdl-barcamp-doc-frontend.git
cd cdl-barcamp-doc-frontend
git checkout -b feature/neue-session
```

### 2. Session-Datei erstellen

Neue Markdown-Datei in `docs/sessions/` mit diesem Format:

```markdown
---
title: "Session Titel"
description: "Kurze Beschreibung"
tags: ["tag1", "tag2"]
---

# Session Titel

## Beschreibung
Was wurde diskutiert...

## Schlüsselpunkte
- Punkt 1
- Punkt 2

## Herausforderungen
- Problem 1
- Problem 2

## Lösungsansätze
- Ansatz 1
- Ansatz 2
```

### 3. Pull Request erstellen

```bash
git add docs/sessions/neue_session.md
git commit -m "feat: Session 'Titel' hinzugefügt"
git push origin feature/neue-session
```

Dann Pull Request auf GitHub erstellen.

## Dokumentation hinzufügen

### Neue Seite erstellen

```bash
# Datei erstellen
docs/neuer-bereich/seite.md
```

### Sidebar konfigurieren

In `sidebars.ts`:

```typescript
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Neuer Bereich',
      items: ['neuer-bereich/seite'],
    },
  ],
};
```

## Roadmap

### Geplant: Automatische Wissenskarte

- **GitHub Action**: Automatische Neuberechnung bei neuen Sessions
- **ParrotPark Integration**: CorrelAid's lokales LLM analysiert Session-Inhalte
- **Automatische Verbindungen**: KI findet thematische Verbindungen zwischen Sessions

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
          # Verbindung zu ParrotPark LLM
          # Analyse neuer Sessions
          # Update der Wissenskarte
```

### Warum

Aktuell müssen Verbindungen zwischen Sessions manuell gepflegt werden. Mit ParrotPark wird das automatisch:

1. Neue Session wird hinzugefügt
2. GitHub Action startet
3. ParrotPark analysiert den Inhalt
4. Verbindungen zu anderen Sessions werden automatisch erstellt
5. Wissenskarte aktualisiert sich

## Tech Stack

- **Docusaurus**: Dokumentations-Website
- **React + TypeScript**: Komponenten
- **D3.js**: Interaktive Visualisierung
- **Tailwind CSS**: Styling

## Build & Deploy

```bash
npm run build
npm run deploy  # GitHub Pages
```

## Projektstruktur

```
docs/sessions/          # Session-Dokumentation
src/components/KnowledgeMap/  # Visualisierung
src/data/               # Graph-Daten
```

## Lizenz

MIT
