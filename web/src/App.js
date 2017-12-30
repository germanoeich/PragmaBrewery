import React, { Component } from 'react';
import BeerThermometer from './components/BeerThermometer/BeerThermometer'
import TemperaturesEmitter from './services/TemperaturesEmitter'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      temperatures: []
    };

    this.handleTemperateEvents = this.handleTemperatureEvents.bind(this);

    this.emitter = new TemperaturesEmitter();

    this.emitter.on('sync', (data) => this.handleTemperatureEvents('sync', data));
    this.emitter.on('update', (data) => this.handleTemperatureEvents('update', data));
    this.emitter.connect();
  }

  handleTemperatureEvents(type, data) {
    if (type === 'sync') {
      data.map((item) => {
        item.timestamp = new Date().getTime();

        return item;
      });

      this.setState({ temperatures: data });
    } else if (type === 'update') {
      data.timestamp = new Date().getTime();

      let temps = Array.from(this.state.temperatures);

      if (temps.some((item) => item.id === data.id)) {
        temps = temps.map((item) => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        });
      } else {
        temps.push(data);
      }

      this.setState({ temperatures: temps });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">PragmaBrewery</h1>
        </header>

        {
          this.state.temperatures.map((item) => {
            return <BeerThermometer temperatureInfo={item}/>
          }) 
        }        
      </div>
    );
  }
}

export default App;
