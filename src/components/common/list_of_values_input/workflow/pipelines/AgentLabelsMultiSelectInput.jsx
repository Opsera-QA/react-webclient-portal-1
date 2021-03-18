import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";

// TODO:  Check with mahantha to get the actual agent label values and update it here
// TODO : un-comment when this feature is pushed - dependency ticket -KI-150 
export const jenkinsAgentArray = [
  {
    "name": "Ubuntu Agent",
    "env" : "linux",
    "value": "generic-linux",
  }
];

function AgentLabelsMultiSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [disabledItems, setDisabledItems] = useState([]);
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
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    }
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true)
      // await loadJenkinsAgents(cancelSource);
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={jenkinsAgentArray}
      setDataFunction={setDataFunction}
      groupBy="env"
      valueField="value"
      textField="name"
      disabled={disabled}
    />
  );
}

AgentLabelsMultiSelectInput.propTypes = {
  currentPipelineId: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool
};

export default AgentLabelsMultiSelectInput;