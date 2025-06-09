import React from 'react';
import Layout from '@theme/Layout';
import EnhancedKnowledgeMap from '../components/KnowledgeMap/EnhancedKnowledgeMap';

export default function KnowledgeMapPage(): React.ReactElement {
  return (
    <Layout
      title="Wissenskarte"
      description="Interaktive Karte der Barcamp-Sessions und ihrer Verbindungen"
    >
      <main>
        <EnhancedKnowledgeMap />
      </main>
    </Layout>
  );
}
