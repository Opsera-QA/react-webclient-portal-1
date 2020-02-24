import React from "react";
import PropTypes from "prop-types";
import { ResponsivePie } from "@nivo/pie";
import ErrorDialog from "../../common/error";
import config from "./sonarCodeCategoriesPieChartConfigs";
import "./charts.css";


function CodeCategoriesPieChart( { data, persona } ) {
  
  if (typeof data !== "object" || Object.keys(data).length == 0) {
    return (<ErrorDialog  error="Missing Data!" />);
  } else {
    
    const { sonarCodeCategoriesNO_VALUE }  =  data;
    return (
      <>
        <div className="chart-label-text">Sonar: Code Categories (Keyword = OK)</div>
        <ResponsivePie
          data={sonarCodeCategoriesNO_VALUE ? sonarCodeCategoriesNO_VALUE.data : []}
          margin={{ top: 40, right: 230, bottom: 80, left: 80 }}
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
                fontSize: "16px",
              },
            },
          }}
        />
      </>
    );
  }
}
CodeCategoriesPieChart.propTypes = {
  data: PropTypes.object,
  persona: PropTypes.string
};

export default CodeCategoriesPieChart;
