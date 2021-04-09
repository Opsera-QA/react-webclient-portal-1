import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import MultiSelectInputBase from "../../../../../../../../common/inputs/select/MultiSelectInputBase";
import Select from "react-select";
import PipelineActions from "../../../../../../../../workflow/pipeline-actions";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faTools } from "@fortawesome/free-solid-svg-icons";

function OctopusToolSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [octopusList, setOctopusList] = useState([]);
  const [isOctopusSearching, setIsOctopusSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select an Octopus account configured in the Opsera Tool Registry");

  useEffect(() => {
      loadData();

  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await fetchOctopusDetails();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getInfoText = () => {
    if (dataObject.getData(fieldName) !== "") {
      return (
        <Link to={`/inventory/tools/details/${dataObject.getData(fieldName)}`}>
          <span><FontAwesomeIcon icon={faTools} className="pr-1" />View Or Edit this Tool&apos;s Registry settings</span>
        </Link>
      );
    }
    return <span>Select a tool to get started.</span>;
  };


  const fetchOctopusDetails = async () => {
    setIsOctopusSearching(true);
    try {
      let results = await PipelineActions.getToolsList("octopus", getAccessToken);

      const filteredList = results.filter((el) => el.configuration !== undefined);
      if (filteredList) {
        setOctopusList(filteredList);
      }
    } catch(error) {
      setPlaceholder("No Octopus Tools Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    } finally {
      setIsOctopusSearching(false);
    }
  };

  const handleDTOChange = async (fieldName, value) => {
    if (fieldName === "octopusToolId") {
      let newDataObject = dataObject;
      newDataObject.setData("octopusToolId", value.id);
      newDataObject.setData("toolURL", value.configuration.toolURL);
      newDataObject.setData("octopusApiKey", value.configuration.octopusApiKey);
      setDataObject({ ...newDataObject });
      return;
    }
  };


  return (
    <div>
      <SelectInputBase
        setDataFunction={handleDTOChange}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={octopusList ? octopusList : []}
        busy={isOctopusSearching}
        valueField={valueField}
        textField={textField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (octopusList == null || octopusList.length === 0))}
      />
      <small className="text-muted ml-3">
        {getInfoText()}
      </small>
    </div>
  );
}

OctopusToolSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

OctopusToolSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusToolSelectInput;