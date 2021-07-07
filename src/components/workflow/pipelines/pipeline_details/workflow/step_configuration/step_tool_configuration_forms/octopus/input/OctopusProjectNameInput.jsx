import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import TextInputWithButtonBase from "components/common/inputs/text/TextInputWithButtonBase";
import { faSpinner, faLaptopMedical } from "@fortawesome/pro-light-svg-icons";
import OctopusStepActions from "../octopus-step-actions";
import { AuthContext } from "contexts/AuthContext";

const OctopusProjectNameInput = ({dataObject, setDataObject, stepTool}) => {

  const { getAccessToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [successfulValidation, setSuccessfulValidation] = useState(false);
  const [failedConnection, setFailedConnection] = useState(false);

  const testConnection = async () => {    
    setLoading(true);
    setSuccessfulValidation(false);
    setFailedConnection(false);
    try {      
      let response;

      if (dataObject != null) {
        response = await OctopusStepActions.validateProjectName(
          dataObject.getData("octopusToolId"),
          dataObject.getData("spaceId"),
          dataObject.getData("projectName"),
          dataObject,
          getAccessToken
        );
      }

      if (response && response.data != null && response.data.status === "Success") {
        setSuccessfulValidation(true);
      } else {
        setFailedConnection(true);        
      }
    } catch (error) {
      setFailedConnection(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextInputWithButtonBase
      setDataObject={setDataObject}
      dataObject={dataObject}
      fieldName={"projectName"}
      disabled={dataObject && dataObject.getData("spaceName").length === 0}
      btnVariant="success"
      btnText={loading ? 'validating' : 'validate'}
      btnDisabled={
        (dataObject && dataObject.getData("projectName").length === 0) ||
        (stepTool &&
          stepTool.configuration &&
          stepTool.configuration.projectId &&
          stepTool.configuration.projectName &&
          dataObject &&
          stepTool.configuration.projectName === dataObject.getData("projectName"))
      }      
      btnClickHandler={testConnection}
      btnIcon={loading ? faSpinner : faLaptopMedical}
      btnToolTipText="Validate Project Name"
      errorMsg={failedConnection ? "Project Name already Exists" : ""}
      successMsg={successfulValidation ? "Project Name is Valid" : ""}
    />
  );
};

OctopusProjectNameInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  stepTool: PropTypes.object,
};

export default OctopusProjectNameInput;
