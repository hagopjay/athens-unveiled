import React, { useState, useRef, useEffect } from 'react';
import { 
  Info, ZoomIn, ZoomOut, Move, Eye, BookOpen, Users, Lightbulb, 
  Search, Play, History, Maximize2, Quote, Sparkles, Brain, MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { DeepAnalysisPanel } from '@/components/DeepAnalysisPanel';
import { HarmonicVisualizer } from '@/components/HarmonicVisualizer';

interface Figure {
  id: string;
  x: number;
  y: number;
  name: string;
  ancient: string;
  renaissance: string;
  lifespan: string;
  philosophy: string;
  symbolism: string;
  quotes: string[];
  color: string;
  category: 'idealist' | 'empiricist' | 'mathematician' | 'cynic' | 'astronomer' | 'artist';
}

const Index = () => {
  const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [tourStep, setTourStep] = useState(-1);
  const [showLabels, setShowLabels] = useState(true);
  const [showHarmonics, setShowHarmonics] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const figures: Figure[] = [
    {
      id: 'plato',
      x: 48, y: 35,
      name: 'Plato (Leonardo da Vinci)',
      ancient: 'Plato',
      renaissance: 'Leonardo da Vinci',
      lifespan: '428-348 BCE',
      philosophy: 'Founded the Academy in Athens. Argued that reality exists in perfect, eternal Forms—what we see are merely shadows of these ideal templates. Mathematics and philosophy lead us toward truth.',
      symbolism: 'Points upward to the realm of ideal Forms. Wears red and purple (divine, ecclesiastical colors). Holds Timaeus, his dialogue on cosmology. Central position reflects his pivotal role in Western thought.',
      quotes: [
        'The reality of the intelligible world is what we should strive to understand',
        'Those who contemplate the beauties of the earth find reserves of strength',
        'Philosophy begins in wonder'
      ],
      color: '#e74c3c',
      category: 'idealist'
    },
    {
      id: 'aristotle',
      x: 52, y: 35,
      name: 'Aristotle',
      ancient: 'Aristotle',
      renaissance: 'Giuliano da Sangallo (possibly)',
      lifespan: '384-322 BCE',
      philosophy: 'Student of Plato who rejected Forms for empirical study. Founded the Lyceum. Argued truth comes through observation, classification, and logical demonstration. Father of biology, physics, and ethics as disciplines.',
      symbolism: 'Hand extends toward earth, gesturing to the natural world. Wears blue and gold (worldly, material colors). Holds Ethics, his treatise on virtue. Paired with Plato to show the eternal dialectic between idealism and empiricism.',
      quotes: [
        'The one exclusive sign of thorough knowledge is the power of teaching',
        'All human actions have one or more of these seven causes: chance, nature, compulsion, habit, reason, passion, and desire',
        'We are what we repeatedly do'
      ],
      color: '#3498db',
      category: 'empiricist'
    },
    {
      id: 'pythagoras',
      x: 20, y: 65,
      name: 'Pythagoras (Luca Pacioli)',
      ancient: 'Pythagoras',
      renaissance: 'Luca Pacioli',
      lifespan: '570-495 BCE',
      philosophy: 'Discovered mathematical ratios in music, leading to the belief that number is the essence of reality. Founded a religious-philosophical community. All is number. Harmony of the spheres. Transmigration of souls.',
      symbolism: 'Demonstrates musical ratios on a slate, showing the mathematical foundation of harmony. Surrounded by eager students copying his teaching. Renaissance mathematician Pacioli taught Leonardo—knowledge passes across generations.',
      quotes: [
        'All is number',
        'There is geometry in the humming of the strings',
        'Number rules the universe'
      ],
      color: '#f39c12',
      category: 'mathematician'
    },
    {
      id: 'heraclitus',
      x: 35, y: 70,
      name: 'Heraclitus (Michelangelo)',
      ancient: 'Heraclitus',
      renaissance: 'Michelangelo Buonarroti',
      lifespan: '535-475 BCE',
      philosophy: 'The Weeping Philosopher. Reality is constant flux—"You cannot step in the same river twice." Opposites define each other. Logos (universal reason) governs all. Fire is the fundamental element.',
      symbolism: 'Sits alone in melancholic isolation, resting on a block of marble. Wears stone-mason boots. Added later as tribute to Michelangelo, who painted the Sistine Chapel ceiling overhead. Solitary genius apart from the community.',
      quotes: [
        'No man ever steps in the same river twice',
        'The way up and the way down are one and the same',
        'Character is destiny'
      ],
      color: '#9b59b6',
      category: 'idealist'
    },
    {
      id: 'euclid',
      x: 75, y: 70,
      name: 'Euclid (Bramante)',
      ancient: 'Euclid',
      renaissance: 'Donato Bramante',
      lifespan: '~300 BCE',
      philosophy: 'Father of geometry. Wrote Elements, one of the most influential works in mathematics. Proved theorems through logical deduction from axioms. Mathematical truth is eternal and certain.',
      symbolism: 'Bends with compass, demonstrating geometric proof to students. Active, engaged teaching contrasts with Pythagorean mysticism. Bramante designed St. Peter\'s Basilica—Renaissance geometry in action.',
      quotes: [
        'There is no royal road to geometry',
        'The laws of nature are but the mathematical thoughts of God',
        'What is proved about some is proved about all'
      ],
      color: '#16a085',
      category: 'mathematician'
    },
    {
      id: 'diogenes',
      x: 50, y: 55,
      name: 'Diogenes the Cynic',
      ancient: 'Diogenes',
      renaissance: 'Unknown',
      lifespan: '412-323 BCE',
      philosophy: 'Lived in a barrel, owned nothing, rejected all social conventions. Virtue is self-sufficiency. When Alexander the Great asked what he wanted, Diogenes replied: "Stand out of my sunlight."',
      symbolism: 'Lounges irreverently on the steps, disrupting the philosophical dignity around him. Only figure at rest amid intellectual labor. Embodies radical rejection of pretense. Diagonal pose breaks the architectural order.',
      quotes: [
        'I am a citizen of the world',
        'The foundation of every state is the education of its youth',
        'We have complicated every simple gift of the gods'
      ],
      color: '#95a5a6',
      category: 'cynic'
    },
    {
      id: 'hypatia',
      x: 25, y: 75,
      name: 'Hypatia (possibly)',
      ancient: 'Hypatia of Alexandria',
      renaissance: 'Unknown (allegorical figure)',
      lifespan: '~370-415 CE',
      philosophy: 'One of the few women philosophers of antiquity. Taught Neoplatonism and mathematics in Alexandria. Murdered by Christian mob for her pagan learning. Symbol of reason persecuted by fanaticism.',
      symbolism: 'Reclining figure in white. Her presence honors female intellectuals excluded from official philosophy. Raphael subtly includes what history tried to erase.',
      quotes: [
        'Reserve your right to think, for even to think wrongly is better than not to think at all',
        'Fables should be taught as fables, myths as myths, and miracles as poetic fantasies',
        'Life is an unfoldment, and the further we travel the more truth we can comprehend'
      ],
      color: '#e67e22',
      category: 'idealist'
    },
    {
      id: 'ptolemy',
      x: 80, y: 65,
      name: 'Ptolemy',
      ancient: 'Claudius Ptolemy',
      renaissance: 'Unknown',
      lifespan: '~100-170 CE',
      philosophy: 'Astronomer, geographer, mathematician. Created the geocentric model of the cosmos that lasted 1400 years. Geography mapped the known world. Attempted mathematical description of planetary motion.',
      symbolism: 'Holds celestial sphere with stars. Wears a crown—philosophy as universal knowledge, ruling the cosmos through understanding. Paired with Zoroaster holding terrestrial globe: heaven and earth.',
      quotes: [
        'I know that I am mortal and the creature of a day, but when I search out the massed wheeling circles of the stars, my feet no longer touch the earth',
        'Mathematics reveals its secrets only to those who approach it with pure love',
        'The earth remains fixed while the heavens revolve'
      ],
      color: '#27ae60',
      category: 'astronomer'
    },
    {
      id: 'raphael',
      x: 85, y: 68,
      name: 'Raphael (Self-Portrait)',
      ancient: 'N/A',
      renaissance: 'Raphael Sanzio',
      lifespan: '1483-1520',
      philosophy: 'The artist as philosopher. Painting makes ideas visible. Beauty educates the soul. Renaissance humanism—human achievement rivals divine creation.',
      symbolism: 'Looks directly at viewer, claiming membership in this tradition. We are heirs to Athens. The painter stands among philosophers, arguing art is wisdom made visible.',
      quotes: [
        'The world is a book, and those who do not travel read only one page',
        'I have learned much from my teachers, more from my books, but most from my mistakes',
        'There is always something left to love'
      ],
      color: '#34495e',
      category: 'artist'
    },
    {
      id: 'socrates',
      x: 30, y: 60,
      name: 'Socrates',
      ancient: 'Socrates',
      renaissance: 'Unknown',
      lifespan: '470-399 BCE',
      philosophy: 'Founded Western philosophy as dialectical inquiry. "Know thyself." The unexamined life is not worth living. Taught through questions, not answers. Executed by Athens for corrupting youth and impiety.',
      symbolism: 'Gestures in animated conversation, fingers counting arguments. Wears simple robes—philosophy is not wealth but wisdom. Face aged and weathered from a life of questioning.',
      quotes: [
        'The unexamined life is not worth living',
        'I know that I know nothing',
        'True wisdom comes to each of us when we realize how little we understand'
      ],
      color: '#c0392b',
      category: 'idealist'
    },
    {
      id: 'epicurus',
      x: 15, y: 55,
      name: 'Epicurus',
      ancient: 'Epicurus',
      renaissance: 'Unknown',
      lifespan: '341-270 BCE',
      philosophy: 'Pleasure is the highest good, but true pleasure is absence of pain and mental tranquility. Philosophy heals the soul. Gods exist but are indifferent. Death is nothing to fear—when we exist, death is not present.',
      symbolism: 'Crowned with vine leaves (pleasure, abundance). Absorbed in reading, seeking wisdom through texts. Contrast to Diogenes—sophisticated pleasure vs. cynical rejection.',
      quotes: [
        'Do not spoil what you have by desiring what you have not',
        'Death is nothing to us',
        'The art of living well and dying well are one'
      ],
      color: '#8e44ad',
      category: 'empiricist'
    },
    {
      id: 'zeno',
      x: 60, y: 50,
      name: 'Zeno of Citium',
      ancient: 'Zeno of Citium',
      renaissance: 'Unknown',
      lifespan: '334-262 BCE',
      philosophy: 'Founded Stoicism. Virtue is the only good. Live according to nature and reason. Control what you can control, accept what you cannot. Endure suffering with dignity.',
      symbolism: 'Stands in discussion with others, embodying the Stoic ideal of engaged citizenship. Philosophy is not withdrawal but ethical action in the world.',
      quotes: [
        'Man conquers the world by conquering himself',
        'Wellbeing is attained by little and little',
        'The goal of life is living in agreement with nature'
      ],
      color: '#2c3e50',
      category: 'empiricist'
    }
  ];

  const philosophicalThemes = [
    {
      title: 'The Central Dialectic: Idealism vs. Empiricism',
      description: 'Plato and Aristotle represent the fundamental tension in Western thought. Are we primarily rational beings accessing truth through pure thought (Plato), or embodied creatures learning through observation (Aristotle)? This debate structures science, mathematics, ethics, and politics even today. Every philosopher in this painting can be positioned on this spectrum.',
      connections: ['plato', 'aristotle', 'pythagoras', 'euclid'],
      deepDive: 'Plato believed in eternal, perfect Forms—the ideal Circle, the Good, Justice itself—existing in a realm beyond physical reality. What we see are imperfect copies. Aristotle rejected this, insisting forms exist within things, not separately. He collected specimens, dissected animals, studied politics empirically. The conflict between mathematics (Platonic, eternal) and experimental science (Aristotelian, observational) continues in physics today.'
    },
    {
      title: 'Mathematical Mysticism: Number as Reality',
      description: 'Pythagoras discovered that musical harmony follows mathematical ratios—the octave is 2:1, the fifth is 3:2. This led him to believe reality itself is fundamentally numerical. Plato inherited this, seeing mathematics as the path to eternal truth. Euclid proved it through geometry. The painting itself embodies these proportions—golden ratio, perfect perspective, harmonic composition.',
      connections: ['pythagoras', 'plato', 'euclid', 'ptolemy'],
      deepDive: 'When Pythagoras discovered the mathematical ratios in music, it was a mystical revelation: the abstract world of number governs the physical world of sound. This suggested everything—motion, light, even ethics—might follow mathematical law. Einstein would later say "God is a mathematician," proving Pythagoras right. The architecture Raphael painted uses these same proportions, making the painting a philosophical argument about mathematical beauty.'
    },
    {
      title: 'Solitary Genius vs. Collaborative Community',
      description: 'Most figures engage in animated dialogue—philosophy as conversation, knowledge as collective enterprise. But Heraclitus sits alone in melancholic isolation, and Diogenes sprawls apart from the group. This represents a truth about creativity: some insights require withdrawal from society, solitary struggle with darkness, rather than harmonious academic discussion.',
      connections: ['heraclitus', 'diogenes', 'socrates'],
      deepDive: 'Heraclitus was called the Weeping Philosopher. He believed most humans live in ignorance, asleep to the Logos that governs reality. His isolation in the painting reflects his contempt for the crowd. Diogenes took this further—complete rejection of social norms. Yet Socrates shows a third path: engagement with the city through dialectic, even unto death. The painting asks: Does wisdom require withdrawal or engagement?'
    },
    {
      title: 'The Cosmos: Heaven and Earth United',
      description: 'The left side emphasizes mystical, mathematical idealism (Pythagoras, Plato) while the right side shows empirical demonstration and measurement (Ptolemy, Euclid). But these sides intermingle, suggesting both approaches are necessary. The architecture itself represents cosmic order—the barrel vaults as heavenly spheres, the floor as earthly plane.',
      connections: ['ptolemy', 'euclid', 'pythagoras', 'plato'],
      deepDive: 'Ptolemy holds the celestial sphere, mapping the stars. Euclid bends to measure the earth. Together they represent the Renaissance ambition to understand both heaven and earth through mathematics. The impossible architecture Raphael painted—it cannot be built in physical reality—is itself a Platonic Form, an ideal that exists only in thought and art. The building is a philosophical argument made visible.'
    },
    {
      title: 'Time Collapsed: An Eternal Conversation',
      description: 'Figures from across 1000 years of history stand together simultaneously. Hypatia lived 700 years after Plato, Ptolemy 500 years after Aristotle. Renaissance faces merge with ancient bodies. This argues that philosophical truth transcends time, that ideas communicate across centuries, that the conversation is eternal. We are still participants.',
      connections: ['plato', 'aristotle', 'ptolemy', 'hypatia', 'raphael'],
      deepDive: 'By painting ancient philosophers with Renaissance faces, Raphael makes a radical claim: we are them. Philosophy is not dead history but living dialogue. When you read Plato, he speaks to you directly, across 2400 years. The central vanishing point between Plato and Aristotle extends infinitely—truth recedes as we approach, always beyond us, yet we must pursue it. The stairs we climb have no summit in view.'
    }
  ];

  const compositionalInsights = [
    {
      title: 'The Impossible Architecture',
      description: 'The building Raphael painted cannot actually be built—the proportions and perspective create architectural impossibilities. This is philosophically perfect: the architecture is itself a Platonic Form, an ideal that exists only in the realm of ideas and art, not in matter. The perfection we see is mathematical, not physical.',
      highlight: { x: 30, y: 10, w: 40, h: 25 },
      technical: 'Notice how the barrel vaults recede to impossible depths, the coffers are proportioned incorrectly for real architecture, and the floor tiles create a perspective that would require the building to curve. Raphael deliberately created visual harmony over architectural possibility.'
    },
    {
      title: 'The Divine Vanishing Point',
      description: 'All perspective lines converge precisely between Plato and Aristotle\'s heads, in the distant sky opening. The ultimate truth remains beyond human grasp, infinitely receding. The geometric center stays open, unreachable. This is Renaissance one-point perspective as metaphysics.',
      highlight: { x: 48, y: 25, w: 4, h: 4 },
      technical: 'Every architectural element—floor tiles, coffers, arches—directs the eye to this single point. Raphael has made truth itself the organizing principle of the composition. Our eyes are drawn upward and backward, suggesting philosophy\'s vertical and historical dimensions.'
    },
    {
      title: 'The Ascending Staircase',
      description: 'The massive staircase represents the journey of education. Students sit at the bottom in shadow, masters stride at the top in light, but even they have not reached the ultimate summit. The stairs continue upward beyond the frame, suggesting infinite progress toward wisdom.',
      highlight: { x: 10, y: 50, w: 80, h: 30 },
      technical: 'The stairs create three planes: foreground (students learning), middle ground (active philosophers), background (Plato and Aristotle as summit). Yet the architecture continues upward beyond them—no one has arrived at final truth. Education is ascent, always unfinished.'
    },
    {
      title: 'The Empty Niches',
      description: 'The architectural niches that would typically hold statues of gods are conspicuously empty. Philosophy has displaced mythology—reason, not revelation. But the absences also suggest limits: something beyond reason remains. These voids are filled by the divine presence in the facing fresco across the room (Disputation of the Holy Sacrament).',
      highlight: { x: 15, y: 15, w: 10, h: 20 },
      technical: 'In ancient architecture, such niches would display gods. Their emptiness here signals the secular nature of philosophy—human reason needs no divine statues. Yet the fresco directly across the Stanza della Segnatura shows Christian theology, suggesting philosophy and faith as complementary, not contradictory.'
    },
    {
      title: 'Light as Intellectual Illumination',
      description: 'The brightest light comes from the distant sky—ultimate truth, unreachable but illuminating everything. Foreground figures seem to generate their own inner light, as if internally illuminated by wisdom. The golden architecture glows with the light of rational understanding. Shadow represents ignorance.',
      highlight: { x: 40, y: 15, w: 20, h: 30 },
      technical: 'Raphael uses chiaroscuro (light-dark contrast) to create intellectual hierarchy. Central figures are brightest, peripheral figures in shadow. This isn\'t just visual drama—it\'s epistemological. Those closest to truth glow, those distant remain in darkness. We climb toward light.'
    },
    {
      title: 'Symmetry and Balance',
      description: 'The composition is rigorously symmetrical—Plato and Aristotle at center, figures balanced left and right. This symmetry suggests philosophical equilibrium: opposing views held in tension, neither vanquishing the other. Truth requires both idealism and empiricism, both mathematics and observation.',
      highlight: { x: 20, y: 30, w: 60, h: 50 },
      technical: 'Count the figures on each side of the central axis—Raphael ensures balance. The left side emphasizes abstract thought (Pythagoras, Socrates), the right side empirical study (Euclid, Ptolemy). But figures intermingle, suggesting synthesis. The central pair literally embody this dialectic made visible.'
    }
  ];

  const symbolismLayers = [
    {
      title: 'Color as Philosophical Argument',
      description: 'Plato wears red and purple (spiritual, divine, ecclesiastical colors—the same colors as cardinals) while Aristotle wears blue and gold (worldly, empirical, material colors). Yet both share blue, suggesting common ground. Colors throughout the painting create philosophical groupings—not just decoration but meaning.',
      visual: 'colors',
      analysis: 'Renaissance color theory assigned meanings: red=divine love, blue=truth, gold=divine light, green=hope, purple=royalty/theology. Raphael uses this symbolic vocabulary to make philosophical arguments through costume. Notice how mystical philosophers wear warmer, spiritual colors while empiricists wear cooler, earthly tones.'
    },
    {
      title: 'Gesture as Dialectic',
      description: 'Every gesture makes a philosophical point. Plato points up (like John the Baptist pointing to God), Aristotle gestures outward (demonstrating what is present), Pythagoras hunches over texts (received wisdom), Euclid demonstrates with compass (empirical proof). Bodies speak philosophy.',
      visual: 'gestures',
      analysis: 'Renaissance painters used a vocabulary of gestures called "chironomia." Pointing finger=teaching/revelation, open palm=generosity/truth-sharing, counting fingers=logical argument, hand over heart=sincerity. Each gesture here is rhetorically precise, an argument made without words.'
    },
    {
      title: 'Books and Scrolls: Written Knowledge',
      description: 'Plato holds Timaeus (cosmology), Aristotle holds Ethics (human action). Some philosophers carry books, others scrolls. Books represent fixed, transmitted knowledge; animated gestures represent active, living thought. The painting asks: Is philosophy in texts or in minds?',
      visual: 'texts',
      analysis: 'The transition from scroll to codex (bound book) represents a shift from ancient to medieval knowledge. Raphael shows both, collapsing this historical change. Some figures write, some read, some ignore texts entirely. This variety suggests different epistemologies—knowledge as preservation, discovery, or lived wisdom.'
    },
    {
      title: 'Architectural Symbolism: The Temple of Wisdom',
      description: 'The barrel-vaulted ceiling represents the cosmos—Renaissance churches used this form to symbolize heaven. The coffered ceiling creates geometric perfection. The open sky in the distance suggests the infinite. The floor\'s checkerboard pattern represents earthly, material existence. We stand between earth and heaven.',
      visual: 'architecture',
      analysis: 'The architectural style deliberately evokes Bramante\'s design for St. Peter\'s Basilica, being built during Raphael\'s work. This suggests philosophy as sacred—the temple is not to gods but to human reason. The classical style (Roman arches, Corinthian columns) argues Renaissance as rebirth of ancient wisdom.'
    },
    {
      title: 'Portraits as Temporal Collapse',
      description: 'Ancient philosophers wear Renaissance faces. Heraclitus is Michelangelo, Euclid is Bramante, Plato is Leonardo. This temporal collapse argues philosophy transcends its moment. Ideas are eternal, even as bodies decay. We are inheritors and participants in a conversation that spans millennia.',
      visual: 'portraits',
      analysis: 'By painting his contemporaries as ancient philosophers, Raphael makes several claims: (1) Renaissance genius equals ancient achievement, (2) philosophical questions remain constant across time, (3) we are always already in dialogue with the past. His self-portrait looking at the viewer invites us into this eternal colloquium.'
    },
    {
      title: 'The Central Void: The Unknowable',
      description: 'The brightest, most important space in the painting is empty—the bright sky between Plato and Aristotle. Ultimate truth is not depicted, only indicated by absence and light. This emptiness is crucial: philosophy acknowledges what exceeds human grasp. The center cannot hold—it must remain open.',
      visual: 'void',
      analysis: 'Negative space as philosophical statement. What is most important cannot be painted—like the Tao that cannot be named, or the God that cannot be imaged. The convergence of all perspective lines on this empty sky makes absence itself the organizing principle. Truth is approached but never possessed.'
    }
  ];

  const tourSteps = [
    { id: 'plato', title: 'Begin with Plato', description: 'Our journey starts at the center, with the philosopher who defined Western thought for two millennia.' },
    { id: 'aristotle', title: 'Aristotle\'s Response', description: 'Plato\'s greatest student became his most profound critic, turning philosophy toward observation and science.' },
    { id: 'pythagoras', title: 'Mathematical Foundations', description: 'Pythagoras discovered that reality follows mathematical law—the origin of Western science.' },
    { id: 'heraclitus', title: 'The Solitary Genius', description: 'Not all wisdom comes from dialogue. Some truths require melancholy withdrawal.' },
    { id: 'socrates', title: 'The Dialectician', description: 'The founder of philosophy as questioning rather than answering.' },
    { id: 'diogenes', title: 'Radical Rejection', description: 'Diogenes rejected all social conventions, living his philosophy with shocking directness.' },
    { id: 'euclid', title: 'Geometric Proof', description: 'Euclid shows how certainty is possible through logical demonstration.' },
    { id: 'ptolemy', title: 'Mapping the Cosmos', description: 'Ptolemy attempted to mathematize the heavens—the beginning of astronomy as science.' },
    { id: 'raphael', title: 'The Artist as Philosopher', description: 'Raphael signs this work by including himself, arguing that painters participate in wisdom.' }
  ];

  useEffect(() => {
    drawCanvas();
  }, [zoom, pan, selectedFigure, mode, showLabels]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = '#F5F1E8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);
    
    drawArchitecture(ctx);
    drawFigures(ctx);
    drawOverlays(ctx);
    
    ctx.restore();
  };

  const drawArchitecture = (ctx: CanvasRenderingContext2D) => {
    const w = 1000, h = 700;
    
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(w/2, 0, w/2, h*0.4);
    skyGradient.addColorStop(0, '#87CEEB');
    skyGradient.addColorStop(1, '#F5DEB3');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(w*0.35, h*0.08, w*0.3, h*0.25);
    
    // Architecture strokes
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 4;
    
    // Main barrel vaults
    ctx.beginPath();
    ctx.moveTo(w*0.15, h*0.15);
    ctx.lineTo(w*0.15, h*0.45);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(w*0.85, h*0.15);
    ctx.lineTo(w*0.85, h*0.45);
    ctx.stroke();
    
    // Central arch
    ctx.beginPath();
    ctx.arc(w*0.5, h*0.45, w*0.35, Math.PI, 0, true);
    ctx.stroke();
    
    // Inner arches
    for (let i = 0; i < 3; i++) {
      ctx.globalAlpha = 0.6 - i * 0.15;
      ctx.beginPath();
      ctx.arc(w*0.5, h*0.4, w*0.25 - i*w*0.05, Math.PI, 0, true);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    
    // Floor perspective grid
    ctx.strokeStyle = '#C8B497';
    ctx.lineWidth = 2;
    
    // Horizontal floor lines
    for (let i = 0; i < 12; i++) {
      const y = h*0.45 + (i * h*0.05);
      const width = 1 - (i * 0.06);
      ctx.beginPath();
      ctx.moveTo(w*(0.5 - width*0.4), y);
      ctx.lineTo(w*(0.5 + width*0.4), y);
      ctx.stroke();
    }
    
    // Vertical perspective lines converging to center
    for (let i = -8; i <= 8; i++) {
      const x = w*0.5 + (i * w*0.05);
      ctx.beginPath();
      ctx.moveTo(x, h*0.45);
      ctx.lineTo(w*0.5, h*0.28);
      ctx.stroke();
    }
    
    // Steps
    ctx.fillStyle = '#B8956A';
    for (let i = 0; i < 6; i++) {
      const stepY = h*0.55 + (i * h*0.07);
      const stepWidth = 0.75 - (i * 0.02);
      ctx.fillRect(w*(0.5 - stepWidth*0.5), stepY, w*stepWidth, h*0.035);
    }
    
    // Columns
    ctx.fillStyle = '#D4A574';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    [[0.2, 0.2], [0.8, 0.2], [0.3, 0.3], [0.7, 0.3]].forEach(([x, y]) => {
      ctx.fillRect(w*x - 8, h*y, 16, h*0.25);
    });
    ctx.shadowBlur = 0;
  };

  const drawFigures = (ctx: CanvasRenderingContext2D) => {
    const w = 1000, h = 700;
    
    figures.forEach(figure => {
      const fx = (figure.x / 100) * w;
      const fy = (figure.y / 100) * h;
      
      const isSelected = selectedFigure?.id === figure.id;
      const isTourActive = tourStep >= 0 && tourSteps[tourStep]?.id === figure.id;
      const radius = isSelected || isTourActive ? 24 : 18;
      
      // Glow effect
      if (isSelected || isTourActive) {
        ctx.shadowColor = figure.color;
        ctx.shadowBlur = 30;
      }
      
      // Figure circle with gradient
      const gradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, radius);
      gradient.addColorStop(0, figure.color);
      gradient.addColorStop(1, adjustBrightness(figure.color, -20));
      ctx.fillStyle = gradient;
      
      ctx.beginPath();
      ctx.arc(fx, fy, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Ring for selected
      if (isSelected || isTourActive) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      
      ctx.shadowBlur = 0;
      
      // Labels
      if (showLabels && (zoom > 0.7 || isSelected)) {
        ctx.fillStyle = '#3E2723';
        ctx.font = isSelected ? 'bold 16px serif' : '13px serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 4;
        ctx.fillText(figure.ancient, fx, fy + radius + 22);
        ctx.shadowBlur = 0;
      }
      
      // Connection lines in philosophy mode
      if (mode === 'philosophy' && selectedFigure) {
        const theme = philosophicalThemes.find(t => 
          t.connections.includes(figure.id) && t.connections.includes(selectedFigure.id)
        );
        if (theme) {
          const sx = (selectedFigure.x / 100) * w;
          const sy = (selectedFigure.y / 100) * h;
          
          const gradient = ctx.createLinearGradient(sx, sy, fx, fy);
          gradient.addColorStop(0, selectedFigure.color);
          gradient.addColorStop(1, figure.color);
          
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 0.6;
          ctx.lineWidth = 4;
          ctx.setLineDash([10, 5]);
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(fx, fy);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      }
    });
  };

  const drawOverlays = (ctx: CanvasRenderingContext2D) => {
    if (mode === 'composition') {
      compositionalInsights.forEach(insight => {
        if (insight.highlight) {
          const w = 1000, h = 700;
          const hx = (insight.highlight.x / 100) * w;
          const hy = (insight.highlight.y / 100) * h;
          const hw = (insight.highlight.w / 100) * w;
          const hh = (insight.highlight.h / 100) * h;
          
          ctx.strokeStyle = '#DAA520';
          ctx.lineWidth = 3;
          ctx.globalAlpha = 0.7;
          ctx.setLineDash([8, 4]);
          ctx.strokeRect(hx, hy, hw, hh);
          ctx.setLineDash([]);
          ctx.globalAlpha = 1;
        }
      });
    }
  };

  const adjustBrightness = (color: string, amount: number) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
    return `rgb(${r},${g},${b})`;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    
    const w = 1000, h = 700;
    const clicked = figures.find(figure => {
      const fx = (figure.x / 100) * w;
      const fy = (figure.y / 100) * h;
      const dist = Math.sqrt((x - fx) ** 2 + (y - fy) ** 2);
      return dist < 25;
    });
    
    setSelectedFigure(clicked || null);
    if (clicked) setTourStep(-1);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const startTour = () => {
    setTourStep(0);
    const firstFigure = figures.find(f => f.id === tourSteps[0].id);
    setSelectedFigure(firstFigure || null);
    setMode('explore');
  };

  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      const nextStep = tourStep + 1;
      setTourStep(nextStep);
      const nextFigure = figures.find(f => f.id === tourSteps[nextStep].id);
      setSelectedFigure(nextFigure || null);
    } else {
      setTourStep(-1);
    }
  };

  const filteredFigures = figures.filter(f => 
    f.ancient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.philosophy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-marble">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2 font-serif">
                The School of Athens
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                An Interactive Journey Through Western Philosophy's Hidden Architecture
              </p>
            </div>
            <Button 
              onClick={startTour}
              className="bg-gradient-gold hover:opacity-90 transition-all"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Guided Tour
            </Button>
          </div>
          
          <div className="flex gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search philosophers, ideas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showLabels ? "default" : "outline"}
                onClick={() => setShowLabels(!showLabels)}
                size="sm"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Labels
              </Button>
              <Button
                variant={showHarmonics ? "default" : "outline"}
                onClick={() => setShowHarmonics(!showHarmonics)}
                size="sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Harmonics
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-180px)]">
        {/* Canvas Section */}
        <div className="flex-1 relative bg-muted/30">
          <canvas
            ref={canvasRef}
            width={1000}
            height={700}
            className="w-full h-full cursor-move"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          
          {/* Controls */}
          <div className="absolute top-4 right-4 bg-card/95 backdrop-blur rounded-lg p-2 shadow-medium space-y-2">
            <Button
              onClick={() => setZoom(Math.min(zoom + 0.2, 3))}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <Move className="w-5 h-5" />
            </Button>
            <Separator />
            <Button
              onClick={() => setZoom(2)}
              variant="ghost"
              size="sm"
              className="w-full"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Mode Selector */}
          <div className="absolute top-4 left-4 bg-card/95 backdrop-blur rounded-lg shadow-medium overflow-hidden">
          <div className="p-2 space-y-1">
              <Button
                onClick={() => setMode('explore')}
                variant={mode === 'explore' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Eye className="w-4 h-4 mr-2" />
                Explore
              </Button>
              <Button
                onClick={() => setMode('philosophy')}
                variant={mode === 'philosophy' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Brain className="w-4 h-4 mr-2" />
                Philosophy
              </Button>
              <Button
                onClick={() => setMode('composition')}
                variant={mode === 'composition' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Composition
              </Button>
              <Button
                onClick={() => setMode('symbolism')}
                variant={mode === 'symbolism' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Users className="w-4 h-4 mr-2" />
                Symbolism
              </Button>
              <Button
                onClick={() => setMode('deep')}
                variant={mode === 'deep' ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Deep Analysis
              </Button>
            </div>
          </div>

          {/* Tour Progress */}
          {tourStep >= 0 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card/95 backdrop-blur rounded-lg p-4 shadow-strong max-w-md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge className="mb-2">Step {tourStep + 1} of {tourSteps.length}</Badge>
                  <h3 className="font-bold text-lg">{tourSteps[tourStep].title}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTourStep(-1)}
                >
                  ×
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {tourSteps[tourStep].description}
              </p>
              <Button onClick={nextTourStep} className="w-full">
                {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish Tour'}
              </Button>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="w-[500px] bg-card border-l border-border">
          <ScrollArea className="h-full">
            <div className="p-6">
              <Tabs value={mode} onValueChange={setMode} className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="explore">
                    <Eye className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="philosophy">
                    <Brain className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="composition">
                    <BookOpen className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="symbolism">
                    <Lightbulb className="w-4 h-4" />
                  </TabsTrigger>
                  <TabsTrigger value="deep">
                    <Sparkles className="w-4 h-4" />
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="explore" className="space-y-4">
                  {selectedFigure ? (
                    <div className="animate-fade-in space-y-6">
                      <div className="text-center">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto mb-4 shadow-glow"
                          style={{ backgroundColor: selectedFigure.color }}
                        />
                        <h2 className="text-2xl font-bold mb-1 font-serif">
                          {selectedFigure.ancient}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-1">
                          {selectedFigure.lifespan}
                        </p>
                        <Badge variant="outline" className="mb-4">
                          {selectedFigure.category}
                        </Badge>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Brain className="w-4 h-4 text-fresco-azure" />
                            Philosophy
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{selectedFigure.philosophy}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-fresco-gold" />
                            Symbolism in the Painting
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{selectedFigure.symbolism}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Quote className="w-4 h-4 text-fresco-terracotta" />
                            Renaissance Model
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium">{selectedFigure.renaissance}</p>
                        </CardContent>
                      </Card>

                      {selectedFigure.quotes.length > 0 && (
                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-sm">Notable Quotes</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {selectedFigure.quotes.map((quote, idx) => (
                              <div key={idx} className="italic text-sm border-l-2 border-primary pl-3">
                                "{quote}"
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ) : (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Info className="w-5 h-5 text-fresco-azure" />
                          Getting Started
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm leading-relaxed">
                          Click on any colored circle to explore that philosopher. Each figure represents 
                          both an ancient thinker and often their Renaissance counterpart, suggesting that 
                          philosophical inquiry transcends time.
                        </p>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Categories:</h4>
                          <div className="space-y-2">
                            {['idealist', 'empiricist', 'mathematician', 'cynic', 'astronomer', 'artist'].map(cat => (
                              <div key={cat} className="flex items-center gap-2 text-sm">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ 
                                    backgroundColor: figures.find(f => f.category === cat)?.color 
                                  }}
                                />
                                <span className="capitalize">{cat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {searchQuery && (
                          <>
                            <Separator />
                            <div>
                              <h4 className="font-semibold mb-2 text-sm">
                                Search Results ({filteredFigures.length})
                              </h4>
                              <div className="space-y-2">
                                {filteredFigures.map(fig => (
                                  <Button
                                    key={fig.id}
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start"
                                    onClick={() => setSelectedFigure(fig)}
                                  >
                                    <div 
                                      className="w-3 h-3 rounded-full mr-2" 
                                      style={{ backgroundColor: fig.color }}
                                    />
                                    {fig.ancient}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="philosophy" className="space-y-4">
                  {philosophicalThemes.map((theme, idx) => (
                    <Card key={idx} className="animate-fade-in">
                      <CardHeader>
                        <CardTitle className="text-base font-serif">{theme.title}</CardTitle>
                        <CardDescription>{theme.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {theme.deepDive}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {theme.connections.map(id => {
                            const fig = figures.find(f => f.id === id);
                            return fig ? (
                              <Badge 
                                key={id}
                                variant="outline"
                                className="cursor-pointer hover:bg-accent"
                                onClick={() => setSelectedFigure(fig)}
                              >
                                <div 
                                  className="w-2 h-2 rounded-full mr-2" 
                                  style={{ backgroundColor: fig.color }}
                                />
                                {fig.ancient}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="composition" className="space-y-4">
                  {compositionalInsights.map((insight, idx) => (
                    <Card key={idx} className="animate-fade-in">
                      <CardHeader>
                        <CardTitle className="text-base font-serif">{insight.title}</CardTitle>
                        <CardDescription>{insight.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {insight.technical}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="symbolism" className="space-y-4">
                  {symbolismLayers.map((layer, idx) => (
                    <Card key={idx} className="animate-fade-in">
                      <CardHeader>
                        <CardTitle className="text-base font-serif">{layer.title}</CardTitle>
                        <CardDescription>{layer.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {layer.analysis}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <HarmonicVisualizer isActive={showHarmonics} />
                </TabsContent>

                <TabsContent value="deep" className="space-y-4">
                  <DeepAnalysisPanel />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Index;
