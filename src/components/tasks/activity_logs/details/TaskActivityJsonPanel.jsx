import React from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function TaskActivityJsonPanel({ gitTaskActivityData }) {
  return (
    <StandaloneJsonField
      titleText={"Task Activity JSON"}
      json={gitTaskActivityData}
      enableClipboard={false}
      displayDataTypes={false}
      collapsed={false}
      minimumHeight={"calc(100vh - 285px)"}
      maximumHeight={"calc(100vh - 285px)"}
    />
  );
}

TaskActivityJsonPanel.propTypes = {
  gitTaskActivityData: PropTypes.object,
};


export default TaskActivityJsonPanel;
