
import { useEffect, useState } from 'react';
import '../assets/css/Row.css';


const colors = (myguess, solution) => {
    return myguess.map((char, i) => {
        if(char === solution[i]) {
            return "green"
        } else if(char !== solution[i] && solution.find(char)) {
            return "yellow"
        } else {
            return "grey"
        }
    });
};


const Row = ({ guess, current, rownum, done, solution }) => {
    const [ myguess, setMyGuess ] = useState([ ...guess ]);

    if(rownum === 1) console.log(done)

    // useEffect(() => {
    //     if(rowNum === current) {

    //     }
    // }, [ myguess ]);


    return (
        <>
            {
                guess.map((char, idx) => {
                    return (
                        <div 
                            key={ idx } 
                            className='letter-box'
                        >{ char.toUpperCase() }</div>
                    )
                }) 
            }
        </>
    );
};

export default Row;