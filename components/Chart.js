import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

const Chart = ({chartData}) => {
  return (
    <LineChart
      data={{
        datasets: [{data: chartData}],
      }}
      width={Dimensions.get('window').width / 1.1}
      height={220}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={{
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: '#ffa726',
        },
        style: {
          padding: 10,
        },
      }}
      bezier
      style={styles.chart}
    />
  );
};

const styles = StyleSheet.create({
  chart: {
    borderRadius: 16,
  },
});

export default Chart;
