import React from 'react';
import propTypes from 'prop-types';
import './App.css';
import './bootstrap.min.css'
import { Link } from 'react-router-dom';

function Hero(){
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the correct choice</p>
      </div>
    </div>
  );
}

function Book({book, onAnswerSelected}){
  return (
    <div className="answer" onClick={() => onAnswerSelected(book)}><h4>{book}</h4></div>
  );
}


function  getHighligtedColor(highlight){
  const color = {
    'none': '',
    'wrong':'red',
    'correct':'green'
  };

  return color[highlight];
}



//Turn: 
function Turn({author,books, highlight, onAnswerSelected}){
  //console.log(author.imgUrl);
  return (
    <div className="row turn" style={{backgroundColor: getHighligtedColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imgUrl} alt={author.name} className="authorimg" />
      </div>
      <div className="col-6">
        {books.map((book)=><Book book={book} key={book} onAnswerSelected={onAnswerSelected}></Book>)}
      </div>
    </div>
  );
}

Turn.propTypes = {
  author: propTypes.shape({
    name: propTypes.string.isRequired,
    imgUrl: propTypes.string.isRequired,
    books: propTypes.arrayOf(propTypes.string).isRequired
  }),
  books: propTypes.arrayOf(propTypes.string).isRequired,
  onAnswerSelected: propTypes.func.isRequired,
  highlight: propTypes.string.isRequired

};




function Continue({show, onContinue}){
  return (
    <div className="row continue">
      
      { show?
      <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
        : null
      }
      
    </div>
  );
}

function Footer(){
  return (
    <div className="row" id="footer">
      <div className="col-11 ">
        <p className="text-muted credit">These images are from Wikimedia Commons</p></div></div>
  );
}




function AuthorQuiz({turnData, highlight, onAnswerSelected,onContinue}) {
  return (
    <div className="container-fluid">
      <Hero />
      <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
      <Continue show={highlight === 'correct'} onContinue={onContinue} />
      <p><Link to="/add">Add an Author</Link></p>
      <Footer />
    </div>
  );
}

export default AuthorQuiz;
