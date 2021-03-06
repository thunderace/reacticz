/*
{"Battery":255,"RSSI":10,"description":"","dtype":"Heating","id":"92130","idx":131,"name":"thermostat","nvalue":0,"stype":"Zone","svalue1":"0.0","svalue2":"0.0","svalue3":"Auto","unit":1}
{"Battery":255,"RSSI":12,"description":"","dtype":"Heating","id":"92130","idx":131,"name":"thermostat","nvalue":0,"stype":"Zone","svalue1":"20.5","unit":1}
{"Battery":255,"RSSI":12,"dtype":"Thermostat","id":"0000001","idx":283,"name":"Thermostaat","nvalue":0,"stype":"SetPoint","svalue1":"17.00","unit":0}
*/

import React, { Component } from 'react';
import JSONClientSingleton from '../util/JSONClientSingleton'
import './ThermostatWidget.css';

class ThermostatWidget extends Component {

  constructor(props) {
    super(props);
    this.json = new JSONClientSingleton();
  }

  decreaseSetpoint = () => {
    this.updateSetpoint(parseFloat(this.props.value, 10) - 0.5);
  }

  increaseSetpoint = () => {
    this.updateSetpoint(parseFloat(this.props.value, 10) + 0.5);
  }

  updateSetpoint(value) {
    if (this.props.readOnly) {
      return
    }
    const message = {
      type: 'command',
      param: 'udevice',
      idx: this.props.idx,
      nvalue: 0,
      svalue: value
    };
    this.json.get(message);
  }

  render() {
    const theme = this.props.theme;
    const style = theme ? {
      backgroundColor: this.props.readOnly ? '' : theme.background,
      color: theme.text
    } : {};
    const buttonStyle = theme ? {
      backgroundColor: theme.buttonOff,
      color: theme.textOff
    } : {};
    return (
      <div className="thermostat" style={style}>
        <h2>{this.props.label}</h2>
        <div className="controls">
          <button className="switch minus" style={buttonStyle}
                  onClick={this.decreaseSetpoint}>-</button>
          <div>{Number(this.props.value).toFixed(1)}</div>
          <button className="switch plus" style={buttonStyle}
                  onClick={this.increaseSetpoint}>+</button>
        </div>
      </div>
    );
  }

}

export default ThermostatWidget
