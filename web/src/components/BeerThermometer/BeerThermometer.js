import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBeer from '@fortawesome/fontawesome-free-solid/faBeer'
import './BeerThermometer.css'
import Chart from 'chart.js'

class BeerThermometer extends Component {
  constructor() {
    super();
    this.tick = this.tick.bind(this);
    this.drawCanvas = this.drawCanvas.bind(this);
    
    this.state = {
      secondsElapsedSinceUpdate: 0,
      previousTimestamp: -1,
      chartDataset: []
    }
  }

  tick() {
    this.setState({ secondsElapsedSinceUpdate: this.state.secondsElapsedSinceUpdate + 1 });
  }

  componentDidMount() {
    this.drawCanvas();    
    this.interval = setInterval(this.tick, 1000);
    this.setState({ secondsElapsedSinceUpdate: 0, previousTimestamp: this.props.temperatureInfo.timestamp });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.temperatureInfo.timestamp !== this.state.previousTimestamp) {
      this.setState({ 
        secondsElapsedSinceUpdate: 0, 
        previousTimestamp: nextProps.temperatureInfo.timestamp,
        chartDataset: this.updateChartDataset(nextProps)
      });
      this.drawCanvas();
    }
  }

  updateChartDataset(nextProps) {
    var dataset = this.state.chartDataset
    dataset.push(nextProps.temperatureInfo.temperature)    
    if(dataset.length > 8) {
      dataset.shift()    
    } 
    return dataset;
  }

  drawCanvas() {
    const canvasId = `canvas_${this.props.temperatureInfo.id}`
    var ctx = document.getElementById(canvasId).getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',      
      data: {
        labels: ['', '', '', '', '', ''],
        datasets: [{ 
            data: this.state.chartDataset,
            borderColor: "#3e95cd",
            fill: true
          }
        ]
      },    
      options: {        
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              max: this.props.temperatureInfo.maxTemp,
              min: this.props.temperatureInfo.minTemp,               
            }
          }],
        },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
               label: function(tooltipItem) {
                      return tooltipItem.yLabel;
               }
            }
        },
        animation: false
      }
    });
  }

  render() {
    const beerInfo = this.props.temperatureInfo.beerInfo;
    const maxTemp = beerInfo.maxTemp;
    const minTemp = beerInfo.minTemp;
    const statusBool = this.props.temperatureInfo.temperature <= maxTemp && this.props.temperatureInfo.temperature >= minTemp;

    const containerClass = `BeerThermometer ${statusBool ? '' : 'warning'}`;
    const beerIconClass = `icon ${statusBool ? 'icon-ok' : 'icon-warning'}`;

    return (
      <div className={containerClass}>
        <FontAwesomeIcon icon={faBeer} className={beerIconClass} />
        <div className="text-container">
          <label>Temperature {this.props.temperatureInfo.temperature.toFixed(2)}º C</label>
          <label>Type: {this.props.temperatureInfo.beerInfo.name}</label>
          <label>Status: {!statusBool && "Not"} OK</label>
          <label>Last Reported: {this.state.secondsElapsedSinceUpdate}</label>
        </div>
        <div className="canvas-container">
          <canvas id={`canvas_${this.props.temperatureInfo.id}`} />
        </div>     
      </div>
    );
  }
}

BeerThermometer.propTypes = {
  temperatureInfo: PropTypes.object.isRequired
}

export default BeerThermometer;
