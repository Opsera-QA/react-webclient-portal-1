import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { Form } from "react-bootstrap";

function GitUpstreamBranchInput({ dataObject, setDataObject, options, handleDTOChange, clearDataFunction }) {
  const clearUpstreamBranchChange = (fieldName) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, "");
    setDataObject({ ...newDataObject });
  };
  const handleHasUpstreamBranch = (value) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("hasUpstreamBranch", value);
    setDataObject({ ...newDataObject });
  };
  const handleCreateNewBranchFlag = (e) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("isNewBranch", e.target.checked);
    setDataObject({ ...newDataObject });
  };

  return (
    <div>
      <Form.Group controlId="isNewBranch">
        <Form.Check
          inline
          type="checkbox"
          label={"Create a new backup branch?"}
          id={`newBranch`}
          checked={dataObject.data.isNewBranch}
          onChange={handleCreateNewBranchFlag}
        />
        <Form.Text className="text-muted">Creates a new branch and push the artifacts.</Form.Text>
      </Form.Group>
      {dataObject.data.isNewBranch ? (
        <div>
          <TextInputBase
            disabled={false}
            fieldName={"gitBranch"}
            dataObject={dataObject}
            setDataObject={setDataObject}
          />
          <Form.Group controlId="isNewBranch">
            <Form.Check
              inline
              type="checkbox"
              label={"Use an upstream branch?"}
              id={`hasUpstreamBranch`}
              checked={dataObject.data.hasUpstreamBranch}
              onChange={(e) => handleHasUpstreamBranch(e.target.checked)}
            />
            <Form.Text className="text-muted">
              Configure an upstream/source branch. The Files will be overwritten when pushing the artifacts. If no
              upstream branch is configured, then the new Artifact branch is created as an Orphan branch, having only
              the artifact files and no commit history.
            </Form.Text>
          </Form.Group>
          {dataObject.data.hasUpstreamBranch && (
            <SelectInputBase
              fieldName={"upstreamBranch"}
              dataObject={dataObject}
              setDataObject={setDataObject}
              placeholderText={"Select"}
              selectOptions={options}
              valueField="name"
              textField="name"
              clearDataFunction={clearUpstreamBranchChange}
            />
          )}
        </div>
      ) : (
        <SelectInputBase
          fieldName={"branch"}
          dataObject={dataObject}
          setDataObject={setDataObject}
          setDataFunction={handleDTOChange}
          placeholderText={"Select"}
          selectOptions={options}
          valueField="name"
          textField="name"
          clearDataFunction={clearDataFunction}
        />
      )}
    </div>
  );
}

GitUpstreamBranchInput.propTypes = {
  options: PropTypes.object,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  handleDTOChange: PropTypes.func,
  clearDataFunction: PropTypes.func,
};

export default GitUpstreamBranchInput;
