import React from "react";
import PropTypes from "prop-types";
import RoleRestrictedAwsAccountToolSelectInput from "components/common/list_of_values_input/tools/aws/tool/RoleRestrictedAwsAccountToolSelectInput";
import AWSRepositoryInput from "components/common/list_of_values_input/tools/aws/AWSRepositoryInput";

function DockerCliEcrDetailsInputForm({ model, setModel }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = { ...model };
    newModel.setData(fieldName, selectedOption._id);
    newModel.setDefaultValue("repositoryName");
    setModel({ ...newModel });
  };

  const clearDataFunction = () => {
    let newModel = { ...model };
    newModel.setDefaultValue("awsToolConfigId");
    newModel.setDefaultValue("repositoryName");
    setModel({ ...newModel });
  };

  return (
    <>
      <RoleRestrictedAwsAccountToolSelectInput
        fieldName={"awsToolConfigId"}
        model={model}
        setModel={setModel}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
      />      
      <AWSRepositoryInput
        fieldName={"repositoryName"}       
        awsToolId={model.getData("awsToolConfigId")}
        dataObject={model}
        setDataObject={setModel}
      />
    </>
  );
}

DockerCliEcrDetailsInputForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DockerCliEcrDetailsInputForm;
