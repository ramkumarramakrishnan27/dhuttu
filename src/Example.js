import React, { useState } from "react";

const Example = () => {
    function handleNameChange(){
        const names = ["Earn","Grow", "Give"];
        const int = Math.floor(Math.random()*3);
        return names[int];
    }
    const handleClick = (e) => {
        console.log(e.target)
    }
    const handleClick2 = (name) => {
        console.log(`Thanks for the support2 ${name}`)
    }

    // function getName(){
    //     return console.log("Printing name...")
    // }
    const [count, setCount] = useState(99)
    //Dont call () - as it will execute all useState call (Performance)
    //const [name, setName] = useState(getName())
    //const [name, setName] = useState(() => getName())
    //Dont pass object into useState. Object's propert & local variable may conflict
    //const [name, setName] = useState({count:4,text:"like"})

    function incrementFunction(){
        //setCount(count+1) //Count = 100
        //setCount(count+1) //Count = 100
        //setCount((count) => {return count + 1}) //Count = 101
        setCount(prevCount => prevCount + 1) //Count = 100
    }

    function decrementFunction(){
        setCount(prevCount => prevCount - 1)
    }

    const [newName, setNewName] = useState("Earn")
    function getNewNameFromHook(){
        const names = ["Earn","Grow", "Give"];
        const int = Math.floor(Math.random()*3);
        setNewName(names[int]);
    }

    return (
        <main>
            <p>Lets {handleNameChange()}</p>
            {/* this will be called each UI actions - danger */}
            {/* <button onClick={handleClick2('1')}>Subcribe</button> */}
            <button onClick={()=>handleClick2('Bala')}>Subcribe</button>
            <button onClick={(e)=>handleClick(e)}>Subcribe</button>
            
            <button onClick={incrementFunction}>+</button>
            <button>{count}</button>
            <button onClick={decrementFunction}>-</button>
            {/* <button onClick={decrementFunction()}>-</button> */}
            <button onClick={getNewNameFromHook}>Subcribe</button>
            <p>{newName}</p>
        </main>
    )
}

export default Example