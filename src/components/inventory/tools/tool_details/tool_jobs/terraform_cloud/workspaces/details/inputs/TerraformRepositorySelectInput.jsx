import React, { useContext, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import terraformWorkspaceStepActions from "../../terraformCloudWorkspaces.actions";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TerraformRepositorySelectInput = ({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  toolId
}) => {

  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [terraformRepos, setTerraformRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

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
      await getTerraformRepos(cancelSource);
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTerraformRepos = async (cancelSource) => {
    try {
      const {oauthToken} = dataObject.getPersistData();
      const response = await terraformWorkspaceStepActions.getVcsProviderRepositories(getAccessToken, cancelTokenSource, toolId, oauthToken);
      if(response?.data?.status === 200 && Array.isArray(response?.data?.data)){
        const repoData = response.data.data;
        repoData.push("Others");
        setTerraformRepos(repoData);
      }

    } catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog(error);
    }
  };

  return (
    <SelectInputBase 
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={terraformRepos}
      textField={textField}
      valueField={valueField}
      busy={isLoading}
      placeholderText="Select Repository"
      disabled={disabled || isLoading || (!isLoading && (terraformRepos == null || terraformRepos.length === 0))}
    />
  );
};

TerraformRepositorySelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  toolId: PropTypes.string,
};

TerraformRepositorySelectInput.defaultProps = {
  fieldName: "repository",
  textField: "repository",
  valueField: "repository",
};

export default TerraformRepositorySelectInput;
