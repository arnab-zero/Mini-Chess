import React, { useState } from 'react';

interface Lesson {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  content?: {
    intro: string;
    steps: string[];
    image?: string;
  };
}

// Define lessons with detailed content for each difficulty level
const lessonsData: Lesson[] = [
  // Beginner Lessons
  {
    id: 1,
    title: "Basic Moves",
    description: "Learn the basic moves of each piece.",
    difficulty: "Beginner",
    content: {
      intro: "In this lesson, we’ll cover the fundamental moves of each piece on the chessboard.",
      steps: [
        "The pawn moves forward by one square, but captures diagonally.",
        "The rook moves in a straight line along ranks and files.",
        "The knight moves in an L-shape: two squares in one direction and one square perpendicular.",
        "The bishop moves diagonally across any number of squares.",
        "The queen moves in any direction along ranks, files, or diagonals.",
        "The king moves one square in any direction."
      ],
      image: "https://example.com/chess-basic-moves.png"
    }
  },
  {
    id: 2,
    title: "Pawn Structure",
    description: "Understand pawn structure and positioning.",
    difficulty: "Beginner",
    content: {
      intro: "Learn about pawn structure and why it’s crucial for controlling the board.",
      steps: [
        "Avoid moving pawns too quickly as they can’t move backward.",
        "Use pawns to control the center of the board.",
        "Understand doubled pawns, isolated pawns, and backward pawns.",
        "Build a strong pawn chain to support other pieces."
      ],
      image: "https://example.com/chess-pawn-structure.png"
    }
  },

  // Intermediate Lessons
  {
    id: 3,
    title: "Opening Principles",
    description: "Learn the key opening principles.",
    difficulty: "Intermediate",
    content: {
      intro: "Master the main principles of chess openings to start the game strong.",
      steps: [
        "Control the center of the board with pawns.",
        "Develop your knights and bishops early.",
        "Castle to protect your king and connect your rooks.",
        "Avoid moving the same piece multiple times in the opening."
      ],
      image: "https://example.com/chess-opening-principles.png"
    }
  },
  {
    id: 4,
    title: "Piece Coordination",
    description: "Improve your piece coordination.",
    difficulty: "Intermediate",
    content: {
      intro: "Understand how to coordinate pieces to control key areas of the board.",
      steps: [
        "Place pieces on active squares where they can influence the board.",
        "Coordinate rooks and queen to control open files.",
        "Keep your pieces connected and support each other’s positions.",
        "Avoid isolated pieces, as they are vulnerable to attack."
      ],
      image: "https://example.com/chess-piece-coordination.png"
    }
  },

  // Advanced Lessons
  {
    id: 5,
    title: "Advanced Tactics",
    description: "Dive into advanced tactics to improve your game.",
    difficulty: "Advanced",
    content: {
      intro: "Learn complex tactics like forks, pins, and skewers to outplay your opponents.",
      steps: [
        "Look for forks where one piece attacks two or more pieces.",
        "Use pins to immobilize valuable pieces, such as the king or queen.",
        "Employ skewers to force valuable pieces to move, revealing weaker ones.",
        "Practice combination tactics to chain multiple tactics together."
      ],
      image: "https://example.com/chess-advanced-tactics.png"
    }
  },
  {
    id: 6,
    title: "Endgame Strategy",
    description: "Master endgame strategies for success.",
    difficulty: "Advanced",
    content: {
      intro: "Endgames require precise moves and strategic planning. Let’s explore key concepts.",
      steps: [
        "Learn the opposition concept to control the king’s movement.",
        "Understand key pawn structures like passed and isolated pawns.",
        "Coordinate your king with other pieces in the endgame.",
        "Practice mating patterns with king and rook versus king."
      ],
      image: "https://example.com/chess-endgame-strategy.png"
    }
  },
];

const Learn: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredLessons = selectedCategory === 'All'
    ? lessonsData
    : lessonsData.filter(lesson => lesson.difficulty === selectedCategory);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      <header style={{ textAlign: 'center', padding: '20px 0' }}>
        <h1 style={{ color: '#2C3E50' }}>Learn Chess</h1>
        <p style={{ color: '#7F8C8D', fontSize: '1em' }}>Select a category to start learning</p>
       
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '15px' }}>
          {[
            { label: 'All', description: 'All Lessons', emoji: '📚' },
            { label: 'Beginner', description: 'Learn the basics', emoji: '♙' },
            { label: 'Intermediate', description: 'Level up your play', emoji: '♘' },
            { label: 'Advanced', description: 'Master advanced tactics', emoji: '♔' }
          ].map(category => (
            <button
              key={category.label}
              onClick={() => setSelectedCategory(category.label)}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === category.label ? '#3498DB' : '#ECF0F1',
                color: selectedCategory === category.label ? '#FFF' : '#333',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '150px',
              }}
            >
              <span style={{ fontSize: '1.5em' }}>{category.emoji}</span>
              <div style={{ textAlign: 'left' }}>
                <strong>{category.label}</strong>
                <p style={{ fontSize: '0.8em', margin: 0, color: selectedCategory === category.label ? '#FFF' : '#7F8C8D' }}>
                  {category.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </header>

      {/* Lessons Grid */}
      <div style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        maxWidth: '1000px',
        margin: 'auto',
        padding: '20px',
      }}>
        {filteredLessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => setSelectedLesson(lesson)}
            style={{
              backgroundColor: '#FFF',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'left',
            }}
          >
            <h3 style={{ color: '#2C3E50', fontSize: '1.3em' }}>{lesson.title}</h3>
            <p style={{ color: '#7F8C8D', fontSize: '0.95em', marginBottom: '15px' }}>{lesson.description}</p>
            <span style={{
              alignSelf: 'flex-start',
              padding: '5px 10px',
              borderRadius: '15px',
              backgroundColor: lesson.difficulty === 'Beginner' ? '#2ECC71' : lesson.difficulty === 'Intermediate' ? '#F39C12' : '#E74C3C',
              color: '#FFF',
              fontSize: '0.85em',
              fontWeight: 'bold',
            }}>{lesson.difficulty}</span>
          </div>
        ))}
      </div>

      {/* Modal for Lesson Detail */}
      {selectedLesson && selectedLesson.content && (
        <div
          onClick={() => setSelectedLesson(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFF',
              padding: '30px',
              borderRadius: '10px',
              maxWidth: '500px',
              width: '100%',
              textAlign: 'left',
              boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedLesson(null)}
              style={{
                position: 'absolute',
               top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5em',
                cursor: 'pointer',
                color: '#E74C3C'
              }}
            >✕</button>
            <h2 style={{ color: '#2C3E50', marginBottom: '10px' }}>{selectedLesson.title}</h2>
            <p style={{ color: '#7F8C8D', fontSize: '1em', marginBottom: '15px' }}>{selectedLesson.content.intro}</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
              {selectedLesson.content.steps.map((step, index) => (
                <li key={index} style={{ color: '#333', fontSize: '0.9em', marginBottom: '8px' }}>{step}</li>
              ))}
            </ul>
            {selectedLesson.content.image && (
              <img
                src={selectedLesson.content.image}
                alt={`${selectedLesson.title} diagram`}
                style={{ width: '100%', borderRadius: '8px', marginTop: '15px' }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;