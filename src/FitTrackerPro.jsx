import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  ChevronLeft,
  ChevronRight,
  Home,
  Dumbbell,
  TrendingUp,
  Calendar,
  Volume2,
  VolumeX,
  Sun,
  Moon
} from 'lucide-react';

// CSS Styles
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --success: #059669;
    --warning: #d97706;
    --danger: #dc2626;
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
    --border-radius: 0.75rem;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
  }

  .app {
    min-height: 100vh;
    background: var(--gray-50);
    transition: all 0.3s ease;
  }

  .app.dark {
    background: var(--gray-900);
    color: white;
  }

  .app.dark .card {
    background: var(--gray-800);
    border-color: var(--gray-700);
  }

  .app.dark .btn-secondary {
    background: var(--gray-700);
  }

  .app.dark .exercise-stat {
    background: var(--gray-700);
  }

  /* Header */
  .header {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .app.dark .header {
    background: var(--gray-800);
    border-bottom-color: var(--gray-700);
  }

  .header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
  }

  .header-controls {
    display: flex;
    gap: 0.5rem;
  }

  /* Navigation */
  .nav {
    background: white;
    border-bottom: 1px solid var(--gray-200);
    padding: 0.5rem 0;
  }

  .app.dark .nav {
    background: var(--gray-800);
    border-bottom-color: var(--gray-700);
  }

  .nav-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .nav-tabs {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
  }

  .nav-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: var(--border-radius);
    transition: all 0.2s ease;
    white-space: nowrap;
    color: var(--gray-600);
  }

  .app.dark .nav-tab {
    color: #9ca3af;
  }

  .nav-tab.active {
    background: var(--primary);
    color: white;
  }

  .nav-tab:hover:not(.active) {
    background: var(--gray-100);
  }

  .app.dark .nav-tab:hover:not(.active) {
    background: var(--gray-700);
  }

  /* Main Content */
  .main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  .card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--shadow);
  }

  /* Dashboard */
  .welcome-section {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 2rem;
  }

  .welcome-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .schedule-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .workout-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .workout-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .workout-card.day-a::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--primary);
  }

  .workout-card.day-b::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--danger);
  }

  .workout-card.day-c::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--success);
  }

  .workout-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .workout-subtitle {
    color: var(--gray-600);
    margin-bottom: 1rem;
  }

  .workout-action {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Exercise View */
  .exercise-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .exercise-title {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .exercise-progress {
    color: var(--gray-600);
    margin-bottom: 1rem;
  }

  .exercise-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .exercise-stat {
    background: var(--gray-50);
    padding: 1rem;
    border-radius: var(--border-radius);
    text-align: center;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--primary);
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--gray-600);
    margin-top: 0.25rem;
  }

  /* Exercise Illustration */
  .exercise-visual {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
    align-items: start;
  }

  .exercise-diagram {
    background: var(--gray-100);
    border-radius: var(--border-radius);
    padding: 1rem;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app.dark .exercise-diagram {
    background: var(--gray-700);
  }

  .exercise-instructions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .instruction-step {
    background: var(--gray-50);
    padding: 1rem;
    border-radius: var(--border-radius);
    border-left: 4px solid var(--primary);
  }

  .app.dark .instruction-step {
    background: var(--gray-700);
  }

  .step-title {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  /* Tips */
  .tips-section {
    background: #fef3c7;
    border: 1px solid #fbbf24;
    border-radius: var(--border-radius);
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .app.dark .tips-section {
    background: rgba(251, 191, 36, 0.1);
    border-color: rgba(251, 191, 36, 0.3);
  }

  .tips-title {
    font-weight: bold;
    color: #92400e;
    margin-bottom: 0.5rem;
  }

  .app.dark .tips-title {
    color: #fbbf24;
  }

  .tips-text {
    color: #78350f;
  }

  .app.dark .tips-text {
    color: #fcd34d;
  }

  /* Sets Control */
  .sets-section {
    margin-bottom: 2rem;
  }

  .sets-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .sets-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .set-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: var(--gray-50);
    border-radius: var(--border-radius);
    border: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .app.dark .set-item {
    background: var(--gray-700);
  }

  .set-item.completed {
    border-color: var(--success);
    background: #f0fdf4;
  }

  .app.dark .set-item.completed {
    background: rgba(5, 150, 105, 0.1);
  }

  .set-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .set-controls {
    display: flex;
    gap: 0.5rem;
  }

  /* Buttons */
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn:hover {
    transform: translateY(-1px);
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .btn-primary {
    background: var(--primary);
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: var(--primary-dark);
  }

  .btn-success {
    background: var(--success);
    color: white;
  }

  .btn-warning {
    background: var(--warning);
    color: white;
  }

  .btn-secondary {
    background: var(--gray-200);
    color: var(--gray-700);
  }

  .btn-icon {
    padding: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    justify-content: center;
  }

  .btn-lg {
    padding: 0.75rem 2rem;
    font-size: 1.125rem;
  }

  /* Timer */
  .timer-section {
    background: linear-gradient(135deg, var(--warning), var(--danger));
    color: white;
    padding: 2rem;
    border-radius: var(--border-radius);
    text-align: center;
    margin-bottom: 2rem;
  }

  .timer-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .timer-display {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    font-family: 'Courier New', monospace;
  }

  .timer-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .timer-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.75rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .timer-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  /* Navigation */
  .exercise-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }

  /* Progress View */
  .progress-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .metric-card {
    text-align: center;
    padding: 1.5rem;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }

  .metric-label {
    color: var(--gray-600);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .main {
      padding: 1rem 0.5rem;
    }
    
    .exercise-visual {
      grid-template-columns: 1fr;
    }
    
    .exercise-stats {
      grid-template-columns: 1fr;
    }
    
    .timer-display {
      font-size: 2.5rem;
    }
    
    .exercise-navigation {
      flex-direction: column;
      gap: 1rem;
    }
    
    .schedule-grid {
      grid-template-columns: 1fr;
    }
  }
`;

const FitGuidePro = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedSets, setCompletedSets] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const intervalRef = useRef(null);

  // Datos de entrenamientos con ilustraciones detalladas
  const workouts = {
    dayA: {
      name: "DÍA A - EMPUJE + PIERNAS",
      subtitle: "Pectorales, Hombros, Tríceps, Cuádriceps",
      colorClass: "day-a",
      exercises: [
        {
          id: 1,
          name: "Press de Pecho con Mancuernas",
          sets: 3,
          reps: "8-12",
          weight: "4-6kg",
          restTime: 90,
          muscles: ["Pectorales", "Tríceps", "Deltoides"],
          instructions: [
            { title: "Posición inicial", text: "Acostado en banco, pies firmes en el suelo, espalda con arco natural" },
            { title: "Ejecución", text: "Baja las mancuernas controladamente hasta el pecho (2-3 seg)" },
            { title: "Subida", text: "Empuja explosivamente hacia arriba, manteniendo trayectoria en arco" },
            { title: "Respiración", text: "Inhala al bajar, exhala al subir" }
          ],
          tips: "Mantén escápulas retraídas • No arquees excesivamente la espalda • Control total en la bajada",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Banco */}
              <rect x="30" y="90" width="140" height="15" fill="#8B4513" rx="5"/>
              <rect x="40" y="75" width="120" height="8" fill="#D2691E" rx="4"/>
              
              {/* Figura acostada */}
              <circle cx="100" cy="65" r="8" fill="#2c3e50"/>
              <rect x="97" y="73" width="6" height="25" fill="#2c3e50" rx="3"/>
              
              {/* Brazos con mancuernas */}
              <line x1="100" y1="80" x2="75" y2="55" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="80" x2="125" y2="55" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuernas */}
              <rect x="68" y="52" width="14" height="6" fill="#34495e" rx="3"/>
              <rect x="118" y="52" width="14" height="6" fill="#34495e" rx="3"/>
              
              {/* Piernas */}
              <line x1="100" y1="98" x2="90" y2="125" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="98" x2="110" y2="125" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Flechas de movimiento */}
              <path d="M 75 40 L 75 30 M 70 35 L 75 30 L 80 35" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <path d="M 125 40 L 125 30 M 120 35 L 125 30 L 130 35" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <text x="50" y="25" fontSize="10" fill="#e74c3c">Subir</text>
            </svg>
          )
        },
        {
          id: 2,
          name: "Sentadillas con Mancuerna (Copa)",
          sets: 3,
          reps: "8-12",
          weight: "4-8kg",
          restTime: 90,
          muscles: ["Cuádriceps", "Glúteos", "Core"],
          instructions: [
            { title: "Posición", text: "Pies separados ancho de hombros, mancuerna pegada al pecho" },
            { title: "Descenso", text: "Siéntate hacia atrás como si fueras a una silla invisible" },
            { title: "Profundidad", text: "Baja hasta que muslos estén paralelos al suelo" },
            { title: "Subida", text: "Empuja con talones, mantén pecho erguido" }
          ],
          tips: "Peso en talones • Rodillas alineadas con pies • Core activado • No dejes que rodillas se junten",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Figura en sentadilla */}
              <circle cx="100" cy="35" r="8" fill="#2c3e50"/>
              <rect x="97" y="43" width="6" height="35" fill="#2c3e50" rx="3"/>
              
              {/* Brazos sosteniendo mancuerna */}
              <line x1="100" y1="55" x2="85" y2="50" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="55" x2="115" y2="50" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuerna en el pecho */}
              <rect x="92" y="47" width="16" height="8" fill="#34495e" rx="4"/>
              
              {/* Piernas en posición de sentadilla */}
              <line x1="100" y1="78" x2="85" y2="105" stroke="#2c3e50" strokeWidth="5"/>
              <line x1="100" y1="78" x2="115" y2="105" stroke="#2c3e50" strokeWidth="5"/>
              
              {/* Pies */}
              <ellipse cx="85" cy="110" rx="8" ry="4" fill="#2c3e50"/>
              <ellipse cx="115" cy="110" rx="8" ry="4" fill="#2c3e50"/>
              
              {/* Línea de profundidad */}
              <line x1="70" y1="95" x2="130" y2="95" stroke="#e74c3c" strokeWidth="2" strokeDasharray="5,5"/>
              <text x="135" y="98" fontSize="10" fill="#e74c3c">Paralelo</text>
              
              {/* Flecha de movimiento */}
              <path d="M 55 60 L 55 85 M 50 80 L 55 85 L 60 80" stroke="#27ae60" strokeWidth="2" fill="none"/>
              <path d="M 55 85 L 55 60 M 50 65 L 55 60 L 60 65" stroke="#27ae60" strokeWidth="2" fill="none"/>
            </svg>
          )
        },
        {
          id: 3,
          name: "Remo con Mancuerna (Apoyado)",
          sets: 3,
          reps: "8-12 c/brazo",
          weight: "4-6kg",
          restTime: 60,
          muscles: ["Dorsales", "Romboides", "Bíceps"],
          instructions: [
            { title: "Posición", text: "Una rodilla y mano apoyadas en banco, espalda neutra" },
            { title: "Agarre", text: "Mancuerna con brazo extendido, inicio desde retracción escapular" },
            { title: "Tirón", text: "Lleva codo hacia atrás, mancuerna hacia costilla" },
            { title: "Squeeze", text: "Aprieta omóplato en la parte superior, baja controladamente" }
          ],
          tips: "No uses impulso • Codo pegado al torso • Inicia el movimiento con la espalda • Control en bajada",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Banco */}
              <rect x="110" y="70" width="60" height="12" fill="#8B4513" rx="5"/>
              
              {/* Figura en posición de remo */}
              <circle cx="80" cy="45" r="8" fill="#2c3e50"/>
              <rect x="77" y="53" width="6" height="25" fill="#2c3e50" rx="3"/>
              
              {/* Brazo de apoyo */}
              <line x1="83" y1="60" x2="120" y2="65" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Brazo trabajando */}
              <line x1="77" y1="60" x2="55" y2="85" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuerna */}
              <rect x="48" y="82" width="14" height="6" fill="#34495e" rx="3"/>
              
              {/* Piernas estables */}
              <line x1="80" y1="78" x2="75" y2="105" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="80" y1="78" x2="105" y2="95" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Rodilla apoyada */}
              <circle cx="105" cy="95" r="3" fill="#2c3e50"/>
              
              {/* Flecha de movimiento */}
              <path d="M 40 85 L 25 70 M 30 75 L 25 70 L 30 65" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <text x="15" y="60" fontSize="10" fill="#e74c3c">Tirar</text>
            </svg>
          )
        },
        {
          id: 4,
          name: "Curl con Barra Z",
          sets: 3,
          reps: "8-12",
          weight: "Barra + 2-4kg",
          restTime: 60,
          muscles: ["Bíceps", "Antebrazos"],
          instructions: [
            { title: "Posición", text: "De pie, pies separados ancho de hombros, core activado" },
            { title: "Agarre", text: "Barra Z con agarre natural, brazos extendidos" },
            { title: "Curl", text: "Flexiona codos sin mover hombros ni balancearte" },
            { title: "Contracción", text: "Aprieta bíceps arriba, baja controladamente" }
          ],
          tips: "Codos fijos al costado • No balancees el cuerpo • Contracción en la cima • Bajada lenta (3 seg)",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Figura de pie */}
              <circle cx="100" cy="35" r="8" fill="#2c3e50"/>
              <rect x="97" y="43" width="6" height="40" fill="#2c3e50" rx="3"/>
              
              {/* Brazos haciendo curl */}
              <line x1="100" y1="55" x2="85" y2="75" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="55" x2="115" y2="75" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Barra Z */}
              <path d="M 75 75 L 85 75 L 90 80 L 110 80 L 115 75 L 125 75" stroke="#34495e" strokeWidth="6" fill="none"/>
              
              {/* Piernas estables */}
              <line x1="100" y1="83" x2="95" y2="115" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="83" x2="105" y2="115" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Pies */}
              <ellipse cx="95" cy="120" rx="8" ry="4" fill="#2c3e50"/>
              <ellipse cx="105" cy="120" rx="8" ry="4" fill="#2c3e50"/>
              
              {/* Flecha de movimiento */}
              <path d="M 135 90 L 135 65 M 130 70 L 135 65 L 140 70" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <text x="145" y="80" fontSize="10" fill="#e74c3c">Curl</text>
            </svg>
          )
        },
        {
          id: 5,
          name: "Plancha Abdominal",
          sets: 3,
          reps: "30-60s",
          weight: "Peso corporal",
          restTime: 45,
          muscles: ["Core", "Hombros"],
          instructions: [
            { title: "Posición", text: "Antebrazos apoyados, codos bajo los hombros" },
            { title: "Cuerpo", text: "Línea recta desde cabeza hasta talones" },
            { title: "Core", text: "Abdomen contraído, glúteos apretados" },
            { title: "Respiración", text: "Mantén respiración normal, no aguantes" }
          ],
          tips: "No subas la cadera • No dejes caer la cadera • Mirada al suelo • Si duele la espalda, para",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Figura en plancha */}
              <circle cx="150" cy="50" r="8" fill="#2c3e50"/>
              <rect x="90" y="47" width="54" height="6" fill="#2c3e50" rx="3"/>
              
              {/* Brazos de apoyo */}
              <line x1="90" y1="50" x2="75" y2="65" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="95" y1="50" x2="80" y2="65" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Antebrazos */}
              <rect x="70" y="63" width="15" height="4" fill="#2c3e50" rx="2"/>
              
              {/* Piernas extendidas */}
              <line x1="144" y1="53" x2="165" y2="53" stroke="#2c3e50" strokeWidth="5"/>
              <line x1="144" y1="53" x2="165" y2="58" stroke="#2c3e50" strokeWidth="5"/>
              
              {/* Línea de alineación */}
              <line x1="77" y1="35" x2="165" y2="35" stroke="#e74c3c" strokeWidth="2" strokeDasharray="3,3"/>
              <text x="110" y="30" fontSize="10" fill="#e74c3c">Línea recta</text>
              
              {/* Suelo */}
              <line x1="30" y1="75" x2="180" y2="75" stroke="#8B4513" strokeWidth="3"/>
            </svg>
          )
        }
      ]
    },
    dayB: {
      name: "DÍA B - TRACCIÓN + POSTERIOR",
      subtitle: "Espalda, Bíceps, Isquiotibiales, Glúteos",
      colorClass: "day-b",
      exercises: [
        {
          id: 6,
          name: "Press Inclinado con Mancuernas",
          sets: 3,
          reps: "8-12",
          weight: "4-6kg",
          restTime: 90,
          muscles: ["Pectorales", "Deltoides"],
          instructions: [
            { title: "Banco", text: "Ajusta inclinación a 30-45 grados" },
            { title: "Posición", text: "Espalda completamente apoyada, pies firmes" },
            { title: "Movimiento", text: "Igual que press plano pero en ángulo" },
            { title: "Enfoque", text: "Trabaja más la parte superior del pecho" }
          ],
          tips: "No inclines demasiado (máximo 45°) • Mantén espalda pegada al banco • Trayectoria hacia los ojos",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Banco inclinado */}
              <polygon points="30,105 170,105 170,60 50,60" fill="#8B4513"/>
              <rect x="40" y="55" width="120" height="8" fill="#D2691E" rx="4"/>
              
              {/* Figura en banco inclinado */}
              <circle cx="100" cy="50" r="8" fill="#2c3e50"/>
              <rect x="97" y="58" width="6" height="30" fill="#2c3e50" rx="3"/>
              
              {/* Brazos con mancuernas */}
              <line x1="100" y1="65" x2="80" y2="45" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="65" x2="120" y2="45" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuernas */}
              <rect x="73" y="42" width="14" height="6" fill="#34495e" rx="3"/>
              <rect x="113" y="42" width="14" height="6" fill="#34495e" rx="3"/>
              
              {/* Ángulo del banco */}
              <text x="20" y="85" fontSize="12" fill="#e74c3c">30-45°</text>
            </svg>
          )
        },
        {
          id: 7,
          name: "Peso Muerto Rumano",
          sets: 3,
          reps: "8-12",
          weight: "6-10kg/mancuerna",
          restTime: 90,
          muscles: ["Isquiotibiales", "Glúteos"],
          instructions: [
            { title: "Posición", text: "Pies separados ancho de cadera, mancuernas al frente" },
            { title: "Descenso", text: "Empuja cadera hacia atrás, mantén rodillas ligeramente flexionadas" },
            { title: "Espalda", text: "Mantén curvatura natural, pecho hacia arriba" },
            { title: "Subida", text: "Empuja cadera hacia adelante, aprieta glúteos" }
          ],
          tips: "Movimiento de cadera, NO espalda • Siente el estiramiento en isquiotibiales • No redondees la espalda",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Figura haciendo peso muerto rumano */}
              <circle cx="100" cy="30" r="8" fill="#2c3e50"/>
              <rect x="97" y="38" width="6" height="25" fill="#2c3e50" rx="3"/>
              
              {/* Brazos extendidos con mancuernas */}
              <line x1="100" y1="50" x2="85" y2="75" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="50" x2="115" y2="75" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuernas */}
              <rect x="78" y="72" width="14" height="6" fill="#34495e" rx="3"/>
              <rect x="108" y="72" width="14" height="6" fill="#34495e" rx="3"/>
              
              {/* Piernas */}
              <line x1="100" y1="63" x2="95" y2="95" stroke="#2c3e50" strokeWidth="5"/>
              <line x1="100" y1="63" x2="105" y2="95" stroke="#2c3e50" strokeWidth="5"/>
              
              {/* Línea de la cadera hacia atrás */}
              <path d="M 70 55 L 55 55 M 60 50 L 55 55 L 60 60" stroke="#e74c3c" strokeWidth="2" fill="none"/>
              <text x="30" y="50" fontSize="10" fill="#e74c3c">Cadera atrás</text>
            </svg>
          )
        }
      ]
    },
    dayC: {
      name: "DÍA C - CUERPO COMPLETO",
      subtitle: "Integración y variaciones",
      colorClass: "day-c",
      exercises: [
        {
          id: 8,
          name: "Sentadillas con Variación",
          sets: 3,
          reps: "8-12",
          weight: "4-8kg/mancuerna",
          restTime: 90,
          muscles: ["Piernas", "Core"],
          instructions: [
            { title: "Variación semanal", text: "Alterna entre stance normal y amplio cada semana" },
            { title: "Mancuernas", text: "Una en cada mano, brazos colgando a los lados" },
            { title: "Ejecución", text: "Misma técnica que sentadilla copa" },
            { title: "Beneficio", text: "Trabajas músculos desde ángulos diferentes" }
          ],
          tips: "Stance amplio = más glúteos • Stance normal = más cuádriceps • Mantén técnica perfecta",
          illustration: (
            <svg width="200" height="150" viewBox="0 0 200 150">
              {/* Figura alternando stance */}
              <circle cx="100" cy="35" r="8" fill="#2c3e50"/>
              <rect x="97" y="43" width="6" height="35" fill="#2c3e50" rx="3"/>
              
              {/* Brazos con mancuernas a los lados */}
              <line x1="100" y1="55" x2="80" y2="65" stroke="#2c3e50" strokeWidth="4"/>
              <line x1="100" y1="55" x2="120" y2="65" stroke="#2c3e50" strokeWidth="4"/>
              
              {/* Mancuernas */}
              <rect x="73" y="62" width="14" height="6" fill="#34495e" rx="3"/>
              <rect x="113" y="62" width="14" height="6" fill="#34495e" rx="3"/>
              
              {/* Piernas en stance amplio */}
              <line x1="100" y1="78" x2="80" y2="105" stroke="#2c3e50" strokeWidth="5"/>
              <line x1="100" y1="78" x2="120" y2="105" stroke="#2c3e50" strokeWidth="5"/>
              
              {/* Indicador de variación */}
              <text x="130" y="95" fontSize="10" fill="#e74c3c">Alternar:</text>
              <text x="130" y="105" fontSize="10" fill="#e74c3c">Normal/Amplio</text>
            </svg>
          )
        }
      ]
    }
  };

  // Timer logic
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setTimerActive(false);
            if (soundEnabled) console.log('Timer finished!');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeLeft, soundEnabled]);

  // Inject styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const startRestTimer = (seconds) => {
    setTimeLeft(seconds);
    setTimerActive(true);
  };

  const completeSet = (exerciseId, setNumber) => {
    const key = `${exerciseId}-${setNumber}`;
    setCompletedSets(prev => ({ ...prev, [key]: true }));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const Dashboard = () => (
    <div>
      <div className="welcome-section">
        <h1 className="welcome-title">¡Bienvenido a tu Plan de Entrenamiento! 💪</h1>
        <p>Selecciona el día de entrenamiento que quieres realizar</p>
      </div>

      <div className="schedule-grid">
        {Object.entries(workouts).map(([key, workout]) => (
          <div
            key={key}
            className={`workout-card ${workout.colorClass}`}
            onClick={() => {
              setCurrentWorkout(workout);
              setCurrentExercise(0);
              setActiveTab('workout');
            }}
          >
            <h3 className="workout-title">{workout.name}</h3>
            <p className="workout-subtitle">{workout.subtitle}</p>
            <div className="workout-action">
              <span>{workout.exercises.length} ejercicios</span>
              <ChevronRight size={20} />
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <h2>📋 Cronograma Semanal Recomendado</h2>
        <div style={{ marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Lunes:</strong> Día A - Empuje + Piernas<br/>
            <strong>Martes:</strong> Descanso o cardio ligero<br/>
            <strong>Miércoles:</strong> Día B - Tracción + Posterior<br/>
            <strong>Jueves:</strong> Descanso o cardio ligero<br/>
            <strong>Viernes:</strong> Día C - Cuerpo Completo<br/>
            <strong>Fin de semana:</strong> Descanso activo
          </div>
        </div>
      </div>
    </div>
  );

  const WorkoutView = () => {
    if (!currentWorkout) return <Dashboard />;

    const exercise = currentWorkout.exercises[currentExercise];

    return (
      <div>
        <div className="card">
          <div className="exercise-header">
            <h1 className="exercise-title">{exercise.name}</h1>
            <p className="exercise-progress">
              Ejercicio {currentExercise + 1} de {currentWorkout.exercises.length} - {currentWorkout.name}
            </p>
          </div>

          <div className="exercise-stats">
            <div className="exercise-stat">
              <div className="stat-value">{exercise.sets}</div>
              <div className="stat-label">Series</div>
            </div>
            <div className="exercise-stat">
              <div className="stat-value">{exercise.reps}</div>
              <div className="stat-label">Repeticiones</div>
            </div>
            <div className="exercise-stat">
              <div className="stat-value">{exercise.weight}</div>
              <div className="stat-label">Peso</div>
            </div>
          </div>

          <div className="exercise-visual">
            <div className="exercise-diagram">
              {exercise.illustration}
            </div>
            <div className="exercise-instructions">
              {exercise.instructions.map((instruction, index) => (
                <div key={index} className="instruction-step">
                  <div className="step-title">{instruction.title}:</div>
                  <div>{instruction.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="tips-section">
            <div className="tips-title">💡 Tips Importantes</div>
            <div className="tips-text">{exercise.tips}</div>
          </div>

          <div className="sets-section">
            <h3 className="sets-title">Control de Series</h3>
            <div className="sets-list">
              {[...Array(exercise.sets)].map((_, setIndex) => {
                const setKey = `${exercise.id}-${setIndex}`;
                const isCompleted = completedSets[setKey];
                
                return (
                  <div key={setIndex} className={`set-item ${isCompleted ? 'completed' : ''}`}>
                    <div className="set-info">
                      <span>Serie {setIndex + 1}</span>
                      {isCompleted && <CheckCircle size={20} color="#059669" />}
                    </div>
                    <div className="set-controls">
                      <button
                        onClick={() => completeSet(exercise.id, setIndex)}
                        disabled={isCompleted}
                        className={`btn ${isCompleted ? 'btn-success' : 'btn-primary'}`}
                      >
                        {isCompleted ? 'Completada' : 'Completar'}
                      </button>
                      <button
                        onClick={() => startRestTimer(exercise.restTime)}
                        className="btn btn-warning btn-icon"
                        title={`Descansar ${exercise.restTime}s`}
                      >
                        <Clock size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {(timerActive || timeLeft > 0) && (
            <div className="timer-section">
              <div className="timer-title">⏱️ Tiempo de Descanso</div>
              <div className="timer-display">{formatTime(timeLeft)}</div>
              <div className="timer-controls">
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className="timer-btn"
                  title={timerActive ? 'Pausar' : 'Reanudar'}
                >
                  {timerActive ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={() => {
                    setTimeLeft(0);
                    setTimerActive(false);
                  }}
                  className="timer-btn"
                  title="Detener timer"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          )}

          <div className="exercise-navigation">
            <button
              onClick={() => setCurrentExercise(Math.max(0, currentExercise - 1))}
              disabled={currentExercise === 0}
              className="btn btn-secondary btn-lg"
            >
              <ChevronLeft size={20} />
              Anterior
            </button>
            <button
              onClick={() => {
                if (currentExercise < currentWorkout.exercises.length - 1) {
                  setCurrentExercise(currentExercise + 1);
                } else {
                  setActiveTab('dashboard');
                  setCurrentWorkout(null);
                  setCurrentExercise(0);
                  setCompletedSets({});
                }
              }}
              className="btn btn-primary btn-lg"
            >
              {currentExercise < currentWorkout.exercises.length - 1 ? 'Siguiente' : 'Finalizar'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProgressView = () => (
    <div className="card">
      <h2>📊 Tu Progreso</h2>
      <div className="progress-grid">
        <div className="metric-card">
          <div className="metric-value">12</div>
          <div className="metric-label">Entrenamientos completados</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">85%</div>
          <div className="metric-label">Adherencia semanal</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">+15%</div>
          <div className="metric-label">Aumento de fuerza</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">3.2kg</div>
          <div className="metric-label">Pérdida de peso</div>
        </div>
      </div>
      <p style={{ marginTop: '2rem', color: 'var(--gray-600)' }}>
        Próximamente: Gráficos detallados, mediciones corporales y tracking avanzado.
      </p>
    </div>
  );

  const CalendarView = () => (
    <div className="card">
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <Calendar size={64} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
        <h2>🗓️ Calendario de Entrenamientos</h2>
        <p style={{ color: 'var(--gray-600)', marginTop: '1rem' }}>
          Próximamente: Planificación semanal, recordatorios y seguimiento de rutinas.
        </p>
      </div>
    </div>
  );

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="header-content">
          <h1 className="logo">FitGuide Pro</h1>
          <div className="header-controls">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="btn btn-secondary btn-icon"
              title={soundEnabled ? 'Silenciar' : 'Activar sonido'}
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="btn btn-secondary btn-icon"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="nav-content">
          <div className="nav-tabs">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            >
              <Home size={16} />
              Inicio
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              className={`nav-tab ${activeTab === 'workout' ? 'active' : ''}`}
            >
              <Dumbbell size={16} />
              Entrenamiento
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`nav-tab ${activeTab === 'progress' ? 'active' : ''}`}
            >
              <TrendingUp size={16} />
              Progreso
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`nav-tab ${activeTab === 'calendar' ? 'active' : ''}`}
            >
              <Calendar size={16} />
              Calendario
            </button>
          </div>
        </div>
      </nav>

      <main className="main">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'workout' && <WorkoutView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'calendar' && <CalendarView />}
      </main>
    </div>
  );
};

export default FitGuidePro;