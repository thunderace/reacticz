import React, { Component } from 'react';
import MqttClientSingleton from '../util/MqttClientSingleton'
import JSONClientSingleton from '../util/JSONClientSingleton'

import './SwitchBlinds.css';

class SwitchBlinds extends Component {

  constructor(props) {
    super(props);
    this.mqtt = new MqttClientSingleton();
    this.json = new JSONClientSingleton();
  }

  open = () => {
    this.sendValue("Off");
  }

  stop = () => {
    // Stop command isnt's working via MQTT, so we switch back to JSON.
    this.sendValue("Stop", true);
  }

  close = () => {
    this.sendValue("On");
  }

  sendValue(val, opt_useJSON = false) {
    if (this.props.readOnly) {
      return
    }
    const message = {
      command: "switchlight",
      idx: this.props.idx,
      switchcmd: val
    };
    if (opt_useJSON) {
      message.type = "command"
      message.param = "switchlight";
      this.json.get(message);
    } else {
      this.mqtt.publish(message);
    }
  }

  render() {
    return (
      <div className="SwitchBlinds">
        <h3>{this.props.label}</h3>
        <button onClick={this.open} className={'blindsOpen' + (this.props.value === 1 ? ' selected' : '')}>Open</button>
        <button onClick={this.stop} className={'blindsStop' + (this.props.value === 0 ? ' selected' : '')}>Stop</button>
        <button onClick={this.close} className={'blindsClose' + (this.props.value === 3 ? ' selected' : '')}>Close</button>
      </div>
    );
  }

}

export default SwitchBlinds