export const nivoChartLegendDefinitions = {};

// TODO: If we have specific places we like to put legends for specific parts, break this out based on chart
//  like getTopRightBarChartLegendDefinition or getBarChartLegendDefinition if it's only ever used in one spot
nivoChartLegendDefinitions.getTopRightLegendDefinition = () => {
  return (
    {
      anchor: "top-right",
      direction: "column",
      justify: false,
      translateX: 0,
      translateY: 0,
      itemsSpacing: 0,
      // itemDirection: "right-to-left",
      itemWidth: 80,
      itemHeight: 50,
      // itemOpacity: isLegendHidden ? 0 : 1,
      symbolSize: 10,
      // symbolShape: symbol,
      symbolBorderColor: "rgba(0, 0, 0, .5)",
    }
  );
};