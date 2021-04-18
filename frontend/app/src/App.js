import './App.css';
import React, { Component } from "react";
import List from "@material-ui/core/List";

import Business from "./components/Business";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }
  }
  componentDidMount() {
    fetch('https://ihxhi2nz68.execute-api.us-east-1.amazonaws.com/production?location=San%20Jose')
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      })
  }

  render() {

    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1>Milk Tea Businesses</h1>
          <List component="nav">
            {items.map(item => (<Business key={item.id} id={item.id} name={item.name} address={item.location.address1}/>))}
          </List>
        </div>
      );
    }

  }
}

export default App;
