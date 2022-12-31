import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import terraformWorkspaceStepActions from "../../terraformCloudWorkspaces.actions";

function TerraformVcsServiceSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, toolId, setVcsProviders}) {
  
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [vcsServiceTypes, setVcsServiceTypes] = useState([]);
  const [vcsProviderByService, setVcsProviderByService] = useState({});

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };

  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    try {
      await getVcsProviders(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getVcsProviders = async (cancelSource) => {    
    try {
      const {organizationName} = dataObject.getPersistData();
      const response = await terraformWorkspaceStepActions.getVcsProviders(getAccessToken, cancelTokenSource, toolId, organizationName);
      if(response?.data?.status === 200){        
        setVcsProviderByService(response.data.data);
        setVcsServiceTypes(Object.keys(response.data.data));
      }

    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog(error);
    }
  };

  const setDataFunction = ( fieldName, value ) => {
    setVcsProviders(vcsProviderByService[value]);
    let newDataObject = {...dataObject};
    newDataObject.setData(fieldName, value);
    newDataObject.setData("provider", "");
    newDataObject.setData("providerId", "");
    newDataObject.setData("oauthToken", "");
    newDataObject.setData("repository", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = ( fieldName ) => {
    setVcsProviders([]);
    let newDataObject = {...dataObject};
    newDataObject.setData("service", "");
    newDataObject.setData("provider", "");
    newDataObject.setData("providerId", "");
    newDataObject.setData("oauthToken", "");
    newDataObject.setData("repository", "");
    setDataObject({...newDataObject});
  };

  return (
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={vcsServiceTypes}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        valueField={valueField}
        textField={textField}
        placeholderText={"Select VCS Service"}
        disabled={disabled}
        busy={isLoading}
      />
  );
}

TerraformVcsServiceSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string,
  setVcsProviders: PropTypes.func,
};

TerraformVcsServiceSelectInput.defaultProps = {
  valueField: "service",
  textField: "service",
  fieldName: "service",
  disabled: false
};

export default TerraformVcsServiceSelectInput;
