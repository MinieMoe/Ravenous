import Yelp from "../../util/Yelp";
import BusinessList from "../BusinessList/BusinessList";
import SearchBar from "../SearchBar/SearchBar";
import React, { Component } from 'react'



class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      businesses: []
    }
    this.searchYelp.bind(this)
  }

  searchYelp = (term, location, sortBy) => {
    Yelp.search(term, location, sortBy).then((businesses)=>{
      this.setState({businesses: businesses})
    })
  }

  render () {return (
      <>
        <SearchBar searchYelp={this.searchYelp} />
        <BusinessList businesses={this.state.businesses} />
      </>
    )
  }
}

export default HomePage;
