import './App.css';
import React, { Component } from "react";
import List from "@material-ui/core/List";
import { Input, Button } from 'semantic-ui-react';
import Business from "./components/Business";

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      business: '',
      location: '',
    }
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('https://ihxhi2nz68.execute-api.us-east-1.amazonaws.com/production?location=San%20Jose') // TODO call backend api to find biggest hits
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
  }
  // handles any changes that are made in the business input 
  handleBusinessChange(event) {
    this.setState({business: event.target.value});
  }
  // handles any changes that are made in the location input 
  handleLocationChange(event) {
    this.setState({location: event.target.value});
  }

  // handles when the search button is pressed
  handleSubmit(event) {
    alert('business: ' + this.state.business + ', location: ' + this.state.location);
    event.preventDefault();
    this.setState({isLoaded: false});
    fetch('https://ihxhi2nz68.execute-api.us-east-1.amazonaws.com/production?location=' + this.state.location) // TODO call backend api 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });

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
          <form onSubmit={this.handleSubmit}>
          <Input id='business' icon='coffee' iconPosition='left' placeholder='Business Name' value={this.state.value} onChange={this.handleBusinessChange}/>
          <Input id='location' icon='location arrow' iconPosition='left' placeholder='City (e.g. San Jose, CA)' value={this.state.value} onChange={this.handleLocationChange}/>
          <Button type='submit'>Search</Button>
          </form>
          <List component="nav">
            {items.map(item => (<Business key={item.id} id={item.id} name={item.name} address={item.location.address1}/>))}
          </List>
        </div>
      );
    }

  }
}

export default App;
