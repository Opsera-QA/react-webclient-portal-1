import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { AuthContext } from "../../../contexts/AuthContext"; //New AuthContext State 

//Temporarily importing test data here.  The axios API call to the NodeAPI will replace this
import sampleData from "./demoPieData";
import config from "./demoPieChartConfigs";

import "./charts.css";

class DemoPieChart extends React.Component {
    static contextType = AuthContext;  //Registers the User Authentication context data in the component

    constructor(props, context) {
      super(props, context);
      this.state = {
        data: [],
      };
    }

    componentDidMount() {
      this.setState({ data: sampleData });
    }


    render() {
      const { data } = this.state;
      console.log(data);
      return (
            
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          borderWidth={1}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          defs={config.defs}
          fill={config.fill}
          legends={config.legends}
          theme={{
            tooltip: {
              container: {
                fontSize: "12px",
              },
            },
          }}
        />
            
      );
    }
}

export default DemoPieChart;
