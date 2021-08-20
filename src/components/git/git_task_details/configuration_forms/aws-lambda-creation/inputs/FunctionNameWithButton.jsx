import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import TextInputWithButtonBase from "components/common/inputs/text/TextInputWithButtonBase";
import { faSpinner, faLaptopMedical } from "@fortawesome/pro-light-svg-icons";
import AWSLambdaFunctionActions from "../aws-lambda-actions";
import { AuthContext } from "contexts/AuthContext";
import TextInputWithButtonAWSLambda from "./TextWithInputAWSLambda";

const FunctionNameWithButton = ({dataObject, setDataObject, stepTool}) => {

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
        response = await AWSLambdaFunctionActions.getFunctions(
          getAccessToken,
          dataObject
        );
      }
      let functions = response?.data?.data;

      if (functions && functions?.length > 0 && !functions.includes(dataObject.getData("functionName"))) {
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
    <TextInputWithButtonAWSLambda
      setDataObject={setDataObject}
      dataObject={dataObject}
      fieldName={"functionName"}
      btnVariant="success"
      btnText={loading ? 'Validating' : 'Validate'}
      btnDisabled={
        (dataObject && dataObject.getData("functionName").length === 0) ||
        (stepTool &&
          stepTool?.configuration?.functionName &&
          dataObject &&
          stepTool.configuration.functionName === dataObject.getData("functionName"))
      }
      btnClickHandler={testConnection}
      btnIcon={loading ? faSpinner : faLaptopMedical}
      btnToolTipText="Validate Function Name"
      errorMsg={failedConnection ? "Function Name already Exists" : ""}
      successMsg={successfulValidation ? "Function Name is Valid" : ""}
    />
  );
};

FunctionNameWithButton.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  stepTool: PropTypes.object,
};

export default FunctionNameWithButton;
