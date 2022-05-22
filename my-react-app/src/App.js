import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';



class App extends Component {
  state = {
    persons : [
      {id: 'dsda',name: "Yashas", age: 23},
      {id: 'dssd',name: "Ullas", age: 27},
      {id: 'dsss',name: "Pragathi", age: 23},
    ],
    otherState: 'some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    // console.log("Was this clicked")
    // this.state.persons[0].name = "Yashas Acharya"

    this.setState({
      persons : [
        {name: newName, age: 23},
        {name: "Ullas", age: 27},
        {name: "Pragathi", age: 21},
      ]
    })
  }

  nameChangedhandler = (event, id) => {

    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }


    // const person = Object.assign({}, this.state.persons[personIndex])
    person.name = event.target.value;

    const persons = [...this.state.persons]
      
    

    persons[personIndex] = person

    this.setState({
      persons : persons
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons})
  }

  render() {

    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map((person,index) => {
              return <Person 
              name={person.name} 
              age={person.age} 
              click={() => this.deletePersonHandler(index)} 
              key={person.id}
              changed={(event) => this.nameChangedhandler(event,person.id)}/>
            })
          }
        </div>
        
      );

      style.backgroundColor = 'red'
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];

    if (this.state.persons.length <=2 ) {
      classes.push('red');
    }

    if (this.state.persons.length <=1 ) {
      classes.push('bold')
    }
    return (
      <StyleRoot>
        <div className='App'>
          <h1>Hi, I am React Application</h1>
          <p className={classes.join(' ')}>Here we testing the rendering of single compoenent</p>
          <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
        </div>
      </StyleRoot>

      // React.createElement('div',{className: 'App'},React.createElement('h1','null','This is what it compiles to in the end.'))
      
    );
  }
}

export default Radium(App);
