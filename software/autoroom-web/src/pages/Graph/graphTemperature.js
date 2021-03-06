import React, { Component } from "react";
import Chart from "react-apexcharts";
//import moment from 'moment';

const temp = JSON.parse(localStorage.getItem('@temperature'));
const time = JSON.parse(localStorage.getItem('@min'));

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
          data: [ temp.temperature[0], 
                  temp.temperature[1],
                  temp.temperature[2], 
                  temp.temperature[3], 
                  temp.temperature[4], 
                  temp.temperature[5]]
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
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;