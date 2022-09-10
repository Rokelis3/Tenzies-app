import React, { useEffect } from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function Main (){

    const [allDice , setAllDice] = React.useState(tenRandomDice())

    const [tenzies, setTenzies] = React.useState(false)

    useEffect(()=>{
        const allHeld = allDice.every(die => die.isHeld)
        const firstValue = allDice[0].value
        const allSameValue = allDice.every(die => die.value === firstValue)
        if (allHeld && allSameValue){
            setTenzies(true)
            console.log("You won!")
        }
        
    }, [allDice])

    function generateNewDie(){
        return{
            value: Math.floor(Math.random() * 6) + 1, 
            isHeld: false,
            id: nanoid()}
    }

    function tenRandomDice(){
        const numberArray = []
        for(let i = 0 ; i<10 ; i++){
            numberArray.push(generateNewDie())
        }
        return numberArray
    }

    const dices = allDice.map(number =>{
        return <Die key={number.id} value={number.value} isHeld={number.isHeld} holdDice={()=> holdDice(number.id)}/>
    })

    function roll(){
        if(!tenzies){
        setAllDice(oldDice => oldDice.map(die =>{
            return die.isHeld ? die : generateNewDie()
        }))}else{
            setTenzies(false)
            setAllDice(tenRandomDice())
        }
    }

    function holdDice (id){
       setAllDice(oldDice => oldDice.map(die=> {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die;
        }))
    }


    return(
        <div className="mainContainer">
            {tenzies &&  <Confetti />}
            <div className="mainInner">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                <div className="diceContainer">
                    {dices}
                </div>
                <button className="roll" onClick={roll}>{tenzies ? "Restart" : "Roll"}</button>
            </div>
        </div>
    )
}


  export default Main;
  