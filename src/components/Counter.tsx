import { useState } from 'react';
import classes from "./Counter.module.scss";

export const Counter = () => {
    const [counter, setCounter] = useState(0);


    return (
        <div>
            <div className={classes.btn}>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>+</button>
            <button onClick={() => setCounter(counter - 1)}>-</button>
        </div>
    )
};
