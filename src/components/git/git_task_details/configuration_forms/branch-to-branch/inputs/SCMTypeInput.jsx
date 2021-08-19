import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DtoSelectInput from "components/common/input/dto_input/dto-select-input";

const SCM_TOOL = [
  {
    name: "Gitlab",
    value: "gitlab",
  },
  {
    name: "Github",
    value: "github",
  },
  {
    name: "Bitbucket",
    value: "bitbucket",
  },
];

function SCMTypeInput({dataObject, setDataObject, disabled, gitTasksDataDto}) {

    const setSCMType = (fieldName, selectedOption) => {
       let newDataObject = {...dataObject};
        newDataObject.setData("service", selectedOption.value);
        gitTasksDataDto.setData("tool_identifier", selectedOption.service);
        newDataObject.setData("gitCredential", "");
        newDataObject.setData("gitToolId", "");
        newDataObject.setData("gitUrl", "");
        newDataObject.setData("sshUrl", "");
        newDataObject.setData("repository", "");
        newDataObject.setData("projectId", "");
        newDataObject.setData("gitBranch", "");
        newDataObject.setData("defaultBranch", "");
        newDataObject.setData("workspace", "");
        newDataObject.setData("workspaceName", "");
        newDataObject.setData("sourceBranch", "");
        newDataObject.setData("autoApprove", false);
        newDataObject.setData("reviewers", []);
        newDataObject.setData("reviewerNames", []);
        setDataObject({...newDataObject});
    };

    return (
      <DtoSelectInput
          setDataObject={setDataObject}
          setDataFunction={setSCMType}
          textField={"name"}
          valueField={"value"}
          dataObject={dataObject}
          filter={"contains"}
          selectOptions={SCM_TOOL ? SCM_TOOL : []}
          fieldName={"service"}
          disabled={disabled}
        />
    );
}

SCMTypeInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  gitTasksDataDto: PropTypes.object,
  disabled: PropTypes.bool,
};

export default SCMTypeInput;