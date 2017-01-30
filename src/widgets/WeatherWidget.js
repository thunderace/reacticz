/*
svalue1 = temp
svalue2 = humidity
svalue3 = hum stat (0=Normal, 1=Comfortable, 2=Dry, 3=Wet)
svalue4 = baro hPa
svalue5 = forecast (0 = No info, 1 = Sunny, 2 = Partly cloudy, 3 = Cloudy, 4 = Rain)
*/

import React, { Component } from 'react';

import './WeatherWidget.css';

class WeatherWidget extends Component {

  getProperties() {
    const device = this.props.device;
    const temp = Number(device.svalue1).toFixed(1);
    switch (device.dtype) {
      case "Temp" :
        return { temp: temp };
      case "Temp + Humidity" :
        return { temp: temp, hum: device.svalue2 };
      case "Temp + Humidity + Baro" :
        return { temp: temp, hum: device.svalue2, baro: this.props.hidePressure ? null : device.svalue4, forecast: device.svalue5 };
      default:}
  }

  render() {
    const params = this.getProperties();
    const theme = this.props.theme;
    const style = theme ? {
      backgroundColor: this.props.readOnly ? '' : theme.background,
      color: theme.text
    } : {};
    return (
      <div className="WeatherWidget">
        {params.forecast && <div className={'weatherImage weather' + params.forecast}></div>}
        <div className={'weatherData'} style={style}>
          <div className="name">{this.props.device.name}</div>
          {params.temp && <div className="temp">{params.temp}</div>}
          {params.baro && <div className="baro">{params.baro}</div>}
          {params.hum && <div className="hum">{params.hum}</div>}
        </div>
      </div>
    );
  }

}

export default WeatherWidget