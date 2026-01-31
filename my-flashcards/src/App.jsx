import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Upload, 
  Play, 
  Edit3, 
  RotateCcw, 
  Check, 
  X,
  Download,
  BookOpen,
  Languages
} from 'lucide-react';

// מנוע עיצוב פנימי - מבטיח שהאתר ייראה מעולה גם אם Tailwind לא נטען במחשב
const styles = `
  .app-container { font-family: system-ui, -apple-system, sans-serif; background-color: #f8fafc; min-height: 100vh; direction: rtl; }
  .nav-bar { background: white; border-bottom: 1px solid #e2e8f0; height: 64px; display: flex; align-items: center; position: sticky; top: 0; z-index: 50; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
  .nav-content { max-width: 600px; margin: 0 auto; width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0 16px; }
  .logo-box { background: #4f46e5; width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }
  .main-content { max-width: 600px; margin: 0 auto; padding: 24px 16px; }
  
  .card-container { perspective: 1000px; transition: all 0.3s ease; position: relative; width: 100%; height: 320px; }
  .card-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); transform-style: preserve-3d; cursor: pointer; }
  .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; border-radius: 24px; padding: 24px; border: 2px solid #e2e8f0; box-sizing: border-box; background: white; }
  .card-back { transform: rotateY(180deg); background-color: #4f46e5; color: white; border-color: #4338ca; }
  .flipped { transform: rotateY(180deg); }
  
  .swipe-right { transform: translateX(100vw) rotate(20deg) !important; opacity: 0 !important; transition: all 0.4s ease-out !important; }
  .swipe-left { transform: translateX(-100vw) rotate(-20deg) !important; opacity: 0 !important; transition: all 0.4s ease-out !important; }
  
  .btn-primary { background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: bold; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }
  .btn-primary:hover { background: #4338ca; transform: translateY(-1px); }
  .btn-secondary { background: white; color: #475569; border: 1px solid #e2e8f0; padding: 12px; border-radius: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; }
  
  .edit-item { background: white; padding: 16px; border-radius: 24px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .input-field { background: #f1f5f9; border: 2px solid transparent; padding: 12px; border-radius: 12px; width: 100%; font-weight: bold; outline: none; transition: all 0.2s; }
  .input-field:focus { border-color: #4f46e5; background: white; }
  
  .progress-bar-bg { background: #e2e8f0; height: 8px; border-radius: 99px; width: 100%; overflow: hidden; margin-top: 8px; }
  .progress-bar-fill { background: #4f46e5; height: 100%; transition: width 0.4s ease; }
`;

const Card = ({ front, back, isFlipped, onClick, direction }) => (
  <div className={`card-container ${direction === 'right' ? 'swipe-right' : direction === 'left' ? 'swipe-left' : ''}`} onClick={onClick}>
    <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
      <div className="card-face shadow-sm">
        <div style={{textAlign: 'center', width: '100%'}}>
          <div style={{color: '#6366f1', opacity: 0.2, marginBottom: '12px'}}><Languages size={40} /></div>
          <span style={{color: '#94a3b8', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em'}}>גרמנית</span>
          <h3 style={{fontSize: '28px', color: '#1e293b', margin: '8px 0'}} dir="ltr">{front}</h3>
        </div>
      </div>
      <div className="card-face card-back shadow-lg">
        <div style={{textAlign: 'center', width: '100%'}}>
          <span style={{color: '#c7d2fe', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em'}}>תרגום</span>
          <h3 style={{fontSize: '28px', color: 'white', margin: '8px 0'}} dir="rtl">{back}</h3>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [mode, setMode] = useState('edit');
  const [cards, setCards] = useState([
    { id: 1, front: 'ich', back: 'אני' },
    { id: 2, front: 'Universität', back: 'אוניברסיטה' }
  ]);

  const [testQueue, setTestQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState([]);
  const [unknownCards, setUnknownCards] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const addCard = () => {
    setCards([{ id: Date.now(), front: '', back: '' }, ...cards]);
  };

  const updateCard = (id, field, value) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const deleteCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const startTest = (cardsToUse = cards) => {
    if (cardsToUse.length === 0) return;
    setTestQueue([...cardsToUse].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setKnownCards([]);
    setUnknownCards([]);
    setIsFlipped(false);
    setMode('test');
  };

  const handleSwipe = (direction) => {
    if (swipeDirection) return;
    setSwipeDirection(direction);
    
    setTimeout(() => {
      const currentCard = testQueue[currentIndex];
      if (direction === 'right') setKnownCards(prev => [...prev, currentCard]);
      else setUnknownCards(prev => [...prev, currentCard]);

      if (currentIndex < testQueue.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
        setSwipeDirection(null);
      } else {
        setMode('summary');
        setSwipeDirection(null);
      }
    }, 400);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cards, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "german_cards.json");
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) setCards(parsed);
      } catch (err) {
        alert("שגיאה בטעינת הקובץ");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-container">
      <style>{styles}</style>
      
      <nav className="nav-bar">
        <div className="nav-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div className="logo-box"><BookOpen size={22} /></div>
            <span style={{fontSize: '20px', fontWeight: '900', color: '#1e293b'}}>FlashLearn</span>
          </div>
          <div>
            {mode === 'edit' ? (
              cards.length > 0 && (
                <button onClick={() => startTest(cards)} className="btn-primary">
                  <Play size={16} fill="currentColor" /> תרגול
                </button>
              )
            ) : (
              <button onClick={() => setMode('edit')} style={{background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer'}}>
                <Edit3 size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="main-content">
        {mode === 'edit' && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
            <div style={{background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0'}}>
              <h2 style={{margin: '0 0 4px 0', fontSize: '20px', fontWeight: '900'}}>ניהול אוצר מילים</h2>
              <p style={{margin: '0 0 16px 0', color: '#64748b', fontSize: '14px'}}>הוסף מילים או טען קובץ JSON ששמרת.</p>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
                <button onClick={exportData} className="btn-secondary"><Download size={18} /> שמירה</button>
                <label className="btn-secondary cursor-pointer">
                  <Upload size={18} /> טעינה
                  <input type="file" style={{display: 'none'}} accept=".json" onChange={importData} />
                </label>
              </div>
            </div>

            <button onClick={addCard} style={{background: 'rgba(255,255,255,0.5)', border: '2px dashed #cbd5e1', borderRadius: '24px', padding: '20px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px'}}>
              <Plus size={24} /> <span style={{fontWeight: '900', fontSize: '18px'}}>הוסף כרטיסייה חדשה</span>
            </button>

            <div>
              <span style={{fontSize: '12px', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em'}}>{cards.length} כרטיסיות</span>
              <div style={{marginTop: '12px'}}>
                {cards.map((card) => (
                  <div key={card.id} className="edit-item">
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flex: 1}}>
                      <input 
                        className="input-field" dir="ltr" value={card.front} 
                        onChange={(e) => updateCard(card.id, 'front', e.target.value)} 
                      />
                      <input 
                        className="input-field" value={card.back} 
                        onChange={(e) => updateCard(card.id, 'back', e.target.value)} 
                      />
                    </div>
                    <button onClick={() => deleteCard(card.id)} style={{background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer'}}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mode === 'test' && (
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '60vh'}}>
            <div style={{width: '100%', marginBottom: '32px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '900', color: '#94a3b8'}}>
                <span>{currentIndex + 1} / {testQueue.length}</span>
                <span>{Math.round((currentIndex / testQueue.length) * 100)}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{width: `${(currentIndex / testQueue.length) * 100}%`}}></div>
              </div>
            </div>

            <Card 
              front={testQueue[currentIndex].front} 
              back={testQueue[currentIndex].back} 
              isFlipped={isFlipped}
              direction={swipeDirection}
              onClick={() => setIsFlipped(!isFlipped)}
            />

            <div style={{display: 'flex', gap: '32px', marginTop: '48px'}}>
              <button onClick={() => handleSwipe('left')} style={{width: '72px', height: '72px', borderRadius: '24px', background: 'white', border: '1px solid #e2e8f0', color: '#ef4444', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
                <X size={36} strokeWidth={3} />
              </button>
              <button onClick={() => handleSwipe('right')} style={{width: '72px', height: '72px', borderRadius: '24px', background: 'white', border: '1px solid #e2e8f0', color: '#22c55e', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.05)'}}>
                <Check size={36} strokeWidth={3} />
              </button>
            </div>
          </div>
        )}

        {mode === 'summary' && (
          <div style={{textAlign: 'center', background: 'white', padding: '40px', borderRadius: '40px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px rgba(0,0,0,0.05)', marginTop: '40px'}}>
            <div style={{width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto'}}><Check size={48} strokeWidth={3} /></div>
            <h2 style={{fontSize: '28px', fontWeight: '900', margin: '0 0 8px 0'}}>סבב הושלם!</h2>
            <p style={{color: '#64748b', marginBottom: '32px'}}>זכרת <span style={{color: '#16a34a', fontWeight: '900'}}>{knownCards.length}</span> מילים.</p>
            <button onClick={() => startTest(cards)} className="btn-primary" style={{width: '100%', padding: '16px', fontSize: '18px', justifyContent: 'center'}}>
              <RotateCcw size={22} /> תרגול חוזר
            </button>
            <button onClick={() => setMode('edit')} style={{background: 'none', border: 'none', color: '#94a3b8', fontWeight: 'bold', marginTop: '16px', cursor: 'pointer'}}>חזור לעריכה</button>
          </div>
        )}
      </main>
    </div>
  );
}