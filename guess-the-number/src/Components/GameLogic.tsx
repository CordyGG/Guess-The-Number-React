import react, {useState, useEffect} from 'react';
import './GameLogic.css';

const GuessTheNumber = () => {
    const [minNum, setMinNum] = useState<number>(0)
    const [maxNum, setMaxNum] = useState<number>(100)
    const [secretNum, setSecretNum] = useState<number>(Math.floor(Math.random() * (maxNum - minNum)) + minNum + 1);
    const [attempts, setAttempts] = useState<number>(0)
    const [message, setMessage] = useState<string>(`Угадайте число от ${minNum} до ${maxNum}!`);
    const [guess, setGuess] = useState<number>(0);

    useEffect(() => {
        restart();
    }, [minNum, maxNum]) 

    const handleAttempt = () => {
        if (isNaN(guess)){
            setMessage("Введите число!");
            return;
        }

        setAttempts(attempts + 1);

        if (guess === secretNum){
            setMessage(`🎉 Правильно! Попыток: ${attempts + 1}`);
        } else if (guess < secretNum){
            setMessage(`🔺 Загаданное число больше (${guess} → ?)`);
        } else {
            setMessage(`🔻 Загаданное число меньше (${guess} ← ?)`);
        }
    }

    const restart = () => {
        setSecretNum(Math.floor(Math.random() * (maxNum - minNum)) + minNum + 1);
        setAttempts(0);
        setMessage(`Угадайте число от ${minNum} до ${maxNum}!`);
        setGuess(0)
    }

    return (
        <div className="game-container">
            <div className="game-card">
                <h1 className="game-title">Угадай число</h1>
                
                <div className="range-inputs">
                    <input
                        className="range-input"
                        type='number'
                        value={minNum}
                        onChange={(e) => setMinNum(parseInt(e.target.value) || 1)}
                        placeholder='Минимум'
                    />
                    <span className="range-separator">—</span>
                    <input
                        className="range-input"
                        type='number'
                        value={maxNum}
                        onChange={(e) => setMaxNum(parseInt(e.target.value) || 100)}
                        placeholder='Максимум'
                    />
                </div>

                <div className={`message ${message.includes('Правильно') ? 'success' : ''}`}>
                    {message || `Введите число от ${minNum} до ${maxNum}`}
                </div>

                <input
                    className="guess-input"
                    type="number"
                    value={guess || ''}
                    onChange={(e) => setGuess(parseInt(e.target.value) || 0)}
                    placeholder="Ваш вариант"
                    min={minNum}
                    max={maxNum}
                />

                <div className="buttons">
                    <button className="button check" onClick={handleAttempt}>
                        Проверить
                    </button>
                    <button className="button restart" onClick={restart}>
                        Новая игра
                    </button>
                </div>

                <div className="stats">
                    <span>Диапазон: {minNum}-{maxNum}</span>
                    <span>Попыток: {attempts}</span>
                </div>
            </div>
        </div>
    );
};

export default GuessTheNumber;