import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import dataMappingActions from "../../../../../settings/data_mapping/data-mapping-actions";

function SonarProjectSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProjects([]);
    if (tool_prop != null && dataObject.getData("tool_identifier") && dataObject.getData("tool_id")) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadSonarProjects();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadSonarProjects = async () => {
    let results = await dataMappingActions.getSonarProjects(dataObject, getAccessToken);
    if (typeof results != "object") {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${dataObject.getData("tool_identifier")} projects`);
      return;
    }
    if (results && results.status === 200) {
      setProjects(results.data);
      return;
    }
    setProjects([]);
  };

  const handleDtoChange = async (fieldName, value) => {
    if (fieldName === "key") {
      let newDataObject = dataObject;
      newDataObject.setData("key", value.name);
      setDataObject({ ...newDataObject });
      return;
    }
  };

  return (
    <SelectInputBase
      setDataFunction={handleDtoChange}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={projects ? projects : []}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a Sonar Project"}
      disabled={isLoading || projects.length === 0}
    />
  );
}

SonarProjectSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

SonarProjectSelectInput.defaultProps = {
  fieldName: "key",
  valueField: "name",
  textField: "name"
};

export default SonarProjectSelectInput;