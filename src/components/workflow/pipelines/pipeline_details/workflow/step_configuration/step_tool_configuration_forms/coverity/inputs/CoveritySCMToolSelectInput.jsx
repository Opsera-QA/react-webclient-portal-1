import React,{useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import coverityStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/coverity/coverity-step-actions";

function CoveritySCMToolSelectInput({dataObject, setDataObject, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [SCMList, setSCMList] = useState([]);

  useEffect(() => {
    getToolsList();
  }, [dataObject?.data?.type]);

  const getToolsList = async () => {
    setIsLoading(true);
    if(dataObject?.data?.type?.length){
      try {
        let filteredToolsList = await coverityStepActions?.fetchSCMDetails(dataObject, "type", getAccessToken);
        setSCMList(filteredToolsList);
      } catch (error) {
        toastContext.showErrorDialog(error);
      }
    }
    setIsLoading(false);
    return;
  };

  return (
    
     <SelectInputBase
       fieldName={"gitToolId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={SCMList ? SCMList : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select a Tool"}
       disabled={disabled || isLoading || SCMList.length === 0}
       busy={isLoading}
     />
  );
}

CoveritySCMToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default CoveritySCMToolSelectInput;