import react, {useState} from 'react';
import { text } from 'stream/consumers';

const GuessTheNumber = () => {
    const [minNum, setMinNum] = useState<number>(0)
    const [maxNum, setMaxNum] = useState<number>(100)
    const [secretNum, setSecretNum] = useState<number>(Math.floor(Math.random() * (maxNum - minNum)) + minNum + 1);
    const [attempts, setAttempts] = useState<number>(0)
    const [message, setMessage] = useState<string>(`Угадайте число от ${minNum} до ${maxNum}!`);
    const [guess, setGuess] = useState<number>(0);

    const guessAttempt = () => {
        if (isNaN(guess)){
            setMessage("Введите число!");
            return;
        }

        setAttempts(attempts + 1);

        if (guess === secretNum){
            setMessage(`Правильно! Затрачено попыток : ${attempts}`);
        } else if (guess < secretNum){
            setMessage("Введенное число меньше загаданного!");
        } else {
            setMessage("Введенное число больше загаданного!");
        }
    }

    const restart = () => {
        setSecretNum(Math.floor(Math.random() * (maxNum - minNum)) + minNum + 1);
        setAttempts(0);
        setMessage(`Угадайте число от ${minNum} до ${maxNum}!`);
        setGuess(0)
    }

    return (
        <div>
            <h1>Угадай число</h1>
            <p>{message}</p>
            <input
                type = "number"
                value = {guess}
                onChange={(e) => setGuess(parseInt(e.target.value))}
                placeholder = "Введите число"
            />
            <button onClick={guessAttempt}>Проверить</button>
            <button onClick={restart}>Перезапустить</button>
        </div>
    );
}

export default GuessTheNumber;