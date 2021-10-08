const SonarRatingsBugsActionableMetadata = {
    idProperty: "_id",
    type: "Sonar Ratings Insights Table Details",
    fields: [
      {
        label: "Run",
        id: "run_count",
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
        label: "Project",
        id: "projectName",
      },
      {
        label: "Date",
        id: "timestamp",
      },
      {
        label: "Bugs",
        id: "sonarLatestMeasureValue",
      },
    ],
    newObjectFields: {},
  };
  
  export default SonarRatingsBugsActionableMetadata;