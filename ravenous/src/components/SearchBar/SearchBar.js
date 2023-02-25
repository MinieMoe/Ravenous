import React, { Component } from 'react'
import './SearchBar.css'



class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: '',
            location: '',
            sortBy: 'best_match'
        }
        this.handleTermChange = this.handleTermChange.bind(this)
        this.handleLocationChange = this.handleLocationChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.sortByOptions = {
            'Best Match' : 'best_match',
            'Highest Rated' : 'rating', 
            'Most Reviewed': 'review_count'
        }
    }

    //apply 'active' class/style to clicked sortOption (aka, current state.sortBy)
    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption){
            return 'active'
        }else{
            return ''
        }
    }

    handleSortByChange(sortByOption){
        this.setState({sortBy: sortByOption})
    }

    handleTermChange(event){
        this.setState({term: event.target.value})
    }

    handleLocationChange(event){
        this.setState({location: event.target.value})
    }

    handleSearch(event){
        // pass the values of the current state to searchYelp() from HomePage.js
        this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
        event.preventDefault()
    }

    renderSortByOptions() {
        /*
            get the list of keys (Best Match, Highest Rated, Most Reviewed)
            each key is now sortByOption in map()
            get the values of each key with sortByOptions[sortByOption]
        */
        return Object.keys(this.sortByOptions).map(sortByOption =>{
            let sortByOptionValue = this.sortByOptions[sortByOption]
            return <li 
                    onClick ={this.handleSortByChange.bind(this, sortByOptionValue)}        //update the current state to the most recently clicked sortBy
                    className={this.getSortByClass(sortByOptionValue)}
                    key ={sortByOptionValue}
                >{sortByOption}</li>
        })
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="SearchBar-sort-options">
                    <ul>
                    {this.renderSortByOptions()}
                    </ul>
                </div>
                <div className="SearchBar-fields">
                    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} placeholder="Where?" />
                </div>
                <div 
                    onClick={this.handleSearch}
                    className="SearchBar-submit">
                    <a>Let's Go</a>
                </div>
            </div>
        )
    }

    
}

export default SearchBar
