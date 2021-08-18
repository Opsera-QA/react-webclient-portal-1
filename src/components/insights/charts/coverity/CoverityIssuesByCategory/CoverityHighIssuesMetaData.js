const CoverityHighIssuesMetaData = {
  idProperty: "_id",
  type: "Coverity Issues By Category",
  fields: [
    {
      label: "Run",
      id: "runCount",
    },
    {
      label: "Page Size",
      id: "pageSize",
    },
    {
      label: "Pipeline Id",
      id: "pipelineId",
    },
    {
      label: "Pipeline Name",
      id: "pipelineName",
    },
    {
      label: "Stream Name",
      id: "coverityStreamName",
    },
    {
      label: "Date",
      id: "timestamp",
    },
    {
      label: "Trend",
      id: "highTrend",
    },
    {
      label: "High Issues",
      id: "High",
    },
  ],
  newObjectFields: {},
};

export default CoverityHighIssuesMetaData;
