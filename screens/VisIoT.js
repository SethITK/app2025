import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
const VisIoT = (props) => {
  return (
    <View Style={styles.container}>
      <View>
        <Text>Temperaturas</Text>
        <LineChart
          data={{
            labels: ["D", "L", "M", "M", "J", "V", "S"],
            datasets: [
              {
                data: [
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                  Math.random() * (31 - 16) + 16,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisSuffix="°C"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

export default VisIoT;

const styles = StyleSheet.create({
  container:{
    padding:40,
  }
});
