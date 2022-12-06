import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function KafkaConnectActionSelectInput({dataObject, setDataObject, isLoading, disabled}) {

  const ACTION_LIST = [
    {
      name: "Create",
      value: "create",
    },
    {
      name: "Update",
      value: "update",
    },
    {
      name: "Delete",
      value: "delete",
    },
    {
      name: "Validate",
      value: "validate",
    },
    {
      name: "Restart",
      value: "restart",
    },
    {
      name: "Resume",
      value: "resume",
    },
    {
      name: "Pause",
      value: "pause",
    },
  ];

  const setDataFunction = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("gitToolId", "");
    newDataObject.setData("repoId", "");
    newDataObject.setData("projectId", "");
    newDataObject.setData("gitUrl", "");
    newDataObject.setData("sshUrl", "");
    newDataObject.setData("service", "");
    newDataObject.setData("workspace", "");
    newDataObject.setData("workspaceName", "");
    newDataObject.setData("repository", "");
    newDataObject?.setData("repositoryName", "");
    newDataObject.setData("gitBranch", "");
    newDataObject.setData("connectorFileName", "");
    newDataObject.setData("connectorFilePath", "");
    newDataObject.setData("kafkaConnectorName", "");
    newDataObject.setData("kafkaConnectAction", value.value);
    setDataObject({ ...newDataObject });
  };

  return (

    <SelectInputBase
      fieldName={"kafkaConnectAction"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Kafka Connect Action"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

KafkaConnectActionSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default KafkaConnectActionSelectInput;