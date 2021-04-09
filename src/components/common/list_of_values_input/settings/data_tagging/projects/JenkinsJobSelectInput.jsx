import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import dataMappingActions from "../../../../../settings/data_mapping/data-mapping-actions";

function JenkinsJobSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJobs([]);
    if (tool_prop != null && dataObject.getData("tool_identifier") && dataObject.getData("tool_id")) {
      loadData();
    }
  }, [tool_prop]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadJenkinsJobs();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const loadJenkinsJobs = async () => {
    let results = await dataMappingActions.getJenkinsJobs(dataObject, getAccessToken);
    if (typeof results != "object") {
      toastContext.showLoadingErrorDialog(`There has been an error in fetching ${dataObject.getData("tool_identifier")} jobs`);
      return;
    }
    if (results && results.status === 200) {
      setJobs(results.data);
      return;
    }
    setJobs([]);
  };

  const handleDtoChange = async (fieldName, value) => {
    if (fieldName === "key") {
      let newDataObject = dataObject;
      newDataObject.setData("key", value);
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
      selectOptions={jobs ? jobs : []}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={"Select a Jenkins Job"}
      disabled={isLoading || jobs.length === 0}
    />
  );
}

JenkinsJobSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string
};

JenkinsJobSelectInput.defaultProps = {
  fieldName: "key",
  valueField: "name",
  textField: "name"
};

export default JenkinsJobSelectInput;