import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";

function SonarProjectsMultiSelectInput({
  placeholderText,
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  setDataFunction,
  disabled,
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [sonarProjects, setSonarProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({ ...newDataObject });
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await loadTools();
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTools = async () => {
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(
      getAccessToken,
      undefined,
      "getSonarProjectsList"
    );
    if (response.data != null) {
      setSonarProjects(response?.data?.data[0]?.SonarProjectsList?.data);
    }
  };

  if (!isLoading && (sonarProjects == null || sonarProjects.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <FontAwesomeIcon icon={faExclamationCircle} className="text-muted mr-1" fixedWidth />
        No Projects available for Sonar.
      </div>
    );
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={sonarProjects}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
    />
  );
}

SonarProjectsMultiSelectInput.propTypes = {
  placeholderText: PropTypes.string,
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
};

SonarProjectsMultiSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default SonarProjectsMultiSelectInput;
