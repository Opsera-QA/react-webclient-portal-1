import React from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import SalesforceLogSummaryDeployResultsSummaryPanel
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/validation/SalesforceLogSummaryDeployResultsSummaryPanel";
import salesforceSummaryLogDeployResultMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/details/salesforce/summary/metadata/salesforceSummaryLogDeployResult.metadata";

const validationLog = {
  "id": "0Af7A00000l6BaoSAE",
  "validatedDeployRequestId": null,
  "deployOptions": null,
  "deployResult": {
    "id": "0Af7A00000l6BaoSAE",
    "messages": null,
    "retrieveResult": null,
    "success": true,
    "checkOnly": true,
    "ignoreWarnings": false,
    "rollbackOnError": true,
    "status": "Succeeded",
    "numberComponentsDeployed": 1,
    "numberComponentsTotal": 1,
    "numberComponentErrors": 0,
    "numberTestsCompleted": 0,
    "numberTestsTotal": 0,
    "numberTestErrors": 0,
    "details": {
      "componentFailures": [],
      "componentSuccesses": [
        {
          "componentType": "SharingReason",
          "fileName": "objects/Event_Registration__c.object",
          "fullName": "Event_Registration__c.Share_Participants_with_Users__c",
          "id": "0A741000000fxd7CAA",
          "problem": null,
          "success": true,
          "warning": false,
          "created": false,
          "changed": false,
          "deleted": false,
          "lineNumber": null,
          "columnNumber": null,
          "requiresProductionTestRun": false,
          "createdDate": "2021-05-10T04:33:16.000+0000",
          "knownPackagingProblem": false,
          "forPackageManifestFile": false,
          "problemType": null
        },
        {
          "componentType": "",
          "fileName": "package.xml",
          "fullName": "package.xml",
          "id": null,
          "problem": null,
          "success": true,
          "warning": false,
          "created": false,
          "changed": true,
          "deleted": false,
          "lineNumber": null,
          "columnNumber": null,
          "requiresProductionTestRun": false,
          "createdDate": "2021-05-10T04:33:16.000+0000",
          "knownPackagingProblem": false,
          "forPackageManifestFile": true,
          "problemType": null
        }
      ],
      "retrieveResult": null,
      "allComponentMessages": [
        {
          "componentType": "SharingReason",
          "fileName": "objects/Event_Registration__c.object",
          "fullName": "Event_Registration__c.Share_Participants_with_Users__c",
          "id": "0A741000000fxd7CAA",
          "problem": null,
          "success": true,
          "warning": false,
          "created": false,
          "changed": false,
          "deleted": false,
          "lineNumber": null,
          "columnNumber": null,
          "requiresProductionTestRun": false,
          "createdDate": "2021-05-10T04:33:16.000+0000",
          "knownPackagingProblem": false,
          "forPackageManifestFile": false,
          "problemType": null
        },
        {
          "componentType": "",
          "fileName": "package.xml",
          "fullName": "package.xml",
          "id": null,
          "problem": null,
          "success": true,
          "warning": false,
          "created": false,
          "changed": true,
          "deleted": false,
          "lineNumber": null,
          "columnNumber": null,
          "requiresProductionTestRun": false,
          "createdDate": "2021-05-10T04:33:16.000+0000",
          "knownPackagingProblem": false,
          "forPackageManifestFile": true,
          "problemType": null
        }
      ],
      "runTestResult": {
        "successes": [],
        "failures": [],
        "totalTime": 0.0,
        "apexLogId": null,
        "flowCoverage": [],
        "numFailures": 0,
        "codeCoverage": [],
        "codeCoverageWarnings": [],
        "flowCoverageWarnings": [],
        "numTestsRun": 0
      }
    },
    "createdDate": "2021-05-10T04:33:14.000+0000",
    "startDate": "2021-05-10T04:33:14.000+0000",
    "lastModifiedDate": "2021-05-10T04:33:16.000+0000",
    "completedDate": "2021-05-10T04:33:16.000+0000",
    "errorStatusCode": null,
    "errorMessage": null,
    "stateDetail": null,
    "createdBy": "0057A000002vD0D",
    "createdByName": "cpq devops",
    "canceledBy": null,
    "canceledByName": null,
    "done": true,
    "runTestsEnabled": false,
    "runTestResult": null
  }
};

function SalesforceLogSummaryPanel({ pipelineData }) {

  // if (pipelineData == null) {
  //   return <LoadingDialog message={"Loading Pipeline"} size={'sm'} />;
  // }

  const wrapModel = () => {
    return (new Model(validationLog?.deployResult, salesforceSummaryLogDeployResultMetadata, false));
  };

  return (
    <div>
      <div className={"mb-3"}>
        <SalesforceLogSummaryDeployResultsSummaryPanel
          salesforceValidationLogModel={wrapModel()}
        />
      </div>

    </div>
  );
}


SalesforceLogSummaryPanel.propTypes = {
  pipelineData: PropTypes.object,
};

export default SalesforceLogSummaryPanel;