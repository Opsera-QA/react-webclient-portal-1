import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NexusToolSelectInput = ({dataObject, setDataObject, disabled, getToolsList}) => {

  const [nexusList, setNexusList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchNexusDetails();    
  }, []);
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = dataObject;
    newDataObject.setData("nexusToolConfigId", selectedOption.id);
    newDataObject.setData("repositoryFormat", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("jobName", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("dockerPort", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fileName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("nexusToolConfigId", "");
    newDataObject.setData("repositoryFormat", "");
    newDataObject.setData("repositoryName", "");
    newDataObject.setData("toolConfigId", "");
    newDataObject.setData("jobType", "");
    newDataObject.setData("jobDescription", "");
    newDataObject.setData("toolJobType", "");
    newDataObject.setData("jobName", "");
    newDataObject.setData("agentLabels", "");
    newDataObject.setData("dockerPort", "");
    newDataObject.setData("groupName", "");
    newDataObject.setData("artifactName", "");
    setDataObject({...newDataObject});
  };

  const fetchNexusDetails = async () => {
    setIsLoading(true);    
    let results = await getToolsList("nexus");
    const filteredList = results.filter((el) => el.configuration !== undefined);
    if (filteredList) {
      setNexusList(filteredList);
    }
    setIsLoading(false);
  };

  if (!isLoading && (nexusList == null || nexusList.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No accounts have been registered for Nexus. Please go to
        <Link to="/inventory/tools">Tool Registry</Link> and add a Nexus Account entry in order to proceed.
      </div>
    );
  }

  return (
    <div>
      <SelectInputBase
        fieldName={"nexusToolConfigId"}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        clearDataFunction={clearDataFunction}
        selectOptions={nexusList ? nexusList : []}      
        busy={isLoading}
        valueField="id"
        textField="name"      
        disabled={disabled}
      />
    </div>    
  );
};

NexusToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  nexusToolConfigId: PropTypes.string,
  disabled: PropTypes.bool,
  getToolsList: PropTypes.func,
};

NexusToolSelectInput.defaultProps = {
  disabled: false
};

export default NexusToolSelectInput;