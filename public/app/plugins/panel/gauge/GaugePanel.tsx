// Libraries
import React, { PureComponent } from 'react';

// Services & Utils
import { config } from 'app/core/config';

// Components
import { Gauge } from '@grafana/ui';

// Types
import { GaugeOptions } from './types';
import { DisplayValue, PanelProps, getSingleStatDisplayValues, VizRepeater } from '@grafana/ui';

export class GaugePanel extends PureComponent<PanelProps<GaugeOptions>> {
  renderValue = (value: DisplayValue, width: number, height: number): JSX.Element => {
    const { options } = this.props;

    return (
      <Gauge
        value={value}
        width={width}
        height={height}
        thresholds={options.thresholds}
        showThresholdLabels={options.showThresholdLabels}
        showThresholdMarkers={options.showThresholdMarkers}
        minValue={options.minValue}
        maxValue={options.maxValue}
        theme={config.theme}
      />
    );
  };

  getValues = (): DisplayValue[] => {
    return getSingleStatDisplayValues({
      valueMappings: this.props.options.valueMappings,
      thresholds: this.props.options.thresholds,
      valueOptions: this.props.options.valueOptions,
      data: this.props.data,
      theme: config.theme,
      replaceVariables: this.props.replaceVariables,
    });
  };

  render() {
    const { height, width, options, data, renderCounter } = this.props;
    return (
      <VizRepeater
        getValues={this.getValues}
        renderValue={this.renderValue}
        width={width}
        height={height}
        source={data}
        renderCounter={renderCounter}
        orientation={options.orientation}
      />
    );
  }
}
