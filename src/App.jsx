import { useState } from "react";


/*
* In order to add modularity to your code, you can use something called 
    props to pass the value each square should have from the parent component
    (Board) to its child (Square).
*/

/*
 React provids a sepcial function called useState that you can call from your component
 to let it "remember" things. Let's store the current value of the square in state, 
 and change it when the Square is clicked. 
*/

// When you input the { } the curly braces in JSX 
// you're escaping to javascript.
function Square({value, onSquareClick})
{
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}



/*
The code in App.js creates a component. In React, a component is a piece of 
resuable code that represents a part of user interface. Components are used to render,
manage, and update the UI elements in your applications.
*/

// The first line defines a function called square. The export JavaScript keyword 
// makes the function accessible outside of this file.

/*
To collect dat from multiple children, or to have two child components communicate with 
each other, declare the shared state in their praent component instead. The parent component
can pass that state back down to the children via props. This keeps the child component in sync with
each other and with their parents.

Lifting state into a parent component is common when React components are refactored.
*/
export default function  Board()
{
    const [squares, setSquares] = useState(Array(9).fill(null));


    /*
    * Calling the setsquares fucntions lets React know the state of the 
    component has changed. This will trigger a re-render of the components
    that use the squares state (Board) as well as its child components 
    (the Square components that make up the board).

    JavaScript supports closures which means an inner function (e.g handleClick) 
    has access to variables and functions defined in an outer function (e.g Board). The handle
    Click function can read the sqaures state and call the setSquares method because 
    They are both defined inside of the Board function.
    */
    function handleClick(i)
    {
        const nextSquares = squares.slice();
        nextSquares[i] = "X";
        setSquares(nextSquares);
    }

    /*
    React components need to return a single JSX element and not multiple adjacent JSX 
     elemnts like two buttons. To fix this you can use Fragments (<> and </>) to wrap 
     mutliple adjacent JSX elements.
    */

     // When you were passing onSquareClick={handleClick}, you were 
     // passing the handleClick function down as a prop.
    return(
    <> 
    <div className="first row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="second row">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="third row">    
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
    );
}