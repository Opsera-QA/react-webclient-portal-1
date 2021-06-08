import React from "react";
import PropTypes from "prop-types";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function GitBranchManualRollBackBranchInput({ dataObject, setDataObject }) {
  
  const handleManualRollbackChange = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isManualRollBackBranch", value);
    setDataObject({ ...newDataObject });
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" style={{ zIndex: 1500 }} {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={renderTooltip("Check this option if back up should be pushed to a branch name of your choice.")}
      >
        <Form.Group controlId="formBasicCheckboxIsManualRollBackBranch" className="mt-4 ml-1">
          <Form.Check
            type="checkbox"
            label="Configure Branch Name"
            checked={dataObject.data.isManualRollBackBranch ? dataObject.data.isManualRollBackBranch : false}
            onChange={(e) => handleManualRollbackChange(e.target.checked)}
          />
        </Form.Group>
      </OverlayTrigger>
      {dataObject.data.isManualRollBackBranch && (
        <TextInputBase disabled={false} fieldName={"rollbackBranchName"} dataObject={dataObject} setDataObject={setDataObject}
        />
      )}
    </>
  );
}

GitBranchManualRollBackBranchInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
};


export default GitBranchManualRollBackBranchInput;
