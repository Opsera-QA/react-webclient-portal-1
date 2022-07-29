import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function BoomiJobTypeSelectInput({
  dataObject,
  setDataObject,
  isLoading,
  disabled,
}) {
  const ACTION_LIST = [
    {
      name: "Create Package Component",
      value: "CREATE_PACKAGE_COMPONENT",
      jobDescription: "PACKAGEXML_CREATION",
    },
    {
      name: "Deploy Package Component",
      value: "DEPLOY_PACKAGE_COMPONENT",
      jobDescription: "DEPLOY PACKAGE",
    },
    {
      name: "Migrate Package Component",
      value: "MIGRATE_PACKAGE_COMPONENT",
      jobDescription: "MIGRATE DEPLOYMENT PACKAGE",
    },
  ];

  const setDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("jobType", value.value);
    newDataObject.setData("jobDescription", value.jobDescription);
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("service", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("filePath", "");
    newDataObject.setData("fileName", "");
    newDataObject.setData("environmentName", "");
    newDataObject.setData("environmentId", "");
    newDataObject.setData("targetEnvironmentName", "");
    newDataObject.setData("targetEnvironmentId", "");
    setDataObject({ ...newDataObject });
  };

  const clearDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("service", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("repository", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("filePath", "");
    newDataObject.setData("fileName", "");
    newDataObject.setData("environmentName", "");
    newDataObject.setData("environmentId", "");
    newDataObject.setData("targetEnvironmentName", "");
    newDataObject.setData("targetEnvironmentId", "");
    setDataObject({ ...newDataObject });
  };

  return (
    <SelectInputBase
      fieldName={"jobType"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Job Type"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

BoomiJobTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

export default BoomiJobTypeSelectInput;
