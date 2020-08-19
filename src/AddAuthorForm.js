import React from 'react';
import './AddAuthorForm.css';

class AuthorForm extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            name: "",
            imgUrl: "",
            books: [],
            bookTemp:''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        
    }

        onFieldChange(event){
            this.setState({
                [event.target.name]: event.target.value
            });
        }

        handleSubmit(event){
            event.preventDefault();
            this.props.onAddAuthor(this.state);
        }

        handleAdd(event){
            event.preventDefault();
            this.setState({
                books: this.state.books.concat(this.state.bookTemp),
                bookTemp: ''
            });
        }
    

    render(){
        return (
        <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm_input"  >
                <label htmlFor="name">Name </label>
                    <input type="text" name='name' value={this.state.name} onChange={this.onFieldChange} />
            </div>
            <div className="AddAuthorForm_input" >
                <label htmlFor="imgUrl">Image URL </label>
                    <input type="text" name='imgUrl' value={this.state.imgUrl} onChange={this.onFieldChange} />
            </div>

            <div className="AddAuthorForm_input" >
            {
                this.state.books.map((book) => <p key={book}>{book}</p>)
            }
                <label htmlFor="bookTemp">Add Books </label>
                    <input type="text" name='bookTemp' value={this.state.bookTemp} onChange={this.onFieldChange} />
                    <input type="submit" value="+" onClick={this.handleAdd} />
            </div>
            
            
            
            <input type="submit" value="Add" />
        </form>);
    }




} //class ends


function AddAuthorForm({match, onAddAuthor}){
    return (<div className="AddAuthorForm" >
    <h1>Add an Author</h1>
    <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>);
  
  }
  export default AddAuthorForm;