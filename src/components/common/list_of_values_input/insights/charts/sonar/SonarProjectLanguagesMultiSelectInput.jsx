import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import { DialogToastContext } from "contexts/DialogToastContext";
import { AuthContext } from "contexts/AuthContext";
import chartsActions from "components/insights/charts/charts-actions";
import IconBase from "components/common/icons/IconBase";

function SonarProjectLanguagesMultiSelectInput({
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
  const [projectLanguages, setProjectLanguages] = useState([]);
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
      "getSonarProjectLanguagesList"
    );

    if (response.data != null) {
      setProjectLanguages(response?.data?.data[0]?.SonarProjectLanguagesList?.data);
    }
  };

  if (!isLoading && (projectLanguages == null || projectLanguages.length === 0)) {
    return (
      <div className="form-text text-muted p-2">
        <IconBase icon={faExclamationCircle} className={"text-muted mr-1"} />
        No Languages available for Sonar.
      </div>
    );
  }

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      selectOptions={projectLanguages}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={placeholderText}
      disabled={disabled || isLoading}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
    />
  );
}

SonarProjectLanguagesMultiSelectInput.propTypes = {
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

SonarProjectLanguagesMultiSelectInput.defaultProps = {
  textField: "text",
  valueField: "value",
};

export default SonarProjectLanguagesMultiSelectInput;
