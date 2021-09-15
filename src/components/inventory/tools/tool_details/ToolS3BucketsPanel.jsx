import React from "react";
import AwsS3Buckets from "./tool_jobs/aws/buckets/AwsS3Buckets";
import PropTypes from "prop-types";

function ToolS3BucketsPanel({ toolData, loadData, isLoading }) {
  const getPanel = (toolIdentifier, loadData) => {
    switch (toolIdentifier) {
      case "aws_account":
        return (
          <AwsS3Buckets
            toolActions={toolData?.getData("actions")}
            isLoading={isLoading}
            toolData={toolData}
            loadData={loadData}
          />
        );
      default:
        return (
          <div className="text-center p-5 text-muted mt-5">
            S3 Buckets Creation is not currently available for this tool.
          </div>
        );
    }
  };

  const getBody = () => {
    if (toolData == null) {
      return null;
    }

    return getPanel(toolData["tool_identifier"].toLowerCase(), loadData);
  };

  return (
    <>
      <div className="text-muted p-3">
        <div className="h6">Managed AWS S3 Bucket Creation</div>
        <div className="mb-3">Use this feature to create AWS S3 Buckets in the managed tool.</div>
        {getBody()}
      </div>
    </>
  );
}

ToolS3BucketsPanel.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ToolS3BucketsPanel;
