import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import AWSActionsHelper
  from "components/common/list_of_values_input/tools/aws/aws-actions-helper";

function AWSKeyPairSelectionInput({  awsToolId, visible, fieldName, dataObject, setDataObject, setDataFunction, clearDataFunction, disabled}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [keyPairs, setKeyPairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setKeyPairs([]);
    if ( awsToolId && awsToolId !== "") {
      loadData();
    }
  }, [awsToolId]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getKeyPairs();
    }
    catch (error) {
      console.error(error);
      toastContext.showFormErrorBanner(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getKeyPairs = async () => {
    const response  = await AWSActionsHelper.getKeyPairs(awsToolId, getAccessToken);
    let keyPairsResponse = response?.data?.data;

    if (Array.isArray(keyPairsResponse)) {
      setKeyPairs(keyPairsResponse);
    }
  };

  if (!visible) {
    return <></>;
  }

  const getNoKeyPairsMessage = () => {
    if (!isLoading && (keyPairs == null || keyPairs.length === 0) && awsToolId !== "") {
      return ("No Key Pairs Found!");
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        selectOptions={keyPairs}
        busy={isLoading}
        placeholderText={getNoKeyPairsMessage()}
        clearDataFunction={clearDataFunction}
        valueField="name"
        textField="name"
        disabled={disabled || isLoading || keyPairs.length === 0}
      />
    </div>
  );
}

AWSKeyPairSelectionInput.propTypes = {
  awsToolId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  clearDataFunction: PropTypes.func
};

AWSKeyPairSelectionInput.defaultProps = {
  visible: true,
};

export default AWSKeyPairSelectionInput;