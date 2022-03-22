const FailedExecutionsActionableInsightsMetaData = {
  idProperty: "_id",
  type: "Failed Executions Actionable Insights",
  fields: [
    {
      label: "Average duration to complete",
      id: "actionDurationInMins",
    },
    {
      label: "Run Number/Run Count",
      id: "actionRunNumber",
    },
    {
      label: "Failure",
      id: "failure_percentage",
    },
    {
      label: "Trend",
      id: "runTrend",
    }
  ],
  newObjectFields: {},
};

export default FailedExecutionsActionableInsightsMetaData;
