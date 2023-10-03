
import { useEffect, useRef, useState } from 'react';
import '../assets/css/Board.css';
import Row from './Row';
import value from '../values.json';

//solution code: value[0].solution.split("")

const guess_dict = { 
    1: new Array(5).fill(""), 
    2: new Array(5).fill(""),
    3: new Array(5).fill(""),
    4: new Array(5).fill(""),
    5: new Array(5).fill(""),
    6: new Array(5).fill("")
};


const array_first_empty_char = (array) => {

    return array.findIndex(char => char === ""); 
} 


const Board = () => {
    const [ guesses, setGuesses ] = useState({ ...guess_dict });
    const [ rowdone, setRowDone ] = useState([ false, false, false, false, false, false ]);
    const [ gameOver, setGameOver ] = useState(true);
    
    const currentGuess = useRef(1)
    const currentChar = useRef(0);
    const keyboard = useRef();



    // update guess state
    const handleKeyDown = (char) => {
        let mywords = { ...guesses };

        mywords[currentGuess.current][currentChar.current] = char;

        setGuesses(prev => (prev, { ...mywords }));
    };


    const handleBackspace = () => {
        let mywords = { ...guesses };

        if(currentChar.current === -1) {
            mywords[currentGuess.current][4] = "";
        } else {
            mywords[currentGuess.current][currentChar.current - 1] = "";
        }

        setGuesses(prev => (prev, { ...mywords }))
    };


    // keyboard updater
    keyboard.current = (e) => {

        currentChar.current = array_first_empty_char(guesses[currentGuess.current]);  

        if(e.keyCode === 13) {
            if(currentChar.current === -1) {
                if(currentGuess === 6) {
                    setGameOver(false);
                }

                currentGuess.current += 1;

                let row_done = [ ...rowdone ];
                row_done[currentGuess - 1] = true;

                setRowDone([ ...row_done ]);
            } 
        }

        if(e.keyCode >= 60 && e.keyCode <= 90) {
            handleKeyDown(e.key);

        }

        if(e.key === "Backspace") {

            handleBackspace();
        }
    };
    


    useEffect(() => {
        document.addEventListener('keydown', keyboard.current);

        return () => document.removeEventListener('keydown', keyboard.current);

    }, []);


    useEffect(() => {
        if(gameOver === false) {
            alert('Game Over');
            return () => document.removeEventListener('keydown', keyboard.current);
        }
    }, [ gameOver ])


    return (
        <div 
            className="board"
            style={{
                width: "25%",
            }}
        >
            <div><Row guess={guesses[1]} done={rowdone[0]} rownum={1} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
            <div><Row guess={guesses[2]} done={rowdone[1]} rownum={2} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
            <div><Row guess={guesses[3]} done={rowdone[2]} rownum={3} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
            <div><Row guess={guesses[4]} done={rowdone[3]} rownum={4} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
            <div><Row guess={guesses[5]} done={rowdone[4]} rownum={5} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
            <div><Row guess={guesses[6]} done={rowdone[5]} rownum={6} current={ currentGuess.current } solution={ value[0].solution.split("") }/></div>
        </div>
    )
};

export default Board;