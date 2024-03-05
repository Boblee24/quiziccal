import React from "react";
import Main from "./components/main";
import Second from "./components/Second";
import "./App.css";
import "./style.css";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import Header from "./components/Header";
// import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

decode("&lt; &gt; &quot; &apos; &amp; &#169; &#8710;");

function App() {
  // const client = new QueryClient()
  const [firstPage, setFirstPage] = React.useState(false);
  const [question, setQuestion] = React.useState([]);
  const [showResult, setShowResult] = React.useState(false);

  const [numOfCorrectAnswer, setNumOfCorrectAnswer] = React.useState(0);

  //Shuffling array
  const shuffle = (array) => {
    // Fisher-Yates shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  function fetchData() {
    fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => res.json())
  .then((data) => {
    // Check if data.results is an array and has elements
    if (Array.isArray(data.results) && data.results.length > 0) {
      const extractedQuestion = data.results.map((question) => {
        const answer = [...question.incorrect_answers, question.correct_answer];
        return {
          id: nanoid(),
          question: question.question,
          answers: shuffle(answer),
          correctAnswer: question.correct_answer,
          selectedAnswer: "",
        };
      });
      setQuestion(extractedQuestion);
    } else {
      // Handle the case where there are no results (optional)
      console.warn("No questions retrieved from API.");
      // You can display a message to the user here
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    // Handle potential errors during data fetching (optional)
  });
  }
  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
  .then((res) => res.json())
  .then((data) => {
    // Check if data.results is an array and has elements
    if (Array.isArray(data.results) && data.results.length > 0) {
      const extractedQuestion = data.results.map((question) => {
        const answer = [...question.incorrect_answers, question.correct_answer];
        return {
          id: nanoid(),
          question: question.question,
          answers: shuffle(answer),
          correctAnswer: question.correct_answer,
          selectedAnswer: "",
        };
      });
      setQuestion(extractedQuestion);
    } else {
      // Handle the case where there are no results (optional)
      console.warn("No questions retrieved from API.");
      // You can display a message to the user here
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    // Handle potential errors during data fetching (optional)
  });
  }, []);

  function numberOfAnswer() {
    question.forEach((questionObject) => {
      if (questionObject.selectedAnswer === questionObject.correctAnswer) {
        setNumOfCorrectAnswer((previous) => previous + 1);
      }
    });
  }

  //checking answer

  function checkanswers() {
    setShowResult(true);
    numberOfAnswer();
  }

  // reset state
  function restart() {
    setFirstPage(false);
    setShowResult(false);
    setNumOfCorrectAnswer(0);
    fetchData();
    // setQuestion([])
  }

  function updateAnswer(currentQuestion, answer) {
    setQuestion(
      question.map((questionObject) => {
        // if it is the question being answered, update its selected answer
        return questionObject.question === currentQuestion
          ? { ...questionObject, selectedAnswer: answer }
          : questionObject;
      })
    );
  }

  function createQuiz() {
    const submit = (
      <div className="welcome">
        {showResult ? (
          <div>
            <span>
              You scored {numOfCorrectAnswer}/{question.length} correct answers
            </span>{" "}
            <button className="welcome_button" onClick={restart}>
              Play Again
            </button>
          </div>
        ) : (
          <button onClick={checkanswers} className="welcome_button">
            Check answer
          </button>
        )}
      </div>
    );
    const quizComponents = question.map((quiz, index) => (
      // console.log(quiz.answer[3]),
      <Second
        key={question.id}
        question={quiz.question}
        correctAnswer={quiz.correctAnswer}
        answers={quiz.answers}
        selectedAnswer={quiz.selectedAnswer}
        updateAnswer={updateAnswer}
        showResult={showResult}
        checkanswers={showResult}
        // onAnswerChange={(selectedAnswer) => handleAnswerChange(question.id, selectedAnswer)}
      />
    ));
    return [<div className="bag">{quizComponents}</div>, submit];
  }

  function changePage() {
    setFirstPage(true);
  }
  return (
    <div className="wrapper">
      {/* <QueryClientProvider> */}
      <div className="container">
        <Header/>
        {firstPage ? createQuiz() : <Main changePage={changePage} />}
      </div>
    {/* </QueryClientProvider> */}
    </div>
  );
}
export default App;
