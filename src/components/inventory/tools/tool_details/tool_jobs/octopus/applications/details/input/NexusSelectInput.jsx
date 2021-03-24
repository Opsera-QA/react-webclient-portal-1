import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import PipelineActions from "../../../../../../../../workflow/pipeline-actions";

function NexusToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [nexusList, setNexusList] = useState([]);
  const [isNexusSearching, setIsNexusSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Nexus account configured in the Opsera Tool Registry");

  useEffect(() => {
    if (!disabled) {
      setNexusList([]);
      loadData();
    }
    if (disabled && tool_prop.length > 0) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchAWSDetails();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const fetchAWSDetails = async () => {
    setIsNexusSearching(true);
    try {
      let results = await PipelineActions.getToolsList("nexus", getAccessToken);

      const filteredList = results.filter((el) => el.configuration !== undefined);
      if (filteredList) {
        setNexusList(filteredList);
      }
    } catch(error) {
      setPlaceholder("No Accounts Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsNexusSearching(false);
    }
  };


  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={nexusList ? nexusList : []}
        busy={isNexusSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (nexusList == null || nexusList.length === 0))}
      />
    </div>
  );
}

NexusToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

NexusToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default NexusToolSelectInput;