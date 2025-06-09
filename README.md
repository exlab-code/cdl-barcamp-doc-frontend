# CDL Barcamp Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator, and features an interactive knowledge map visualization for CDL Barcamp sessions.

## 🚀 Features

### Interactive Knowledge Map
- **D3.js Visualization**: Force-directed graph showing connections between sessions
- **Dynamic Layout**: Responsive design that adapts to viewport height
- **Filter System**: Minimal pill-style buttons for exploring different themes
- **Session Navigation**: Direct links from visualization to session documentation
- **Hover Interactions**: Detailed information panels with session metadata

### Modern Tech Stack
- **Docusaurus 3.x**: Static site generation with React
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom Docusaurus integration
- **D3.js v7**: Interactive data visualization
- **React 19**: Latest React features

## 📁 Project Structure

```
src/
├── components/
│   ├── HomepageFeatures/          # Docusaurus homepage components
│   └── KnowledgeMap/              # Knowledge map visualization
│       ├── CircularForceGraph.tsx # D3.js force-directed graph
│       ├── EnhancedKnowledgeMap.tsx # Main container component
│       └── types.ts               # TypeScript interfaces
├── css/
│   └── custom.css                 # Global styles + Tailwind directives
├── data/
│   └── simplifiedGraphData.ts     # Graph nodes and edges data
└── pages/
    ├── index.tsx                  # Homepage
    └── knowledge-map.tsx          # Knowledge map page

docs/
└── sessions/                      # Barcamp session documentation
    ├── 1_1_medizingeschaedigte-selbsthilfe.md
    ├── 2_1_lokale-llms.md
    └── ...                        # Additional session files

Configuration:
├── docusaurus.config.ts           # Docusaurus + Tailwind plugin config
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🛠️ Installation

```bash
npm install
```

## 🏃‍♂️ Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

The knowledge map is available at: `http://localhost:3000/knowledge-map`

## 🏗️ Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 🚀 Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## 🎨 Knowledge Map Features

### Visualization Components

#### CircularForceGraph
- **Force-directed layout**: Sessions arranged in outer circle, themes in center
- **Interactive dragging**: Nodes can be repositioned by users
- **Zoom and pan**: Full navigation support with mouse/touch
- **Connection highlighting**: Hover to see related sessions and themes
- **Responsive sizing**: Adapts to container dimensions

#### EnhancedKnowledgeMap
- **Filter controls**: Pill-style buttons for different content types
- **Detail panel**: Shows session information and metadata
- **Dynamic height**: Uses full viewport height minus header
- **Session navigation**: Click-through to full documentation

### Data Structure

The knowledge map uses a graph-based data structure:

```typescript
interface Node {
  id: string;
  type: 'session' | 'cross-concept' | 'cross-challenge';
  label: string;
  slug: string;
  weight?: number;
  metadata?: {
    description: string;
    keyPoints: string[];
    documentPath: string;
  };
}

interface Edge {
  source: string;
  target: string;
  type: 'affects' | 'challenges' | 'core-theme' | 'vision';
  strength: number;
  evidence: string[];
}
```

## 🎯 Tailwind CSS Integration

This project uses a custom Tailwind CSS integration with Docusaurus:

### Setup
- **Plugin**: `@gracefullight/docusaurus-plugin-tailwind`
- **Configuration**: Custom `tailwind.config.js` with content paths
- **PostCSS**: Automated processing with `postcss.config.js`
- **Preflight disabled**: Prevents conflicts with Docusaurus styles

### Usage
- **Utility classes**: Full Tailwind utility library available
- **Custom components**: Styled with Tailwind classes
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Dark mode**: Compatible with Docusaurus theme switching

## 🔧 Development

### Adding New Sessions
1. Create markdown file in `docs/sessions/`
2. Update `simplifiedGraphData.ts` with new node
3. Add connections to related sessions/themes
4. Test visualization in knowledge map

### Customizing Visualization
- **Node colors**: Modify `getNodeColor()` in `CircularForceGraph.tsx`
- **Layout forces**: Adjust D3 force simulation parameters
- **Filter options**: Update `simplifiedFilterOptions` in data file
- **Styling**: Use Tailwind classes in component files

### Performance Optimization
- **React.memo**: Components are memoized for performance
- **useCallback**: Event handlers are optimized
- **D3 cleanup**: Proper simulation cleanup on unmount
- **Lazy loading**: Components load only when needed

## 📊 Session Data

The knowledge map visualizes connections between 14 barcamp sessions:

- **Sessions**: Outer circle nodes representing individual sessions
- **Cross-concepts**: Central nodes showing overarching themes
- **Cross-challenges**: Central nodes highlighting common challenges
- **Connections**: Edges showing relationships and shared topics

### Session Categories
- Data Governance & Management
- AI & Machine Learning Applications
- Community & Organizational Structures
- Local & Private Solutions
- Standards & Interoperability
- Impact Measurement & Effectiveness

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Test locally: `npm start`
5. Commit changes: `git commit -m "Add new feature"`
6. Push to branch: `git push origin feature/new-feature`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Civic Data Lab**: For organizing the barcamp and providing session content
- **Docusaurus**: For the excellent documentation platform
- **D3.js**: For powerful data visualization capabilities
- **Tailwind CSS**: For utility-first styling approach
