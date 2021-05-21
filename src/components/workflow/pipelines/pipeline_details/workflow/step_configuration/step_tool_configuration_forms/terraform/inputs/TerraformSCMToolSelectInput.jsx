import React,{useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import terraformStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/terraform-step-actions";

function TerraformSCMToolSelectInput({dataObject, setDataObject, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [SCMList, setSCMList] = useState([]);

  useEffect(() => {
    getToolsList();
  }, [dataObject?.data?.type]);

  const handleDTOChange = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption.id);
    setDataObject({...newDataObject});
  };

  const getToolsList = async () => {
    setIsLoading(true);
    if(dataObject?.data?.type?.length){
      try {
        let filteredToolsList = await terraformStepActions?.fetchSCMDetails(dataObject, "type", getAccessToken);
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
       setDataFunction={handleDTOChange}
       disabled={disabled || isLoading || SCMList.length === 0}
       busy={isLoading}
     />
  );
}

TerraformSCMToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformSCMToolSelectInput;