import './App.css';
import React, { Component } from "react";
import List from "@material-ui/core/List";
import { Input, Button } from 'semantic-ui-react';
import Business from "./components/Business";
import BusinessPage from "./components/BusinessPage";

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
    fetch('https://cors-anywhere.herokuapp.com/http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/popular') 
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
    fetch('https://cors-anywhere.herokuapp.com/http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?location=' + this.state.location) 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
    } else if(this.state.location === '') {
      fetch('https://cors-anywhere.herokuapp.com/http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?name=' + this.state.businessName) 
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoaded: true,
          items: result,
        });
      });
    } else {
      fetch('https://cors-anywhere.herokuapp.com/http://gimmetea-env.eba-zfp8grcb.us-east-1.elasticbeanstalk.com/search?name=' + this.state.businessName + '&location=' + this.state.location) 
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
      //var urlItems = url.split('https://main.d294dy8gdsjpxm.amplifyapp.com/')
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
          <div classname="App">
            <div>
              <h1>{items.filter(item => item.id === businessId).map(item => (<BusinessPage key={item.id} id={item.id} name={item.name} />))}</h1>
            </div>
            <img src={items.filter(item => item.id === businessId).map(item => (<BusinessPage key={item.id} id={item.id} image_url={item.image_url} />))} />
            <h3>Address: {items.filter(item => item.id === businessId).map(item => (<BusinessPage key={item.id} id={item.id} address={item.address} />))}</h3>
            <h3>Rating: {items.filter(item => item.id === businessId).map(item => (<BusinessPage key={item.id} id={item.id} rating={item.rating} />))}</h3>
            <h3>Phone Number: {items.filter(item => item.id === businessId).map(item => (<BusinessPage key={item.id} id={item.id} display_phone={item.display_phone} />))}</h3>
          </div>   
        );
      }
    }

  }
}

export default App;
