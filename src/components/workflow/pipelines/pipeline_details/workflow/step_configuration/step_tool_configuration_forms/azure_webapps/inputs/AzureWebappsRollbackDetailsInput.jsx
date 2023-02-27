import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import azureWebappsActions from "../azureWebapps-step-actions";
import axios from "axios";
import { AuthContext } from "contexts/AuthContext";
import { hasStringValue } from "components/common/helpers/string-helpers";

function AzureWebappsRollbackDetailsInput({
  model,
  setModel,
  disabled,
  plan,
  artifactStepId,
  extension,
  pipelineId,
}) {

  const [versionsList, setVersionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select Rollback Version");
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const { getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    if (hasStringValue(artifactStepId) === true && hasStringValue(extension) === true) {
      loadData(source).catch((error) => {
        throw error;
      });
    }
  }, [artifactStepId, extension]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setPlaceholder("Select Rollback Version");
      setErrorMessage("");
      setIsLoading(true);
      await fetchRollbackVersions(cancelSource);      
    } catch (error) {
      setErrorMessage(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRollbackVersions = async (cancelSource = cancelTokenSource) => {    
    try {
      const artifactStep = plan.find(step => step._id === artifactStepId);
      const response = await azureWebappsActions.getRollbackVersions(getAccessToken, cancelSource, pipelineId, artifactStepId, extension, artifactStep?.tool?.tool_identifier);
      const versions = response?.data?.data;
      if (Array.isArray(versions)){
        setVersionsList(versions);
      }      
    } catch (error) {
      setPlaceholder("No Rollback Versions Available");
      setErrorMessage(error);
    }
  };

  const setDataFunction = (fieldName, selectedOption) => {    
    let newModel = {...model};
    newModel.setData(fieldName, selectedOption);
    newModel.setDefaultValue("rollbackVersion");
    setModel({...newModel});
  };

  const getRollbackFields = () => {
    if (model?.getData("rollbackEnabled") === true) {
      return (
        <SelectInputBase
          fieldName={"rollbackVersion"}
          dataObject={model}
          className={"mb-3"}
          setDataObject={setModel}
          selectOptions={versionsList}
          busy={isLoading}          
          placeholderText={placeholder}
          disabled={disabled || isLoading}
          error={errorMessage}
        />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"rollbackEnabled"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />
      {getRollbackFields()}
    </>
  );
}

AzureWebappsRollbackDetailsInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array,
  artifactStepId: PropTypes.string,
  extension: PropTypes.string,
  pipelineId: PropTypes.string,
};

export default AzureWebappsRollbackDetailsInput;
