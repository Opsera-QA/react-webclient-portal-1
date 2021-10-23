import React from "react";
import PropTypes from "prop-types";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CheckboxInputBase from "components/common/inputs/boolean/CheckboxInputBase";

function GitBranchManualRollBackBranchInput({ dataObject, setDataObject }) {
  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{ zIndex: 1500 }} {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

  const getDynamicField = () => {
    if (dataObject?.getData("isManualRollBackBranch")) {
      return (
        <TextInputBase
          fieldName={"rollbackBranchName"}
          dataObject={dataObject}
          setDataObject={setDataObject}
        />
      );
    }
  };

  return (
    <div>
      <OverlayTrigger
        placement="left"
        overlay={renderTooltip("Check this option if back up should be pushed to a branch name of your choice.")}
      >
        <CheckboxInputBase
          model={dataObject}
          setModel={setDataObject}
          fieldName={"isManualRollBackBranch"}
        />
      </OverlayTrigger>
      {getDynamicField()}
    </div>
  );
}

GitBranchManualRollBackBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};


export default GitBranchManualRollBackBranchInput;
