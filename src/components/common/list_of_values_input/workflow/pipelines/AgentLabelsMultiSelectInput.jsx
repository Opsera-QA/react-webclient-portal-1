import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO:  Check with mahantha to get the actual agent label values and update it here
// TODO : un-comment when this feature is pushed - dependency ticket -KI-150 
export const jenkinsAgentArray = [
  {
    "name": "Opsera Agent",
    "env" : "linux",
    "agentLabel": "opsera",
  },
  {
    "name": "Node Agent",
    "env" : "linux",
    "agentLabel": "nodejs",
  },
  {
    "name": "Maven Agent",
    "env" : "linux",
    "agentLabel": "maven",
  }
];

function AgentLabelsMultiSelectInput({ fieldName, dataObject, setDataObject, setDataFunction, disabled }) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [disabledItems, setDisabledItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true)
      // await loadJenkinsAgents();
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
      valueField="agentLabel"
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
};

export default AgentLabelsMultiSelectInput;