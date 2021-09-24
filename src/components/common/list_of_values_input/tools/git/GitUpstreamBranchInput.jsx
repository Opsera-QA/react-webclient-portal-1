import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import { Form } from "react-bootstrap";
import CheckboxInput from "components/common/inputs/boolean/CheckboxInput";

// TODO: Rework component
function GitUpstreamBranchInput({ dataObject, setDataObject, options }) {

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

  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", selectedOption);
    newDataObject.setData("defaultBranch", selectedOption);
    newDataObject.setData("gitBranch", selectedOption);
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = () => {
    let newDataObject = { ...dataObject };
    newDataObject.setData("branch", "");
    newDataObject.setData("defaultBranch", "");
    newDataObject.setData("gitBranch", "");
    setDataObject({ ...newDataObject });
  };

  return (
    <div>
      <CheckboxInput
        fieldName={"isNewBranch"}
        model={dataObject}
        setModel={setDataObject}
      />
      {/*<Form.Group controlId="isNewBranch">*/}
      {/*  <Form.Check*/}
      {/*    inline*/}
      {/*    type="checkbox"*/}
      {/*    label={"Create a new backup branch?"}*/}
      {/*    id={`newBranch`}*/}
      {/*    checked={dataObject.data.isNewBranch}*/}
      {/*    onChange={handleCreateNewBranchFlag}*/}
      {/*  />*/}
      {/*  <Form.Text className="text-muted">Creates a new branch and push the artifacts.</Form.Text>*/}
      {/*</Form.Group>*/}
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
          setDataFunction={setDataFunction}
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
};

export default GitUpstreamBranchInput;
