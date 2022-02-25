const sdlcDurationByStageMetadata = {
    type: "Sdlc Duration By Stage Goals",
    fields: [
      {
        label: "Goal: Average Duration of Build (minutes)",
        id: "average_builds"
      },
      {
        label: "Goal: Average Duration of Deploy (minutes)",
        id: "average_deploy"
      },
      {
        label: "Goal: Average Duration of Quality Scan (minutes)",
        id: "average_quality_scan"
      },
      {
        label: "Goal: Average Duration of Security Scan (minutes)",
        id: "average_security_scan"
      },
      {
        label: "Goal: Average Duration of Test (minutes)",
        id: "average_test"
      },
      {
        label: "Goal: Average Duration of Scripts (minutes)",
        id: "average_scripts"
      },
    ],
    newObjectFields: {
      average_builds: 0,
      average_deploy: 0,
      average_quality_scan: 0,
      average_security_scan: 0,
      average_test: 0,
      average_scripts: 0,
    }
  };
  
  export default sdlcDurationByStageMetadata;
