// import type {ReactNode} from 'react';
// import clsx from 'clsx';
// import Heading from '@theme/Heading';
// import styles from './styles.module.css';

// type FeatureItem = {
//   title: string;
//   Svg: React.ComponentType<React.ComponentProps<'svg'>>;
//   description: ReactNode;
// };

// const FeatureList: FeatureItem[] = [
//   {
//     title: 'Sessions',
//     Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
//     description: (
//       <>
//         Durchsuche dokumentierte Barcamp-Sessions mit wichtigen Erkenntnissen, 
//         Diskussionen und Ergebnissen aus jeder Session.
//       </>
//     ),
//   },
//   {
//     title: 'Wissenskarte',
//     Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
//     description: (
//       <>
//         Entdecke Verbindungen zwischen verschiedenen Sessions und Themen 
//         durch unsere interaktive Wissenskarte.
//       </>
//     ),
//   },
//   {
//     title: 'Civic Data Lab',
//     Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
//     description: (
//       <>
//         Veranstaltet vom Civic Data Lab bringen diese Barcamps verschiedene 
//         Perspektiven zu Civic Tech, Daten und digitaler Transformation zusammen.
//       </>
//     ),
//   },
// ];

// function Feature({title, Svg, description}: FeatureItem) {
//   return (
//     <div className={clsx('col col--4')}>
//       <div className="text--center">
//         <Svg className={styles.featureSvg} role="img" />
//       </div>
//       <div className="text--center padding-horiz--md">
//         <Heading as="h3">{title}</Heading>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// }

// export default function HomepageFeatures(): ReactNode {
//   return (
//     <section className={styles.features}>
//       <div className="container">
//         <div className="row">
//           {FeatureList.map((props, idx) => (
//             <Feature key={idx} {...props} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
