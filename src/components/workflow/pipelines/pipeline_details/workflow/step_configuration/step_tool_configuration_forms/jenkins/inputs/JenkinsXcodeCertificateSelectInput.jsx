import React,{ useEffect,useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function JenkinsXcodeCertificateSelectInput({
  fieldName,
  model,
  setModel,
  disabled,
  jenkinsList,
  toolConfigId,
}) {
  const [certificatesList, setCertificatesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    setCertificatesList([]);
    setIsLoading(true);
    if(Array.isArray(jenkinsList) && jenkinsList.length > 0){
      const accounts = jenkinsList[jenkinsList.findIndex((x) => x.id === toolConfigId)]?.accounts;
      console.log({accounts});
      const certificates = accounts.filter(account => account.service === "secretFile");

      if (Array.isArray(certificates) && certificates.length > 0) {
        setCertificatesList(certificates);
      }
      setIsLoading(false);
    }
  },[jenkinsList, toolConfigId]);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      placeholderText={"Select Certificate"}
      selectOptions={certificatesList}      
      helpTooltipText={"Certificate must be configured in the Accounts tab of the selected Jenkins tool."} 
      disabled={disabled || certificatesList.length===0}
      valueField={"credentialsId"}
      textField={"credentialsId"}
      busy={isLoading}
    />
  );    
}

JenkinsXcodeCertificateSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  jenkinsList: PropTypes.any,
  toolConfigId: PropTypes.string,  
};

JenkinsXcodeCertificateSelectInput.defaultProps = {
  fieldName: "credentailsId",
};

export default JenkinsXcodeCertificateSelectInput;
