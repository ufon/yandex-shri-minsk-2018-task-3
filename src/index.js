import React, { Component } from "react";
import ReactDOM from "react-dom";

import './assets/scss/index.scss';

import Hero from './components/Hero';
import Chat from './components/Chat';
import YandexMap from './components/Map';

class Main extends Component {

  constructor(props){
    super(props);
    this.state = {
      cityName: 'Москва'
    }
  }

  newCity = (name) => this.setState({cityName: name})

  render() {
    console.log(this.state.cityName);
    return (
      <div className="app">
        <Hero/>
        <Chat linkCityToMap={this.newCity}/>
        <YandexMap cityName={this.state.cityName} />
      </div>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root')
);
