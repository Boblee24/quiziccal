import React from "react"
import {decode} from 'html-entities';


export default function Second(props){
    
    // function handleClick(){
    //    return props.selectedAnswer === props.correctAnswer ? console.log('correct') : console.log('incorrect')
    // }
    const handleAnswerClick = (answer, currentQuestion) => {
        props.updateAnswer(currentQuestion, answer);
     };
    
    // console.log(selectedAnswer)
    return(
    
        <section className="section2">
            <h2 className="question">{decode(props.question)}</h2>
            <div className="box_for_options">
            {
                props.answers.map((answer, index) => (
                    !props.checkanswers ?
                    <button 
                    className={`${props.selectedAnswer === answer ? props.checkanswers ? "wrongoption" : "selected" : ""} ${props.showResult && answer === props.correctAnswer ? "correct" : ""}`} 
                        key={index} onClick={() => handleAnswerClick(answer, props.question)}>
                        {decode(answer)}
                    </button>:
                    <button 
                    className={`${props.selectedAnswer === answer ? props.checkanswers ? "wrongoption" : "selected" : "opacity"} ${props.showResult && answer === props.correctAnswer ? "correct" : ""} ${'opacity'}`} 
                        key={index} >
                        {decode(answer)}
                    </button>
                )
            )}
            </div>
            <hr/>
        </section>
    )
}