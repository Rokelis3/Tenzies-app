function Die (props){

    return(
        <div className={`dieElement ${props.isHeld ? 'isClicked' : ''}`} onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Die;