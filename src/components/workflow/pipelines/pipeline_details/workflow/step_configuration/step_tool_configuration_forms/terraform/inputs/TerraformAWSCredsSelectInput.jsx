import React,{useContext, useState, useEffect} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import terraformStepActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/terraform/terraform-step-actions";

function TerraformAWSCredsSelectInput({dataObject, setDataObject, disabled}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [credsList, setCredsList] = useState([]);

  useEffect(() => {
    getCredsList();
    console.log("here", dataObject);
  }, [dataObject?.data?.type]);

  const handleDTOChange = async (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    await newDataObject.setData(fieldName, selectedOption.id);
    setDataObject({...newDataObject});
  };

  const getCredsList = async () => {
    setIsLoading(true);
    if(dataObject?.data?.type?.length){
      try {
        let filteredCredsList = await terraformStepActions?.fetchAWSDetails(getAccessToken);
        console.log(filteredCredsList);
        setCredsList(filteredCredsList);
      } catch (error) {
        toastContext.showErrorDialog(error);
      }
    }
    setIsLoading(false);
    return;
  };

  return (
    
     <SelectInputBase
       fieldName={"awsToolConfigId"}
       dataObject={dataObject}
       setDataObject={setDataObject}
       selectOptions={credsList ? credsList : []}
       valueField={"id"}
       textField={"name"}
       placeholderText={"Select Credentials"}
       setDataFunction={handleDTOChange}
       disabled={disabled || isLoading || credsList.length === 0}
       busy={isLoading}
     />
  );
}

TerraformAWSCredsSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
};

export default TerraformAWSCredsSelectInput;