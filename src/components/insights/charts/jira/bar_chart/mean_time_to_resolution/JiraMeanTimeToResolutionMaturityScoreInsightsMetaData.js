const JiraMeanTimeToResolutionMaturityScoreInsightsMetadata = {
  idProperty: "_id",
  type: "Jira MTTR Maturity Score Table Report",
  fields: [
    {
      label: "Team Name",
      id: "issueTeamName",
    },
    {
      label: "Project Name",
      id: "issueProjectName",
    },
    {
      label: "Service Component",
      id: "issueServiceComponent",
    },
    {
      label: "Maturity Score",
      id: "maturityScoreText",
    },
    {
      label: "Average MTTR",
      id: "maturityScoreValue",
    },
    {
      label: "Total Incidents",
      id: "totalIncidents",
    },
    {
      label: "Resolved Incidents",
      id: "totalResolvedIncidents",
    },
  ],
  newObjectFields: {},
};

export default JiraMeanTimeToResolutionMaturityScoreInsightsMetadata;
