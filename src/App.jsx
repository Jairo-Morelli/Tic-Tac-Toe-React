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
function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>{value}</button>
    );
}
//The winning combinations
function calculateWinner(squares) {
    //Arrays of arrays
    //2D

    /* 
    A two-dimensional array, also known as a 2D array, 
    is a collection of data elements arranged in a grid-like 
    structure with rows and columns. Each element in the 
    array is referred to as a cell and can be accessed by 
    its row and column indices/indexes.

    In Javascript you create two-dimensional arrays in JavaScript
    through jagged arrays.

    You can access the elements of a two-dimensional array using 
    two indices, one fort the row and one for the column. 
    */
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        //what is a 
        //what is b 
        //what is c

        // lines is 
        // the index of the entire array of arrays
        // const [a,b,c] is the the individual queries of the specific array at  
        // the index of lines[i]
        // you're only checking for 3 combinations at a time.
        const [a, b, c] = lines[i];
        // With this if statement you're only comparing the first and the second with and && statement
        // the third is simply selected and then you compare the returned values all together
        // I also believe that this is a per-optimization type of if statement
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }

    }
    return null;
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
function Board({ xIsNext, squares, onPlay }) {
    //const [xIsNext, setXIsNext] = useState(true);
    //use state is a function that returns an object

    /*
        Very interesting thing that I am going to do, because the 
        squares data that I am using is immutiable. Because I used 
        slice() to create a new copy of the squares array after every
        moce, and treated it as immutable. This will allow me to store
        every past version of the squares array, and navigate between 
        the turns that have already happened. 

        I am going to store the past squares arrays in another array called 
        history, which you'll store as a new state variable. The history array
        represents all board states, from the first to the last move, and 
        has a shape like this: 

        // Before first move 
        [null,null,null,null,null,null,null,null,null],
        // After first move 
        [null, null, null, null, "X", null, null, null],
        // After second move 
        [null, null, null, null, 'X', null, null, 'O'],
     */
    // const [squares, setSquares] = useState(Array(9).fill(null));


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
    function handleClick(i) {
        /*
        [...history, nextSquares] creates a new array that contains
        all the items in history, followed by nextSquares. 

        Spread syntax (...) syntax allos an iterable, such as an array 
        or string, to be expanded in places where zero or more arguments (for funtion calls)
        or elemnts ( for array literals) are expected. In an object lieral, the spread
        syntax enumerates the properties of an object and ads the key-value pairs to the
        */

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Current player turn: " + (xIsNext ? "X" : "O");
    }


    /*
    React components need to return a single JSX element and not multiple adjacent JSX 
     elemnts like two buttons. To fix this you can use Fragments (<> and </>) to wrap 
     mutliple adjacent JSX elements.
    */

    // When you were passing onSquareClick={handleClick}, you were 
    // passing the handleClick function down as a prop.
    /*
    I am copying a summary out of one of the React learning documentations
    because I think, thinking like this is actually very good.
    
    Now that your state handling is in the board component, the parent board component
    passes props to the child square components so that htey can be displayed correctly.
    When clicking on a Square, the child Square component now ask the parent Board component
    to update the sate aof the board. When the Board's state changes, both the Board component 
    and every child Square re-rendres automatically. Keeping the state of all squares in the Board 
    component will allow it to determine the winner in the future.

   
    Why immumatability is important 

    Note how in handleClick, you call .slice() to create a copy of the squares array 
    instead of modifying the existing array. TO explain why, we need to discuss immutability and why 
    immutability is important to learn.

    There are generally two approaches to changing data. The first approach is to mutate the 
    data by directly changing the data's values .the second approach is to replace the data
    with a new copy which has the desired changes. Here is what it would look like if you 
    mutated the squares array: 

    const squares = [null,null,nul,null,null,null,null,null,null];
    squares[0] = 'X';
    // Now `squares` is ["X", null,null,null,null,null,null,null,null];

    And here is what it would look like if you changed data wihtout mutating the squares array:
    const squares = [null,null,null,null,null,null,null,null,null];
    const nextSquares= ["X",null,null,null,null,null,null,null,null];


    The result is the same but by not mutating (changing the underlying data) directly, you gain several 
    benefits. 
    Immutability makes comlex features much easier to implement. Avoiding direct data mutation lets you keep previous version of the data intact,
    and reuses them later.

    There is also another benefit of immutability. By default, all child components re-render 
    automatically when the state of a parent component changes. This incldues even the child components 
    that weren't affected by the change. Although re-rendering is not by itsefl noticable to the user 
    ( you shouldn't acitvely try to avoid it!), you might want to skip re-rendering a part of the 
     tree that clearly wasn't affected byt it for performance reasons. Immutability makes it 
     very cheap for components to compare whether their data has changed or not.      
    */
    return (
        <>
            <div className="status">{status}</div>
            <div className="first row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="second row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="third row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}


/* 
This is a top-level component called Game to display a list of past move.
Thats where you will place the histroy state that contains the entire game history.
*/

/* 
    React elements like <button> are regular JavaScript objects; you can pass them around in 
    your application. To render multiple items in React, you can use an array of
    React elements.

    In Javascript, to transform one array into another, you can use the array 
    map method: 

    [1,2,3].map((x)=> x * 2) // [2,4,6]
*/

export default function Game() {
    /*
        To render the squares for the current move, you'll want to read
        the last squares array from the history. You don't need useState for 
        this - you already have enouhg information to calculate it during rendering:
    */
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentTurn = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) // game logic
    {
        // copy the history, then add an additional array entry  
        // next history is the "new" entry to the old history
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        // history is set with "new" entry from nextSquares which in itself is an array
        setHistory([...history, nextSquares]);
        // set the current move, using the "new" history/entry
        setCurrentMove(nextHistory.length - 1);
        console.log(nextHistory);
    }

    /*
    I personally wouldn't write this to be jump to, the have the variable to called next move
    I would change the variable of next move to previous move, because you're going backwards 
    but I understand what next move means, because you technically erase the later moves, you're 
    creating a new history so this, would technically be the next move in a new history. 
    
    But that is not how I am thinking about this.
    */
    function jumpTo(nextMove, lastestMove) {
        setCurrentMove(nextMove);
        setHistory(rewrite_history(nextMove, lastestMove));
        findPreviousTurn();
    }
    function rewrite_history(nextMove, lastestMove) {
        let rewrite = history;
        let difference = lastestMove - nextMove + (-1);
        // depending on the amount of arrays that you are jumping back to 
        // is the amount that you're going to be erasing
        rewrite.length -= difference;
        return rewrite.slice();
    }

    /* 
    * Move is a function within itself, so you calling it in 
    your game's jsx return syntax is it running your move code

    square doesn't get "used in your program"

    the move functor, not only adds the UI, but also displays it.
    
    in order to be able to update the previous moves, you need the exact 
    same piece of code, but only backwards.
    
    going to rename moves to current move

    because this adds, why do you simply just go and check back and re-write

    If you can rewrite the history of moves, so that you're able to increment and deincrement, the total amount of 
    moves themselves then when you return it, the size of what is displayed will increase and shrink accordingly.
    */
    /*
     move really is whatever move you're trying to make and lastest move, is the last move in the history entry. 
     They sound the same and could technically be the same, but in most cases are not.
    */

    // The pervious turn is the previous array entry in the history

    /*
        I had an issue where each time, I wanted to iterate through an array 
        to access a variable, the for loops that I used, got increasingly nastier looking 
        the more arrays I had to go through. 

        I am sure there is something that exist in the standard library, but I am simply going to create it 
        myself.

        In order to iterate through an array, you need to know the dimension of that array, and the element of interest you want to recieve
    */


    function array_equals(a, b) {
        /*
            The problem you're facing here it, it isn't returning the 
            array length that you want, it is getting stuck on returning

            an array with the length of one, instead of a primitive value
        */
        return a.length === b.length && a.every(function (value, index) {
            return value === b[index];
        });
    };
    /*
        Array that converts char to unicode 

        Because I can assume that I will always know the row of a 2D array, 
        I am creating a function of conversation of symbols in a 2D array.
    */
    function arrayConverterCharToUni(array) {

        let ConvertedArray = array.slice();
        let rowLength = array.length;
        // This should be the whole length of the "column" entry of an array.
        let columnLength = array[0].length;

        for (let i = 0; i < rowLength; i++) {
            for (let j = 0; j < columnLength; j++) {
                /*
                I don't think you want to assign arrays like 
                this 
                */
                let convertedValue = null;
                if (array[i][j] != null) {
                    convertedValue = array[i][j].charCodeAt(0);
                } else {
                    //This is the supposed uni-code value for null
                    convertedValue = 0x00;
                }
                ConvertedArray[i][j] = convertedValue;
            }
        }
        return ConvertedArray;
    }

    /*
    Lol the problem literally is that the recursive function 
    doesn't know when the "end" actually. 

    okay so what I think it does right before, it acutally access the array elements 
    individually, it will actually access the first element of an array, but in the context 
    of being an array and not a primitive value. 

    This is where you code gets stuck, it is in a forever loop because its data things 
    that it is an array accessing the first element, or an array accessing an element. Instead of 
    simply returning an element.
    */
    function getdim(arr) {
        console.log("array length");
        console.log(arr.length);
        if (/*! (arr instanceof Array) || */ !arr.length) {
            return []; // currently array has no dimension
        }

        //I feel like the problem is actually here
        let dim = arr.reduce(function (result, current) {
            // check each element of arr against the first element
            // to make sure it has the same dimensions
            return array_equals(result, getdim(current)) ? result : false;    //result is a number

        }, getdim(arr[0])); // The problem with your code, is that 
        // it is literally returning nothing. like worse than null

        // dim is either false or an array 
        return dim && [arr.length].concat(dim); //this piece of code will either come out 
        // true if dim is a number and [arr.length] + dim is an array
        // this can literally return both a boolean and a physical array
        // that is a combination of the temporary array and dim.
    }

    /*
    count the dimensions of an array
    */
    function size(array_) {

    }
    function findPreviousTurn() {


        const previousMoveSet = history.map((squares, moves) =>{
            let inverseIsNext = !currentTurn;
            let inverseMark;
    
            if (inverseIsNext) {
                inverseMark = "X";
            } else {
                inverseMark = "O";
            }

            class id{
                constructor(id, key, markplace)
                {
                    this.id = id;
                    this.key= key;
                    this.markplace= markplace;
                }
            }

            id[Symbol.iterator] = function* () {
            }

            let Ids=[...id];
            //check for special condition if array doesn't have any move entries.
            let moveSet = history.slice(history.length,-1);
            let idIndex=0;
            let key=moves;
            let lastMove=Ids.length;


            //Create this as a function 
            //what this does is store all the valid previous moves
            //the reason this is important is because I have access 
            //to all the moves that very existed without having to 
            //cycle through an 2D array, with null values

            // the only thing that matters here really, is the 2n last array. You 
            // don't want to iterate through all the valid moves to exist ever. Just 
            // the previous one
            for (let i = 0; i < moveSet.length; i++) {
                //index of an array
                for (let j = 0; j < moveSet[0].length; j++) {
                    //grab any valid move entry
                    if (moveSet[i][j] != null) {
                        /*
                        The id of an array is its phyiscal index of 
                        the array that we use to store, the moves. 
                        */
                        Ids.push(new id(idIndex, key, moveSet[i][j]));
                        idIndex++;
                    }
                }
            }

            for (let i =0; i < moveSet.length; i++)
                {
                    for(let j=0; j < moveSet[0].length; j++)
                    {
                            if(Ids[lastMove].markplace == moveSet[i][j] && Ids[lastMove].id== moveSet)
                            {
                            console.log("found previous move");
                            console.log(moveSet);
                            console.log(Ids[lastMove]);
                            return Ids[lastMove];
                            }
                    }
                }
        });

        /* Inverse the current turn 
           in order to get the pervious turn.
           */
   

        /* Iterable protocol
        Okay so JavaScript has a functionality in the language 
        that talks about iteration protocols. Iteration protocols 
        aren't new built-ins or syntax, but protocols. 

        The iterable protocol allows JavaScript objects to define or customize
        their iteration behaviour, such as what values are looped over 
        in a for...of contruct. Some built-in types are built-in iterables
        with a deafult iteration behaviour, such as Array or Map, while other types
        are not.

        In order to be iterable, an object must implement the [Symbol.iterator]() method,
        meaning that the object (or one of the objects up its prototype chain) must have a 
        property with a [Symbol.iterator] key which is avaliable via constant Symbol.iterator

        This function can be an oridnary function, or it can be a generator function, 
        so that when invoked, an iterator object is returned.  Inside of this 
        generator function, each entry can be provided by using yield.

        Iterator protocol
        The iterator protocol defines a standard way to produce a sequence of values (either finite or infinite),
        and potentially a return value when all values have been generated.

        An object is an iterator when it implements a next() method with the following
        semantics: 

        next() 
        A function that accepts zero or one arugment and returns an object 
        conforming to the IteratorResult interface (see below). If an non-object 
        value gets returned (such as false or undefined) when a built
        -in language feature (such as for...of) is using the iterator, a 
        TypeError ("iterator.next9) returned a non-object value") will be 
        thrown.

        All iterator protocol methods (next(),return(), and throw()) are expected
        to return a object implementing the IteratorResult interface. 

        */
        ////
        /*
        In order for me to be able to use id as a iterable object I have to know how to implement 
        a interface.
        //////
 
        In JavaScript, an interface can be thought of as a set of method signatures that 
        a class must implement. You can define an interface as an empty object containing 
        method names and their associated function signatures.
 
        To implement an interface, you create a class and ensure that it contains methods 
        with the same names and signatures as specified in the interface. If your class lacks any 
        of the required methods, it won't satisfy the interface.
        */
        // class id {
        //     constructor(id, key, markPlace) {
        //         //id in the array
        //         this.id = id;
        //         //key in the actual list
        //         this.key = key;
        //         this.markPlace = markPlace;
        //     }

        // }
        /*
        Just some interesting things about this 
        this is a property not an actual function. So what 
        you're doing is like inherting a property not implementing
        a interface/funciton. 
        */
        // id[Symbol.iterator] = function* () {
        // }

        // let Ids = [...id];
        // let moveSet = history.slice(0, -1);
        // let idIndex = 0;

        /*
            Here what you're doing is assigning 
            ids to valid moves, in the moveset you're accessing 
        */
        // for (let i = 0; i < moveSet.length; i++) {
        //     //index of an array
        //     for (let j = 0; j < moveSet[0].length; j++) {
        //         //grab any valid move entry
        //         if (moveSet[i][j] != null) {
        //             idIndex++;
        //             /*
        //             The id of an array is its phyiscal index of 
        //             the array that we use to store, the moves. 
        //             */
        //             Ids.push(new id(idIndex, idIndex, moveSet[i][j]));
        //         }
        //     }
        // }

        //Now with the identified moves/marks whatever you want to call them
        // see which one has existed for the least amount of time, by checking the further previous entries
        // well I know that the entry before the pervious entry is how you can properly identify the last move
        // I don't know if I should rely on this type of logic when it comes to creating my programs

        /*
        Yeah so all of this works pretty much. But the way you coded it, is terrible. You have to get 
        better at programming.
        */

        //checking the 2nd last entry

    //  let previousMoveSet = moveSet;
    //     for (let i =0; i < previousMoveSet.length; i++)
    //     {
    //         for(let j=0; j < previousMoveSet[0].length; j++)
    //         {
    //             for(let k =0; k < Ids.length; k++)
    //             {
    //                 console.log("found previous move");
    //                 console.log(moveSet);
    //                 console.log(Ids[k]);
    //                 return Ids[k];
    //             }
    //         }
    //     }
    }


    const moves = history.map((squares, move) => {
        let description;
        let latestPosition = history.length;

        //you can store the moves in an array with a key having the value of the 
        //current move true or false
        // console.log(latestPosition);
        if (move > 0) {
            //change description to "current move"
            description = `you are at move #` + move;
        } else {
            // The description of the very first intial start
            description = `go to game start`;
        }
        /*
        When you render a list, React stores some information about each rendered list item. 
        When you update a list, React needs to determine what has changed. You could have added,
        remove, re-arranged, or updated the list's items.
        
        Imagine transitioning from
        <li>Alexa: 7 tasks left</li>
        <li>Ben: 5 tasks left</li> 
ser.taskCount} tasks left
        </li>
 
        When a list is re-renderd, React takes each list item's key and searches the previous list's items for a matching
        key. If the current list has a key that didn't exist before, React creates a component. If the
        current list is missing a key that existed in the previous list, React destroys the previous component.
        If two keys match, the corresponding component is moved.
        
        Keys tell Reac agbout the identity of each component, which allow s React to maintain state between 
        re-renders. If a compoennt's keys chagnes, the component will be destrotyed and re-created with a new state.
 
        key is a special and reserved property in React. When an element is created, React extracts the key
        property and stores the key directly on the returned element. Even though key may look like it is 
        passed as props, React automatically uses key to deccdie which components to update. There's no 
        way for a component to ask what key its parent specified.
 
        It's strongly recommended that you assign proper keys whenever you build dynamic lists. If you don't
        have an appropriate key, you may want to consider restructuring your data so that you do.
 
        If no key is specified, React will report an error and use the array index as a key by default. Using 
        the array index as a key is problematic when trying to re-order a list's items or inserting/removing list 
        items. Explicitly passing key={i} silences the error but has the same problems as array indices and is not 
        recommended in most cases.
 
        Keys do not need to be globally unique; they only need to be unique between components and their siblings.
        */

        /*
                You need to be able to identify the pervious move using the history avaliable to you. 

                once you know how to properly identify the last move, then you'll be able to add and remove buttons.
        */
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move, latestPosition)}>{description}</button>
            </li>
        );

        const removeMoves = ((lastMove) => {


            lastMove = findPreviousTurn();


        });
        /*
        Because I can now manipulate my moves array, I could easily display a current move display 
        and a time travel display 
        when it comes to the return html code 
         
        each time I call return I am actually adding things, not assigning things.

        make current move paragraph
        */
    });


    /*
    Specific React type coding, whatever type of JSX, element you return is what is going 
    to be rendered. so the thing is, technically, you might just be able to consistently
    modify React.JSX.Elements without rendering them to the screen until they are completely done. 

    Once they are done, you might be able to then render exactly what you want.
    */

    /*
    There are a couple of ways I can add in my previousMove functor into my game functions rendering
    first is that I somehow combined but my previous move and my current move into one variable. Which I wouldn't reccomend 

    The second way, is that I have both pieces of code current functor and previous move functor run one after another. 

    I know they sound the same, but they is probably a difference in outcome. 

    I am going with the logic of once, I add a UImove, I am going to set the previous UImove to a button.
    */

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={currentTurn} squares={currentSquares} onPlay={handlePlay} />
            </div>
            <div className="game-info">
                <ol className="game-ui">
                    {moves}
                </ol>
            </div>
        </div>
    )
}
