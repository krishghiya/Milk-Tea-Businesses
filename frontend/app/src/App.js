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
      businessName: '',
    }
    this.handleBusinessChange = this.handleBusinessChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch('http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/popular') 
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
    this.setState({ businessName: event.target.value });
  }
  // handles any changes that are made in the location input 
  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  // handles when the search button is pressed
  handleSubmit(event) {
    this.setState({ isLoaded: false 
    });
    
    if(this.state.businessName === '') {
    fetch('http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?location=' + this.state.location) 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
    } else if(this.state.location === '') {
      fetch('http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?name=' + this.state.businessName) 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
    } else {
      fetch('http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?name=' + this.state.businessName + '&location=' + this.state.location) 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
    }

    this.setState({
      businessName: '',
      location: '',
    });

  }

  render() {

    const { error, isLoaded, items } = this.state;


    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const url = window.location.href;
      //var urlItems = url.split('https://main.d3bwujt20ylxxp.amplifyapp.com/')
      var urlItems = url.split('http://localhost:3001/')
      if (urlItems[0] === '' && urlItems[1] === '') { // if no search queries are made, display default (based on business hits)
        return (
          <div className="App">
            <h1>Gimme Tea!</h1>
            <form onSubmit={this.handleSubmit}>
              <Input id='business' icon='coffee' iconPosition='left' placeholder='Business Name' value={this.state.value} onChange={this.handleBusinessChange} />
              <Input id='location' icon='location arrow' iconPosition='left' placeholder='City (e.g. San Jose, CA)' value={this.state.value} onChange={this.handleLocationChange} />
              <Button type='submit'>Search</Button>
            </form>
            <List component='nav'>
              {items.map(item => (<Business key={item.id} id={item.id} name={item.name} address={item.address} />))}
            </List>
          </div>
        );
      } else {
        const businessUrl = urlItems[1];
        const businessId = businessUrl.split('/')[1]; // contains id of the business to display
        return (
        <div className="Business">
          <h1>Business Page</h1>
          <List component='nav1'>
            {items.map(business => (<Business key={business.businessUrl} id={business.businessUrl} name={business.name} />))}
          </List>
        </div>
             
        );
      }
    }

  }
}

export default App;
