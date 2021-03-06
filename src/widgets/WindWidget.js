import React, { Component } from 'react';
import GenericWidget from './GenericWidget';
import './WindWidget.css';

class WindWidget extends Component {

  render() {
    const NATIVE_ICON_ANGLE_DEG = 45;
    return (
      <GenericWidget class="WindWidget"
          isOn={this.props.speed > 0}
          value1={this.props.direction}
          value2={Number((this.props.speed / 10) * 3.6).toFixed(1)}
          {...this.props}>
        <svg style={{transform:'rotateZ(' + (this.props.bearing -
            NATIVE_ICON_ANGLE_DEG) +'deg)' }}>
          <use xlinkHref="#near-me"/>
        </svg>
      </GenericWidget>
    );
  }

}

export default WindWidget
