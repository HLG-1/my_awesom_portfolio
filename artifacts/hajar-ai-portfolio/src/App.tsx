import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowRight, Download, Github, Mail, Menu, MoveUpRight, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

const researchGalaxies = [
  {
    name: 'Intelligent Learning',
    line: '01 / LEARNING SYSTEMS',
    description: 'How can models learn effectively, share knowledge, and remain dependable when conditions change?',
    interests: ['Machine Learning', 'Deep Learning', 'Knowledge Distillation', 'Federated Learning', 'Robust Machine Learning'],
  },
  {
    name: 'Nature-Inspired Intelligence',
    line: '02 / COLLECTIVE MECHANISMS',
    description: 'A study of how adaptation, cooperation and collective behaviour can become useful computational ideas.',
    interests: ['Ant Colony Optimization', 'Swarm Intelligence', 'Evolutionary Algorithms', 'Genetic Algorithms', 'Bio-inspired Optimization', 'Adaptive Intelligent Systems'],
  },
  {
    name: 'Perception & Vision',
    line: '03 / SEEING STRUCTURE',
    description: 'From pixels to spatial structure: representing, interpreting and reasoning about visual worlds.',
    interests: ['Computer Vision', '3D Point Clouds', 'Remote Sensing', 'Medical Imaging', 'Depth Estimation'],
  },
  {
    name: 'Autonomous Systems',
    line: '04 / SYSTEMS IN MOTION',
    description: 'Decentralized agents and intelligent infrastructure that must coordinate in complex environments.',
    interests: ['Swarm Robotics', 'Multi-Agent Systems', 'ROS 2', 'Intelligent Smart City Systems'],
  },
  {
    name: 'Generative Intelligence',
    line: '05 / LANGUAGE & RETRIEVAL',
    description: 'Interfaces between language models, grounded information retrieval and useful AI agents.',
    interests: ['Large Language Models', 'RAG', 'AI Agents', 'NLP'],
  },
  {
    name: 'Reliable AI Engineering',
    line: '06 / BUILDING WITH CARE',
    description: 'The engineering practices and evaluation questions that help intelligent systems earn trust.',
    interests: ['MLOps', 'Model Evaluation', 'Robust Optimization', 'Explainable AI', 'Trustworthy AI'],
  },
];

type PortfolioProject = {
  id: string;
  title: string;
  organization?: string;
  state: string;
  summary: string;
  problem: string;
  contribution: string;
  result?: string;
  tech: string[];
};

const projects: PortfolioProject[] = [
  {
    id: '01',
    title: 'Building Intelligence from Satellite Imagery',
    organization: 'CRTS · ROYAL CENTER FOR REMOTE SENSING',
    state: 'Project details supplied',
    summary: 'A remote-sensing workflow for extracting building footprints from very-high-resolution orthophotos and estimating building height.',
    problem: 'Turning dense orthophoto imagery into useful building geometry and height estimates.',
    contribution: 'Worked on automated footprint extraction using YOLO and SAM 3, a Dagster pipeline with Docker services, and height estimation experiments with Depth Anything V2, DepthPro and HTC-DC Net.',
    result: 'Fine-tuned Depth Anything V2 achieved 0.967 m MAE on the test set.',
    tech: ['Python', 'PyTorch', 'YOLO', 'SAM 3', 'Docker', 'Dagster', 'QGIS'],
  },
  {
    id: '02',
    title: 'Multi-Teacher Knowledge Distillation for 3D Medical Segmentation',
    state: 'Ongoing research',
    summary: 'An ongoing research project exploring a lightweight student model distilled from multiple teachers for anatomical point-cloud segmentation.',
    problem: 'Exploring how knowledge from multiple teacher architectures can support semantic segmentation of medical 3D point clouds.',
    contribution: 'The current direction includes multi-teacher distillation, a lightweight student, and comparison using mIoU and Dice. This work is ongoing; no final outcome is claimed.',
    tech: ['PyTorch', 'Point Clouds', 'Knowledge Distillation', 'Medical AI'],
  },
  {
    id: '03',
    title: 'NIDS Validity Audit: Robust SVM and Certificates',
    state: 'Ongoing research',
    summary: 'An ongoing validity-focused investigation of intrusion-detection evaluation, robust SVMs and perturbation certificates.',
    problem: 'Checking how data leakage, duplicate records and labeling errors may affect evaluation.',
    contribution: 'The investigation includes chronological splits, robust SVM evaluation, margin certificates under L2 and L-infinity perturbations, and statistical validation.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Robust Optimization', 'CICIDS2017'],
  },
  {
    id: '04',
    title: 'Antibiotic Resistance Prediction and Forecasting',
    state: 'Project details supplied',
    summary: 'A machine-learning and MLOps project focused on antimicrobial resistance prediction and forecasting from multiple data sources.',
    problem: 'Supporting analysis of antibiotic resistance through prediction, forecasting and multi-source data ingestion.',
    contribution: 'Project scope includes machine-learning models and a complete MLOps pipeline. Specific outcomes are not stated in the supplied brief.',
    tech: ['Python', 'XGBoost', 'FastAPI', 'MLflow', 'Docker', 'Airflow', 'RAG'],
  },
  {
    id: '05',
    title: 'Swarm Robotics: Emergent Behavior',
    state: 'Project details supplied',
    summary: 'A decentralized BEECLUST implementation exploring multi-robot aggregation and emergent collective behaviour in TurtleBot3 simulation.',
    problem: 'Understanding how local, decentralized robot behaviour can lead to collective aggregation.',
    contribution: 'Implemented BEECLUST in simulation and included quantitative convergence analysis.',
    tech: ['ROS 2', 'Gazebo', 'Python', 'NumPy'],
  },
  {
    id: '06',
    title: 'Smart Health Watch — Pediatric AI',
    state: 'Concept / project details supplied',
    summary: 'A connected wearable concept for health-event monitoring, with an embedded TinyML direction.',
    problem: 'Exploring a wearable concept for pediatric health-event monitoring.',
    contribution: 'Project concept includes embedded machine learning and model deployment; no clinical results are claimed.',
    tech: ['ESP32-S3', 'CNN-LSTM', 'BiLSTM', 'TensorFlow Lite', 'Flutter', 'MQTT'],
  },
  {
    id: '07',
    title: '3D Classification: Graph CNN, Federated Learning and Distillation',
    state: 'Project details supplied',
    summary: 'A 3D point-cloud classification study spanning centralized and federated learning, non-IID data and knowledge distillation.',
    problem: 'Exploring classification when point-cloud data may be distributed across clients with non-identical distributions.',
    contribution: 'Scope includes Graph CNN models, FedAvg and knowledge distillation. No performance result is stated in the supplied brief.',
    tech: ['PyTorch', 'Graph CNN', 'FedAvg', 'CAP3D', 'ShapeNet'],
  },
  {
    id: '08',
    title: 'RAG Research Assistant',
    state: 'Project details supplied',
    summary: 'A conversational assistant for PDF ingestion, document question answering, hybrid and semantic retrieval, and inline citations.',
    problem: 'Making information in documents easier to find and verify through cited answers.',
    contribution: 'Built an intelligent PDF ingestion and question-answering workflow. Retrieval hit rate improved from 78% to 91%.',
    result: 'Retrieval hit rate: 78% → 91%.',
    tech: ['LangChain', 'OpenAI Embeddings', 'Streamlit'],
  },
  {
    id: '09',
    title: 'HCP Census Data Visualization',
    organization: 'HCP · REGIONAL DIRECTORATE',
    state: 'Internship project',
    summary: 'Interactive census data visualizations and dynamic dashboards for a data-analysis and web-application project.',
    problem: 'Presenting census information through accessible interactive visualizations.',
    contribution: 'Worked on data analysis, dynamic dashboards and web application development.',
    tech: ['Python', 'Django', 'Data Visualization'],
  },
];

const natureIdeas = [
  {
    title: 'Ant Colony Optimization',
    tag: 'TRAILS · FEEDBACK · ROUTES',
    body: 'Ants explore, leave pheromone traces and collectively reinforce promising routes. A simple local signal can shape a larger search.',
    inspiration: 'Distributed optimization, path discovery, resource allocation and smart transportation.',
  },
  {
    title: 'Evolutionary Computation',
    tag: 'SELECTION · VARIATION · SEARCH',
    body: 'Candidate solutions move through generations. Selection, crossover and mutation offer a way to explore many possible answers.',
    inspiration: 'Hyperparameter optimization, feature selection and model optimization.',
  },
  {
    title: 'Swarm Intelligence',
    tag: 'LOCAL RULES · COLLECTIVE MOTION',
    body: 'Many agents coordinate through local interactions, without relying on a single central controller.',
    inspiration: 'Multi-agent coordination, distributed decision-making and smart-city systems.',
  },
  {
    title: 'Adaptive Systems',
    tag: 'CHANGE · RESPONSE · LEARNING',
    body: 'Natural systems continually respond to changing conditions. That capacity to adapt is a compelling design question for intelligent systems.',
    inspiration: 'Adaptive learning, optimization under dynamic conditions and intelligent decision-making.',
  },
];

const skillGroups = [
  ['Programming', ['Python', 'C/C++', 'Java', 'R', 'SQL']],
  ['AI & Machine Learning', ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Hugging Face', 'XGBoost', 'ONNX']],
  ['AI Research', ['Knowledge Distillation', 'Federated Learning', 'Robust SVM', 'Computer Vision', 'NLP', 'LLMs']],
  ['Optimization & Nature-Inspired Computing', ['Ant Colony Optimization', 'Swarm Intelligence', 'Evolutionary Algorithms', 'Mathematical Optimization']],
  ['Robotics & 3D', ['ROS 2', 'Gazebo', '3D Vision', 'Point Clouds', 'Remote Sensing']],
  ['MLOps & Engineering', ['Docker', 'MLflow', 'DVC', 'Airflow', 'Dagster', 'FastAPI', 'Git']],
];

const timeline = [
  ['2022', 'Mathematical Foundations', 'Mathematical Sciences Baccalaureate with Highest Honors.'],
  ['2022–2024', 'Preparatory Classes', 'Mathematics and Physics, MP.'],
  ['2024–2027', 'ENSIAS', 'Engineering Degree in Artificial Intelligence.'],
  ['2025', 'HCP Internship', 'Data analysis and census visualization at the HCP Regional Directorate.'],
  ['2026', 'CRTS Internship', 'Remote sensing, computer vision and building height estimation.'],
  ['2026', 'Research & Engineering Projects', 'Medical AI, robust machine learning, multi-teacher distillation, swarm robotics and MLOps.'],
  ['2027', 'Next Destination', 'Seeking a 4–6 month Final Year Internship (PFE) starting February 2027, preferably in AI, Machine Learning, Deep Learning or AI Research.'],
];

const navItems = [
  ['About', '#about'],
  ['Research', '#research'],
  ['Projects', '#projects'],
  ['Nature', '#nature'],
  ['Skills', '#skills'],
  ['Journey', '#journey'],
];

function downloadCv() {
  const cv = `HAJAR EL HALLAGUE
AI Engineering Student | Machine Learning & Nature-Inspired Optimization Enthusiast
ENSIAS – National School of Computer Science and Systems Analysis, Morocco

PROFILE
Artificial Intelligence engineering student interested in machine learning, mathematical optimization, robotics, and nature-inspired intelligence.

OBJECTIVE
Seeking a 4–6 month Final Year Internship (PFE) starting February 2027, preferably in AI, Machine Learning, Deep Learning, or AI Research.

EDUCATION
2024–2027 — ENSIAS, Engineering Degree in Artificial Intelligence
2022–2024 — Preparatory Classes, Mathematics and Physics (MP)
2022 — Mathematical Sciences Baccalaureate with Highest Honors

EXPERIENCE & PROJECTS
2026 — CRTS, Royal Center for Remote Sensing: building footprint extraction from very-high-resolution orthophotos; YOLO, SAM 3, Dagster and Docker workflow; building height estimation using Depth Anything V2, DepthPro and HTC-DC Net. Fine-tuned Depth Anything V2 achieved 0.967 m MAE on the test set.
2025 — HCP Regional Directorate: data analysis and census visualization.
Multi-Teacher Knowledge Distillation for 3D Medical Segmentation — Ongoing research project.
NIDS Validity Audit: Robust SVM and Certificates — Ongoing research project.
Additional project work: antibiotic resistance prediction and forecasting; swarm robotics; pediatric AI wearable concept; 3D classification with federated learning and distillation; RAG research assistant (retrieval hit rate improved from 78% to 91%); HCP census data visualization.

RESEARCH INTERESTS
Machine Learning, Deep Learning, bio-inspired optimization, Ant Colony Optimization, swarm intelligence, evolutionary algorithms, multi-agent systems, computer vision, 3D vision, medical AI, LLMs, RAG, agentic AI, robust optimization, trustworthy AI, MLOps and intelligent systems.

TECHNICAL SKILLS
Programming: Python, C/C++, Java, R, SQL.
AI & ML: PyTorch, TensorFlow, Scikit-learn, Hugging Face, XGBoost, ONNX.
Research: Knowledge Distillation, Federated Learning, Robust SVM, Computer Vision, NLP, LLMs.
Optimization: Ant Colony Optimization, Swarm Intelligence, Evolutionary Algorithms, Mathematical Optimization.
Robotics & 3D: ROS 2, Gazebo, 3D Vision, Point Clouds, Remote Sensing.
Engineering: Docker, MLflow, DVC, Airflow, Dagster, FastAPI, Git.

COMMUNITY
Darlkhir — Core Development Team Member and Communications Lead.

CONTACT
Email: hajarelhallague@gmail.com
GitHub: https://github.com/HLG-1
`;
  const blob = new Blob([cv], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Hajar-El-Hallague-CV.txt';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function App() {
  const [selectedGalaxy, setSelectedGalaxy] = useState(1);
  const [selectedNature, setSelectedNature] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = 'Hajar EL HALLAGUE — AI, Optimization & Natural Intelligence';
    const description = 'An AI engineering student at ENSIAS exploring machine learning, mathematical optimization, robotics and intelligence inspired by nature.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = () => setMenuOpen(false);

  return (
    <main className="portfolio">
      <header className={`site-nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#top" className="brand-mark" data-testid="link-home" aria-label="Hajar EL HALLAGUE — home">
          <span className="brand-orbit" aria-hidden="true" />
          <span>HAJAR EL HALLAGUE</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</a>)}
          <a className="nav-contact" href="#contact" data-testid="link-nav-contact">Connect <MoveUpRight size={12} aria-hidden="true" /></a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>
      <nav className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {navItems.map(([label, href]) => <a key={href} href={href} onClick={handleNav} tabIndex={menuOpen ? 0 : -1} data-testid={`link-mobile-${label.toLowerCase()}`}>{label}</a>)}
        <a href="#contact" onClick={handleNav} tabIndex={menuOpen ? 0 : -1} data-testid="link-mobile-contact">Connect</a>
      </nav>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow">Curious mind · AI engineering · nature-inspired intelligence</div>
          <h1 id="hero-title">HELLO,<span>I’M HAJAR.</span></h1>
          <p className="hero-lede">An AI Engineer exploring the universe of intelligent systems.</p>
          <p className="hero-small">Between mathematics, machine learning, and the intelligence of nature, I explore ideas that transform complex challenges into intelligent solutions.</p>
          <div className="hero-actions">
            <a className="button primary" href="#about" data-testid="link-explore">Explore my universe <ArrowDownRight size={15} aria-hidden="true" /></a>
            <a className="button" href="#projects" data-testid="link-projects">View my projects <ArrowRight size={15} aria-hidden="true" /></a>
            <button className="button text-button" type="button" onClick={downloadCv} data-testid="button-download-cv"><Download size={14} aria-hidden="true" /> Download CV</button>
          </div>
        </div>
        <div className="hero-visual" aria-label="An abstract orbital map with a central star">
          <div className="stellar-map" aria-hidden="true">
            <div className="orbit" />
            <div className="orbit two" />
            <div className="orbit three" />
            <div className="star-core" />
            <i className="star-point p1" /><i className="star-point p2" /><i className="star-point p3" /><i className="star-point p4" />
            <span className="map-label label-top">A FIELD OF QUESTIONS</span>
            <span className="map-label label-right">ENSIAS · MOROCCO</span>
            <span className="map-label label-bottom">FOLLOW THE CURIOSITY</span>
          </div>
        </div>
        <a className="hero-scroll" href="#about" aria-label="Scroll to introduction" data-testid="link-scroll"><span /> Scroll to explore</a>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title">
        <div className="section-head">
          <div><div className="section-index">01 / The mind behind the star</div><h2 id="about-title">Curiosity is my<br />driving force.</h2></div>
          <p className="section-intro">An engineering education grounded in mathematics, and a persistent question: how does intelligence emerge?</p>
        </div>
        <div className="about-grid">
          <div className="about-quote"><span className="quote-mark" aria-hidden="true">“</span><p>Every star has its own light. Mine is curiosity.</p></div>
          <div className="about-copy">
            <p>I am Hajar, an Artificial Intelligence engineering student at <strong>ENSIAS</strong>, passionate about understanding and building intelligent systems.</p>
            <p>My interests lie at the intersection of machine learning, mathematical optimization, robotics, and nature-inspired intelligence.</p>
            <p>I am particularly fascinated by how biological systems solve complex problems through adaptation, cooperation, and collective behavior — and how these principles can inspire better computational algorithms.</p>
            <p>I believe that innovation begins when we look beyond conventional approaches.</p>
          </div>
        </div>
        <div className="pillars">
          <article className="pillar"><span className="number">01 — FOUNDATIONS</span><h3>Mathematical thinking</h3><p>Optimization, statistics, algorithms and problem-solving.</p></article>
          <article className="pillar"><span className="number">02 — SYSTEMS</span><h3>Intelligent systems</h3><p>Machine learning, deep learning, AI engineering and deployment.</p></article>
          <article className="pillar"><span className="number">03 — INSPIRATION</span><h3>Nature-inspired innovation</h3><p>Swarm intelligence, evolutionary computation, adaptation and collective behavior.</p></article>
        </div>
      </section>

      <section className="section research-section" id="research" aria-labelledby="research-title">
        <div className="section-head">
          <div><div className="section-index">02 / A map of open questions</div><h2 id="research-title">My research<br />galaxy.</h2></div>
          <p className="section-intro">Six connected directions. Select a star to move closer to a field of questions I want to explore.</p>
        </div>
        <div className="research-layout">
          <div className="galaxy-visual" aria-label="Interactive map of six connected research interests">
            <svg className="galaxy-lines" viewBox="0 0 100 100" aria-hidden="true">
              <line x1="50" y1="50" x2="50" y2="8" /><line x1="50" y1="50" x2="85" y2="28" />
              <line x1="50" y1="50" x2="86" y2="70" /><line x1="50" y1="50" x2="50" y2="92" />
              <line x1="50" y1="50" x2="14" y2="70" /><line x1="50" y1="50" x2="15" y2="28" />
              <line x1="50" y1="8" x2="85" y2="28" /><line x1="85" y1="28" x2="86" y2="70" />
              <line x1="86" y1="70" x2="50" y2="92" /><line x1="50" y1="92" x2="14" y2="70" />
              <line x1="14" y1="70" x2="15" y2="28" /><line x1="15" y1="28" x2="50" y2="8" />
            </svg>
            <div className="galaxy-center">QUESTIONS</div>
            {researchGalaxies.map((galaxy, index) => {
              const positions = [{ left: '50%', top: '7%' }, { left: '86%', top: '27%' }, { left: '87%', top: '72%' }, { left: '50%', top: '94%' }, { left: '13%', top: '72%' }, { left: '14%', top: '27%' }];
              return <button
                key={galaxy.name}
                className={`galaxy-node${selectedGalaxy === index ? ' active' : ''}`}
                style={positions[index]}
                onClick={() => setSelectedGalaxy(index)}
                aria-pressed={selectedGalaxy === index}
                data-testid={`button-galaxy-${index + 1}`}
              ><span className="node-dot" /><span>{galaxy.name}</span></button>;
            })}
          </div>
          <article className="galaxy-detail" aria-live="polite" key={selectedGalaxy}>
            <div className="detail-index">{researchGalaxies[selectedGalaxy].line}</div>
            <h3>{researchGalaxies[selectedGalaxy].name}</h3>
            <p>{researchGalaxies[selectedGalaxy].description}</p>
            <div className="interest-list">{researchGalaxies[selectedGalaxy].interests.map((interest) => <span key={interest}>{interest}</span>)}</div>
            <p className="research-note">These are areas of interest and exploration — not a claim of completed research in every topic.</p>
          </article>
        </div>
      </section>

      <section className="section projects-section" id="projects" aria-labelledby="projects-title">
        <div className="section-head">
          <div><div className="section-index">03 / Work among the stars</div><h2 id="projects-title">Project<br />constellations.</h2></div>
          <p className="section-intro">A collection of engineering and research work across vision, medical AI, robust learning, robotics and data.</p>
        </div>
        <div className="project-toolbar"><span className="project-count">09 projects · Detail first, claims carefully</span><a href="https://github.com/HLG-1" target="_blank" rel="noreferrer" className="github-note" data-testid="link-project-github">Explore GitHub <MoveUpRight size={12} aria-hidden="true" /></a></div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id} data-testid={`card-project-${project.id}`}>
              <div className="project-top"><span className="project-id">STAR {project.id}</span><span className={`project-state${project.state === 'Ongoing research' ? ' ongoing' : ''}`}>{project.state}</span></div>
              <h3>{project.title}</h3>
              {project.organization && <div className="project-org">{project.organization}</div>}
              <p className="project-summary">{project.summary}</p>
              {project.result && <p className="project-outcome">{project.result}</p>}
              <details>
                <summary>Read project notes</summary>
                <div className="project-detail">
                  <p><strong>Question:</strong> {project.problem}</p>
                  <p><strong>Scope & contribution:</strong> {project.contribution}</p>
                </div>
              </details>
              <div className="tech-list">{project.tech.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}</div>
              <div className="project-footer"><span>{project.id === '02' || project.id === '03' ? 'Research in progress' : 'Project record'}</span><span className="github-note">Repository link not supplied</span></div>
            </article>
          ))}
        </div>
        <p className="project-footnote">The supplied brief identifies projects 02 and 03 as ongoing research. Other entries are presented without assigning a completion status not provided in the source information. No project repository URLs were supplied.</p>
      </section>

      <section className="section nature-section" id="nature" aria-labelledby="nature-title">
        <div className="section-head">
          <div><div className="section-index">04 / A signature question</div><h2 id="nature-title">Nature has been<br />optimizing long before<br />we started coding.</h2></div>
          <p className="section-intro">A biological mechanism can be more than a metaphor. It can be a new way to ask a computational question.</p>
        </div>
        <p className="nature-callout">I am interested in translating the principles of nature into computational mechanisms capable of solving <em>complex real-world problems.</em></p>
        <div className="nature-explorer">
          <div className="nature-tabs" role="tablist" aria-label="Nature-inspired computational concepts">
            {natureIdeas.map((idea, index) => <button className={`nature-tab${selectedNature === index ? ' active' : ''}`} key={idea.title} role="tab" aria-selected={selectedNature === index} aria-controls="nature-panel" onClick={() => setSelectedNature(index)} data-testid={`tab-nature-${index + 1}`}><span className="tab-no">0{index + 1}</span>{idea.title}</button>)}
          </div>
          <div className="nature-display" role="tabpanel" id="nature-panel" aria-live="polite" key={selectedNature}>
            <div className="nature-art" aria-hidden="true"><span className="art-core" /><i className="art-particle" /><i className="art-particle" /><i className="art-particle" /><i className="art-particle" /></div>
            <div className="nature-copy">
              <div className="detail-index">{natureIdeas[selectedNature].tag}</div>
              <h3>{natureIdeas[selectedNature].title}</h3>
              <p>{natureIdeas[selectedNature].body}</p>
              <p className="inspiration"><span>Computational inspiration</span>{natureIdeas[selectedNature].inspiration}</p>
            </div>
          </div>
        </div>
        <p className="project-footnote">These visualizations illustrate ideas I am interested in; they do not imply that each mechanism has been implemented in my projects.</p>
      </section>

      <section className="section skills-section" id="skills" aria-labelledby="skills-title">
        <div className="section-head">
          <div><div className="section-index">05 / Tools & ways of thinking</div><h2 id="skills-title">Technical<br />constellation.</h2></div>
          <p className="section-intro">A practical toolkit connected by questions, not ranked by invented proficiency scores.</p>
        </div>
        <div className="skill-layout">
          <p className="skill-aside"><strong>Skills are not a scoreboard.</strong><br />This constellation reflects the languages, frameworks and methods that have shaped my studies and project work.</p>
          <div className="skill-clusters">{skillGroups.map(([group, skills]) => (
            <div className="skill-cluster" key={group as string}>
              <h3>{group as string}</h3>
              <div className="interest-list">{(skills as string[]).map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          ))}</div>
        </div>
      </section>

      <section className="section journey-section" id="journey" aria-labelledby="journey-title">
        <div className="section-head">
          <div><div className="section-index">06 / A path still unfolding</div><h2 id="journey-title">My journey.</h2></div>
          <p className="section-intro">A sequence of foundations, engineering practice and new research questions.</p>
        </div>
        <div className="timeline">{timeline.map(([date, title, description]) => <article className="timeline-item" key={`${date}-${title}`}><div className="timeline-date">{date}</div><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
      </section>

      <section className="section beyond-section" id="beyond" aria-labelledby="beyond-title">
        <div className="section-head">
          <div><div className="section-index">07 / Beyond code</div><h2 id="beyond-title">Good questions<br />travel widely.</h2></div>
          <p className="section-intro">The human side of technical work is made of curiosity, exchange and doing things together.</p>
        </div>
        <div className="beyond-grid">
          <div>
            <p className="beyond-copy">I am drawn to the living systems behind our ideas — and to the people who make difficult work collaborative.</p>
            <div className="interest-cloud">
              <span>Scientific research</span><span>Mathematics & complex problem-solving</span><span>Nature & biological intelligence</span><span>Robotics & autonomous systems</span><span>Emerging AI technologies</span><span>Collaborative engineering</span>
            </div>
          </div>
          <article className="darlinkhir"><div className="section-index">COMMUNITY / DARL KHIR</div><h3>Darlkhir</h3><p>Core Development Team Member and Communications Lead.</p></article>
        </div>
      </section>

      <section className="section contact-section" id="contact" aria-labelledby="contact-title">
        <div>
          <div className="contact-orbit" aria-hidden="true"><span className="contact-sun" /></div>
          <div className="section-index">08 / The next question is ours</div>
          <h2 id="contact-title">Every great discovery begins with a question.</h2>
          <p className="contact-lede">Interested in collaborating, exchanging ideas, discussing research, or building intelligent systems together? Let’s connect.</p>
          <div className="contact-links">
            <a className="button primary" href="mailto:hajarelhallague@gmail.com" data-testid="link-contact-email"><Mail size={15} aria-hidden="true" /> Contact me <MoveUpRight size={13} aria-hidden="true" /></a>
            <button className="button" type="button" onClick={downloadCv} data-testid="button-download-cv-footer"><Download size={14} aria-hidden="true" /> Download CV</button>
            <a className="button" href="https://github.com/HLG-1" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={15} aria-hidden="true" /> GitHub <MoveUpRight size={12} aria-hidden="true" /></a>
          </div>
          <a className="contact-email" href="mailto:hajarelhallague@gmail.com" data-testid="link-email-address">hajarelhallague@gmail.com</a>
          <p className="project-footnote">A LinkedIn profile URL was not included in the supplied information.</p>
          <p className="signature">Stay curious. Keep exploring. Keep creating.</p>
        </div>
      </section>
      <footer className="site-footer"><span>© HAJAR EL HALLAGUE · ENSIAS · MOROCCO</span><a href="#top" data-testid="link-back-top">Back to the beginning ↑</a></footer>
    </main>
  );
}

function Router() {
  return <RoutedErrorBoundary><Switch><Route path="/" component={App} /><Route component={NotFound} /></Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Root() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default Root;
