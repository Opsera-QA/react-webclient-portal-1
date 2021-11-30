import React from "react";
import PropTypes from "prop-types";
import {defaultConfig, getColorByData, mainColor} from "components/insights/charts/charts-views";
import {ResponsivePie} from "@nivo/pie";

// TODO: This is a work in progress so it will be modified until it finds a point of stability
function NivoPieChartBase(
  {
    data,
    legendsData,
    onClickFunction,
  }) {
  const getLeftAxis = () => {
    return (
      {
        // format: formats[leftLabelFormat],
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // legend: leftAxisTitle,
        // legendOffset: largeLeftSpaceRequired ? -80 : -40,
        legendPosition: "middle",
      }
    );
  };

  const getBottomAxis = () => {
    return (
      {
        // format: formats[bottomLabelFormat],
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        // tickRotation: largeBottomSpaceRequired ? -45 : 0,
        // legend: bottomAxisTitle,
        // legendOffset: largeBottomSpaceRequired ? 60 : 40,
        legendPosition: "middle",
      }
    );
  };

  const getThemeData = () => {
    return (
      {
        axis: {
          ticks: {
            text: {
              fontSize: "10px"
            },
          },
        },
        legends: {
          text: {
            fontSize: "10px",
            fill: mainColor
          }
        }
      }
    );
  };

  // TODO: Handle required attributes set to null if required.
  return (
    <ResponsivePie
      data={data}
      lineWidth={3.5}
      pointSize={8}
      pointBorderWidth={8}
      pointLabel={"y"}
      pointLabelYOffset={-12}
      useMesh={true}
      enableLabel={false}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      axisTop={null}
      axisRight={null}
      axisLeft={getLeftAxis()}
      axisBottom={getBottomAxis()}
      legends={legendsData}
      theme={getThemeData()}
      keys={["tests"]}
      sortByValue={true}
      innerRadius={.5}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor={"#ffffff"}
      colors={["#ABA4CC", "#696969", "#B1AeA7"]}
      onClick={onClickFunction}
      // activeInnerRadiusOffset={null}
      // activeOuterRadiusOffset={null}
      // arcLabel={null}
      // arcLabelsComponent={null}
      // arcLabelsRadiusOffset={null}
      // arcLabelsSkipAngle={null}
      // arcLabelsTextColor={null}
      // arcLinkLabel={null}
      // arcLinkLabelsColor={null}
      // arcLinkLabelsDiagonalLength={null}
      // arcLinkLabelsOffset={null}
      // arcLinkLabelsSkipAngle={null}
      // arcLinkLabelsStraightLength={null}
      // arcLinkLabelsTextColor={null}
      // arcLinkLabelsTextOffset={null}
      // arcLinkLabelsThickness={null}
      // borderColor={null}
      // borderWidth={null}
      // component={null}
      // cornerRadius={null}
      // enableArcLabels={null}
      // enableArcLinkLabels={null}
      // endAngle={null}
      // fit={null}
      // id={null}
      // isInteractive={null}
      // margin={null}
      // padAngle={null}
      // renderWrapper={null}
      // role={null}
      // startAngle={null}
      // tooltip={null}
      // value={null}
    />
  );
}

NivoPieChartBase.propTypes = {
  data: PropTypes.any, // TODO: Should this be array?
  legendsData: PropTypes.any, // TODO: Should this be array?
  onClickFunction: PropTypes.func,
};

export default NivoPieChartBase;
