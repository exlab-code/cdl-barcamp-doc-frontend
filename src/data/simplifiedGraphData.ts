import { Node, Edge } from '../components/KnowledgeMap/types';

// Simplified data structure inspired by Claude's map - only main sessions and central themes
export const simplifiedNodesData: Node[] = [
  // MAIN SESSIONS (14 total) - arranged in circle
  { 
    id: 'session-medizin', 
    type: 'session', 
    label: 'Medizingeschädigte Selbsthilfe', 
    slug: 'medizingeschaedigte-selbsthilfe',
    weight: 2, 
    metadata: {
      description: 'LLM für Gerichtsakten-Analyse. "KI löst keine grundlegenden Organisationsüberforderungsprobleme"',
      keyPoints: ['Gerichtsakten-Analyse', 'Organisationsüberforderung', 'LLM-Einsatz'],
      documentPath: '/docs/sessions/1_1_medizingeschaedigte-selbsthilfe'
    }
  },
  { 
    id: 'session-lokale-llms', 
    type: 'session', 
    label: 'Lokale LLMs', 
    slug: 'lokale-llms',
    weight: 17, 
    metadata: {
      description: '"unzensiert, Bias, Datenschutz". Infrastruktur für Zivilgesellschaft zusammen betreiben',
      keyPoints: ['Datenschutz', 'Bias-Vermeidung', 'Lokale Infrastruktur'],
      documentPath: '/docs/sessions/2_1_lokale-llms'
    }
  },
  { 
    id: 'session-eu-ai-act', 
    type: 'session', 
    label: 'EU AI Act & Data Management', 
    slug: 'eu-ai-act-data-management',
    weight: 15, 
    metadata: {
      description: 'AI Governance für Zivilgesellschaft. "AI Governance ist unverzichtbar für sensible Daten"',
      keyPoints: ['EU AI Act', 'DSGVO-Compliance', 'Governance-Strukturen'],
      documentPath: '/docs/sessions/1_3_eu-ai-act-data-management'
    }
  },
  { 
    id: 'session-ground-truth', 
    type: 'session', 
    label: 'Ground Truth Sozialstaat', 
    slug: 'ground-truth-sozialstaat',
    weight: 15, 
    metadata: {
      description: 'Förderfunke Session: Data Commons für Sozialleistungen. "verschiedene Akteure interpretieren Regeln immer wieder neu"',
      keyPoints: ['Sozialleistungen', 'Regelinterpretation', 'Data Commons'],
      documentPath: '/docs/sessions/1_5_ground-truth-sozialstaat'
    }
  },
  { 
    id: 'session-communities', 
    type: 'session', 
    label: 'Communities vs Arbeitskreise', 
    slug: 'communities-vs-arbeitskreise',
    weight: 7, 
    metadata: {
      description: '"Wenn du nicht mehr weiter weißt, gründe keinen Arbeitskreis"',
      keyPoints: ['Community-Modell', 'Arbeitskreis-Probleme', 'Organisationsformen'],
      documentPath: '/docs/sessions/2_1_communities-vs-arbeitskreise'
    }
  },
  { 
    id: 'session-second-brain', 
    type: 'session', 
    label: 'Second Brain', 
    slug: 'second-brain',
    weight: 7, 
    metadata: {
      description: 'Obsidian/Notion für Notizen. "Es gibt kein ideales System" - KI für persönliche Daten',
      keyPoints: ['Wissensmanagement', 'Persönliche Daten', 'Tool-Auswahl'],
      documentPath: '/docs/sessions/2_2_second-brain'
    }
  },
  { 
    id: 'session-ki-salami', 
    type: 'session', 
    label: 'KI und Salami', 
    slug: 'ki-und-salami',
    weight: 11, 
    metadata: {
      description: 'Anthropomorphisierung von KI. "Gefühl für sich selbst verlieren durch Daten über sich"',
      keyPoints: ['Anthropomorphisierung', 'Selbstwahrnehmung', 'KI-Ethik'],
      documentPath: '/docs/sessions/2_3_ki-und-salami'
    }
  },
  { 
    id: 'session-nachhaltigkeitsdaten', 
    type: 'session', 
    label: 'Nachhaltigkeitsdaten & CSRD', 
    slug: 'nachhaltigkeitsdaten-csrd',
    weight: 6, 
    metadata: {
      description: 'ESG-Daten für kollektive Wirkung. "nicht nur für Berichtspflichten nutzen"',
      keyPoints: ['ESG-Reporting', 'Nachhaltigkeitsdaten', 'Berichtspflichten'],
      documentPath: '/docs/sessions/2_4_nachhaltigkeitsdaten-csrd'
    }
  },
  { 
    id: 'session-datenprojekt', 
    type: 'session', 
    label: 'Datenprojekt Datenbank', 
    slug: 'datenprojekt-datenbank',
    weight: 3, 
    metadata: {
      description: 'Projekte auffindbar machen. "Was macht ein Datenprojekt zum Datenprojekt?"',
      keyPoints: ['Projektdatenbank', 'Auffindbarkeit', 'Kategorisierung'],
      documentPath: '/docs/sessions/2_6_datenprojekt-datenbank'
    }
  },
  { 
    id: 'session-globale-uebersichten', 
    type: 'session', 
    label: 'Globale Übersichten lokale Angebote', 
    slug: 'globale-uebersichten-lokale-angebote',
    weight: 8, 
    metadata: {
      description: 'Caritas-Beratung zugänglich machen. "Wo melde ich mich? Welche Beratung ist richtig?"',
      keyPoints: ['Beratungsangebote', 'Zugänglichkeit', 'Lokale Services'],
      documentPath: '/docs/sessions/3_1_globale-uebersichten-lokale-angebote'
    }
  },
  { 
    id: 'session-data-governance', 
    type: 'session', 
    label: 'Data Governance Wegweiser', 
    slug: 'data-governance',
    weight: 4, 
    metadata: {
      description: 'Spannungsfeld Bund-Land-Kommune. "Welche Daten sollen offen allen zugänglich sein?"',
      keyPoints: ['Föderalismus', 'Offene Daten', 'Governance-Strukturen'],
      documentPath: '/docs/sessions/3_2_data-governance'
    }
  },
  { 
    id: 'session-staat-zivilgesellschaft', 
    type: 'session', 
    label: 'Zusammenarbeit Staat & Zivilgesellschaft', 
    slug: 'zusammenarbeit-staat-zivilgesellschaft',
    weight: 16, 
    metadata: {
      description: 'Wirkungsmessung via Excel. "Es geht nicht um perfektes System, sondern pragmatische Lösung"',
      keyPoints: ['Staat-NGO-Kooperation', 'Wirkungsmessung', 'Pragmatismus'],
      documentPath: '/docs/sessions/3_3_zusammenarbeit-staat-zivilgesellschaft'
    }
  },
  { 
    id: 'session-interne-governance', 
    type: 'session', 
    label: 'Interne Daten Governance', 
    slug: 'interne-daten-governance-in-sozialorganisationen',
    weight: 9, 
    metadata: {
      description: 'IT-Asset-Management Session: "100 Jahre alte Organisation, nie jemand den Hut für Datengovernance gehabt"',
      keyPoints: ['IT-Asset-Management', 'Organisationsstrukturen', 'Legacy-Systeme'],
      documentPath: '/docs/sessions/3_4_interne-daten-governance-in-sozialorganisationen'
    }
  },
  { 
    id: 'session-ml-fundraising', 
    type: 'session', 
    label: 'Machine Learning Fundraising', 
    slug: 'machine-learning-fundraising',
    weight: 3, 
    metadata: {
      description: 'Fundraising automatisieren. "Erwartungswert pro Spendenbrief"',
      keyPoints: ['Fundraising-Automatisierung', 'Machine Learning', 'Spenderdaten'],
      documentPath: '/docs/sessions/3_5_machine-learning-fundraising'
    }
  },

  // CENTRAL CROSS-CUTTING THEMES (6 total) - in center
  { 
    id: 'silostrukturen', 
    type: 'cross-challenge', 
    label: 'Silostrukturen', 
    slug: 'silostrukturen',
    weight: 10, 
    metadata: {
      description: 'Kernproblem in 10+ Sessions: von "Akteure interpretieren Regeln neu" bis "getrennte Systeme ohne Schnittstellen"',
      keyPoints: ['Systemtrennung', 'Kommunikationsprobleme', 'Datensilos']
    }
  },
  { 
    id: 'datengovernance-challenge', 
    type: 'cross-challenge', 
    label: 'Datengovernance-Herausforderung', 
    slug: 'datengovernance-herausforderung',
    weight: 8, 
    metadata: {
      description: 'Strukturierte Datenverwaltung als Problem in 6+ Sessions: "nie jemand den Hut dafür gehabt"',
      keyPoints: ['Verantwortlichkeiten', 'Datenqualität', 'Governance-Strukturen']
    }
  },
  { 
    id: 'ki-governance', 
    type: 'cross-concept', 
    label: 'KI-Governance', 
    slug: 'ki-governance',
    weight: 6, 
    metadata: {
      description: 'AI-Themen in 5 Sessions: von DSGVO-Compliance bis Anthropomorphisierung',
      keyPoints: ['AI-Ethik', 'DSGVO-Compliance', 'Bias-Vermeidung']
    }
  },
  { 
    id: 'automatisierung-vision', 
    type: 'cross-concept', 
    label: 'Automatisierung', 
    slug: 'automatisierung',
    weight: 5, 
    metadata: {
      description: 'Gemeinsame Vision in 4 Sessions: von proaktivem Staat bis Fundraising-Algorithmen',
      keyPoints: ['Prozessautomatisierung', 'Effizienzsteigerung', 'Digitalisierung']
    }
  },
  { 
    id: 'excel-problem', 
    type: 'cross-challenge', 
    label: 'Excel-Problematik', 
    slug: 'excel-problematik',
    weight: 4, 
    metadata: {
      description: 'Veraltete Tools in 3 Sessions: "Excel-Tabellen per E-Mail" als Symbol für fehlende Digitalisierung',
      keyPoints: ['Legacy-Tools', 'Digitalisierungsrückstand', 'Ineffiziente Prozesse']
    }
  },
  { 
    id: 'organisationsformen', 
    type: 'cross-concept', 
    label: 'Neue Organisationsformen', 
    slug: 'organisationsformen',
    weight: 4, 
    metadata: {
      description: 'Communities vs. traditionelle Strukturen in 3 Sessions: Konsortium, Communities, Staat-Zivilgesellschaft',
      keyPoints: ['Community-Modelle', 'Kollaboration', 'Neue Arbeitsformen']
    }
  }
];

export const simplifiedLinksData: Edge[] = [
  // Cross-cutting themes affecting sessions (main connections)
  { source: 'silostrukturen', target: 'session-ground-truth', type: 'affects', strength: 1.5, evidence: ['Akteure interpretieren Regeln unterschiedlich'] },
  { source: 'silostrukturen', target: 'session-nachhaltigkeitsdaten', type: 'affects', strength: 1.5, evidence: ['Getrennte ESG-Systeme'] },
  { source: 'silostrukturen', target: 'session-interne-governance', type: 'affects', strength: 2.0, evidence: ['Getrennte IT-Systeme ohne Schnittstellen'] },
  { source: 'silostrukturen', target: 'session-data-governance', type: 'affects', strength: 1.3, evidence: ['Föderale Datensilos'] },
  { source: 'silostrukturen', target: 'session-staat-zivilgesellschaft', type: 'affects', strength: 1.6, evidence: ['Getrennte Berichtssysteme'] },
  { source: 'silostrukturen', target: 'session-datenprojekt', type: 'affects', strength: 1.2, evidence: ['Isolierte Projektdatenbanken'] },

  // Datengovernance challenges
  { source: 'datengovernance-challenge', target: 'session-ground-truth', type: 'challenges', strength: 1.4, evidence: ['Fehlende einheitliche Regelbasis'] },
  { source: 'datengovernance-challenge', target: 'session-nachhaltigkeitsdaten', type: 'challenges', strength: 1.4, evidence: ['ESG-Datenqualität und -standards'] },
  { source: 'datengovernance-challenge', target: 'session-interne-governance', type: 'challenges', strength: 1.8, evidence: ['Nie jemand den Hut für Datengovernance gehabt'] },
  { source: 'datengovernance-challenge', target: 'session-data-governance', type: 'challenges', strength: 1.6, evidence: ['Governance zwischen Föderationsebenen'] },
  { source: 'datengovernance-challenge', target: 'session-eu-ai-act', type: 'challenges', strength: 1.3, evidence: ['AI Governance Strukturen fehlen'] },
  { source: 'datengovernance-challenge', target: 'session-staat-zivilgesellschaft', type: 'challenges', strength: 1.5, evidence: ['Fehlende Datenstandards bei Mittelvergabe'] },

  // KI-Governance themes
  { source: 'ki-governance', target: 'session-eu-ai-act', type: 'core-theme', strength: 1.8, evidence: ['EU AI Act Compliance'] },
  { source: 'ki-governance', target: 'session-lokale-llms', type: 'core-theme', strength: 1.6, evidence: ['Lokale KI-Infrastruktur'] },
  { source: 'ki-governance', target: 'session-medizin', type: 'core-theme', strength: 1.4, evidence: ['LLM für Gerichtsakten'] },
  { source: 'ki-governance', target: 'session-second-brain', type: 'core-theme', strength: 1.2, evidence: ['KI für persönliche Daten'] },
  { source: 'ki-governance', target: 'session-ki-salami', type: 'core-theme', strength: 1.5, evidence: ['KI-Anthropomorphisierung'] },

  // Automatisierung vision
  { source: 'automatisierung-vision', target: 'session-ground-truth', type: 'vision', strength: 1.8, evidence: ['Automatisierte Sozialleistungen'] },
  { source: 'automatisierung-vision', target: 'session-interne-governance', type: 'vision', strength: 1.5, evidence: ['Automatisiertes Asset Management'] },
  { source: 'automatisierung-vision', target: 'session-medizin', type: 'vision', strength: 1.3, evidence: ['Automatisierte Aktenanalyse'] },
  { source: 'automatisierung-vision', target: 'session-ml-fundraising', type: 'vision', strength: 1.4, evidence: ['Automatisiertes Fundraising'] },

  // Excel problem
  { source: 'excel-problem', target: 'session-nachhaltigkeitsdaten', type: 'symptom', strength: 1.2, evidence: ['Excel für ESG-Reporting'] },
  { source: 'excel-problem', target: 'session-interne-governance', type: 'symptom', strength: 1.4, evidence: ['Excel für Asset-Tracking'] },
  { source: 'excel-problem', target: 'session-staat-zivilgesellschaft', type: 'symptom', strength: 1.8, evidence: ['Excel-Tabellen bei Mittelvergabe'] },

  // Neue Organisationsformen
  { source: 'organisationsformen', target: 'session-ground-truth', type: 'explores', strength: 1.4, evidence: ['Data Commons Konsortium'] },
  { source: 'organisationsformen', target: 'session-communities', type: 'explores', strength: 1.8, evidence: ['Communities vs Arbeitskreise'] },
  { source: 'organisationsformen', target: 'session-staat-zivilgesellschaft', type: 'explores', strength: 1.5, evidence: ['Staat-NGO Kooperation'] },

  // Some direct session connections (fewer to avoid knots)
  { source: 'session-lokale-llms', target: 'session-medizin', type: 'related_topic', strength: 1.2, evidence: ['Beide nutzen LLMs'] },
  { source: 'session-eu-ai-act', target: 'session-lokale-llms', type: 'related_topic', strength: 1.4, evidence: ['AI Governance und lokale KI'] },
  { source: 'session-communities', target: 'session-staat-zivilgesellschaft', type: 'related_topic', strength: 1.3, evidence: ['Neue Kooperationsformen'] },
  { source: 'session-data-governance', target: 'session-interne-governance', type: 'related_topic', strength: 1.5, evidence: ['Governance auf verschiedenen Ebenen'] }
];

export const simplifiedFilterOptions = [
  { id: 'all', label: 'Alle Sessions', color: '#666' },
  { id: 'session-medizin', label: 'Medizin-Selbsthilfe', color: '#1f2937' },
  { id: 'session-lokale-llms', label: 'Lokale LLMs', color: '#1f2937' },
  { id: 'session-eu-ai-act', label: 'EU AI Act', color: '#1f2937' },
  { id: 'session-ground-truth', label: 'Ground Truth', color: '#1f2937' },
  { id: 'session-communities', label: 'Communities', color: '#1f2937' },
  { id: 'session-second-brain', label: 'Second Brain', color: '#1f2937' },
  { id: 'session-ki-salami', label: 'KI & Salami', color: '#1f2937' },
  { id: 'session-nachhaltigkeitsdaten', label: 'Nachhaltigkeitsdaten', color: '#1f2937' },
  { id: 'session-datenprojekt', label: 'Datenprojekte', color: '#1f2937' },
  { id: 'session-globale-uebersichten', label: 'Globale Übersichten', color: '#1f2937' },
  { id: 'session-data-governance', label: 'Data Governance', color: '#1f2937' },
  { id: 'session-staat-zivilgesellschaft', label: 'Staat-Zivilgesellschaft', color: '#1f2937' },
  { id: 'session-interne-governance', label: 'Interne Governance', color: '#1f2937' },
  { id: 'session-ml-fundraising', label: 'ML Fundraising', color: '#1f2937' },
  { id: 'cross', label: 'Übergreifende Themen', color: '#8b5cf6' },
  { id: 'challenges', label: 'Herausforderungen', color: '#ef4444' },
  { id: 'solutions', label: 'Lösungsansätze', color: '#06b6d4' }
];
