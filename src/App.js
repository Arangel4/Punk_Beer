import React, { Component } from 'react';
import './App.css';
import BeerPanel from './BeerPanel'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theBeers: [],
    };
  }

  // Get the data
  fetchData() {
    // Use fetch functin and callbacks to transform the data to a JSON structure.
    fetch("https://api.punkapi.com/v2/beers") // Gets the raw text data.
    .then(response => response.json())        // Transform the text data to JSON.
    .then((theseBeers) => {                   // Store the transformed JSON beer data in the state.
      this.setState({
        theBeers: theseBeers,
      },
      // For checking purposes, use the optional second argument to pass a function to see if the state change worked.
      () => {
        console.log(`The beers retrieved are ${this.state.theBeers}`);
      });
    });
  }

  // Use the React method ComponentDidMount() for retrieving data
  componentDidMount() {
    // call your fetchData() method here in order to populate the state with the 25 beer JSON objects
    this.fetchData();
  }

  render() {
    // Build all 25 beer panels
    let theBeerPanels = [];
    for (let i = 0; i < this.state.theBeers.length; i++) {
      theBeerPanels.push(<BeerPanel beer={this.state.theBeers[i]} />);
    }
    return (
      <div className="App">
        <h1 className="title">25 Different Beers</h1>
          {theBeerPanels}
      </div>
    );
  }
}

export default App;
