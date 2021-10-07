import React from "react";
import PropTypes from "prop-types";
import CustomTab from "components/common/tabs/CustomTab";
import {faAws} from "@fortawesome/free-brands-svg-icons";

const S3_BUCKET_SUPPORTED_TOOL_IDENTIFIERS = [
  "aws_account",
];

function ToolS3BucketsTab({ toolModel, handleTabClick, activeTab }) {
  if (!S3_BUCKET_SUPPORTED_TOOL_IDENTIFIERS.includes(toolModel?.getData("tool_identifier"))) {
    return null;
  }

  return (
    <CustomTab
      icon={faAws}
      tabName={"buckets"}
      handleTabClick={handleTabClick}
      activeTab={activeTab}
      tabText={"S3 Buckets"}
    />
  );
}

ToolS3BucketsTab.propTypes = {
  toolModel: PropTypes.object,
  handleTabClick: PropTypes.func,
  activeTab: PropTypes.string,
};

export default ToolS3BucketsTab;


