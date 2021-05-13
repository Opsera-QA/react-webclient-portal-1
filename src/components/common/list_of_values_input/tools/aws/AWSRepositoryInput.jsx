import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";

function AWSRepositoryInput({  awsToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRepositories([]);
    if ( awsToolId && awsToolId !== "") {
      loadData();
    }
  }, [awsToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getRepositories();
    }
    catch (error) {
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
    finally {
      setIsLoading(false);
    }
  };

  const getRepositories = async () => {
    const response  = await AWSActionsHelper.searchECRRepositories(awsToolId, getAccessToken);
    let repositoriesResponse = response?.data?.data;

    if (Array.isArray(repositoriesResponse)) {
      setRepositories(repositoriesResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoRepositoriesMessage = () => {
    if (!isLoading && (repositories == null || repositories.length === 0) && awsToolId !== "") {
      return ("No Repositories Found!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={repositories}
        busy={isLoading}
        placeholderText={getNoRepositoriesMessage()}
        clearDataFunction={clearDataFunction}
        valueField="name"
        textField="name"
        disabled={disabled || isLoading || repositories.length === 0}
      />
    </div>
  );
}

AWSRepositoryInput.propTypes = {
  awsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

AWSRepositoryInput.defaultProps = {
  visible: true,
};

export default AWSRepositoryInput;