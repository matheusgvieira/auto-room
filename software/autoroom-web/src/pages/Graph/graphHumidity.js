import React, { Component } from "react";
import Chart from "react-apexcharts";

const time = JSON.parse(localStorage.getItem('@min'));
const humi = localStorage.getItem('@humidity');
const h = JSON.parse(humi);

class App extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [ time.min[0], 
                          time.min[1],
                          time.min[2], 
                          time.min[3], 
                          time.min[4], 
                          time.min[5]]
          }
        },
        series: [
          {
            name: "series-1",
            data: [ h.humidity[0], 
                    h.humidity[1],
                    h.humidity[2], 
                    h.humidity[3], 
                    h.humidity[4], 
                    h.humidity[5]]
          }
        ]
      };
    }
  
    render() {
      return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default App;