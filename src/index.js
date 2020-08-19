import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AddAuthorForm from "./AddAuthorForm.js";
import AuthorQuiz from "./AuthorQuiz";
import * as serviceWorker from "./serviceWorker";
import { sample, shuffle } from "underscore";
import { BrowserRouter, Route, withRouter } from "react-router-dom";

//<img src={logo} className="App-logo" alt="logo" />

const authors = [
  {
    name: "William Shakespear",
    imgUrl: "images/shake.jpg",
    books: ["Romeo & Juliet", "The Tempest"],
  },
  {
    name: "Mark Twain",
    imgUrl: "images/mark.jpg",
    books: ["The mysterious Stranger", "What is Man?"],
  },
  {
    name: "JK Rowling",
    imgUrl: "images/jk.jpg",
    books: ["The Harry Potter Series"],
  },
];

function getAuthorData(authors) {
  //console.log(authors);

  const allbooks = authors.reduce(function (acc, ele) {
    return acc.concat(ele.books);
  }, []);

  //console.log("ALL BOOKS"+allbooks);

  const four = shuffle(allbooks).slice(0, 4);
  const answer = sample(four);

  //console.log("Four", four);

  return {
    books: four,
    author: authors.find((author) =>
      author.books.some((title) => title === answer)
    ),
  };
}

function resetState() {
  return {
    turnData: getAuthorData(authors),
    highlight: "",
  };
}

let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some(
    (title) => title === answer
  );
  state.highlight = isCorrect ? "correct" : "wrong";

  render();
}

function onContinue() {
  state = resetState();
  render();
}

function App() {
  return (
    <AuthorQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
      onContinue={onContinue}
    />
  );
}

const AuthorWrapper = withRouter(({ history }) => {
  return (
    <AddAuthorForm
      onAddAuthor={(author) => {
        //console.log(author);
        authors.push(author);
        history.push("/");
      }}
    />
  );
});

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route exact path="/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
