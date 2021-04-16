import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import { Multiselect } from 'react-widgets';
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-light-svg-icons";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import analyticsActions from "components/settings/analytics/analytics-settings-actions";

function ManualKpiMultiSelectInputBase({ fieldName, dataObject, type, setDataObject, groupBy, disabled, placeholderText, setDataFunction, busy, showClearValueButton, clearDataFunction, className}) {
  const [errorMessage, setErrorMessage] = useState("");
  const { getAccessToken } = useContext(AuthContext);
  const [field] = useState(dataObject.getFieldById(fieldName));
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getDropdownOptions(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage(`Could not load ${type}s.`);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getDropdownOptions = async (cancelSource = cancelTokenSource) => {
    const response = await analyticsActions.getDropdownFilterOptions(getAccessToken, cancelSource, type);
    const options = response?.data;

    console.log("options: " + JSON.stringify(options));

    if (isMounted?.current === true && Array.isArray(options) && options.length > 0)
    {
      setSelectOptions(options);
    }
  };

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;

    if (valueArray.length > field.maxItems) {
      setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
      return;
    }

    newDataObject.setData(fieldName, valueArray);
    let errors = newDataObject.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }

    setDataObject({...newDataObject});
  };

  const handleCreate = (newValue) => {
    let newValueArray = dataObject.getArrayData(fieldName);
    newValueArray.push(newValue);
    validateAndSetData(fieldName, newValueArray);
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field.id, []);
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  const getClearDataIcon = () => {
    if (dataObject.getData(field.id) !== "" && !disabled && showClearValueButton && (setDataFunction == null || clearDataFunction)) {
      return (
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearValue()} className="my-auto badge badge-danger clear-value-badge pointer">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Clear Value
          </span>
        </TooltipWrapper>
      );
    }
  };

  if (field == null) {
    return <></>;
  }

  return (
    <InputContainer className={className ? className : undefined}>
      <InputLabel field={field} inputPopover={getClearDataIcon()} />
      <div className={"custom-multiselect-input"}>
        <Multiselect
          data={selectOptions}
          busy={busy || isLoading}
          allowCreate={true}
          onCreate={(value) => handleCreate(value)}
          filter="contains"
          groupBy={groupBy}
          value={dataObject.getArrayData(fieldName) ? [...dataObject.getArrayData(fieldName)] : [] }
          placeholder={placeholderText}
          disabled={disabled}
          onChange={newValue => setDataFunction ? setDataFunction(field.id, newValue) : validateAndSetData(field.id, newValue)}
        />
      </div>
      <InfoText errorMessage={errorMessage} field={field} />
    </InputContainer>
  );
}

ManualKpiMultiSelectInputBase.propTypes = {
  selectOptions: PropTypes.array,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.string,
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  placeholderText: PropTypes.string,
  maxNumber: PropTypes.number,
  setDataFunction: PropTypes.func,
  busy: PropTypes.bool,
  showClearValueButton: PropTypes.bool,
  clearDataFunction: PropTypes.func,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  className: PropTypes.string,
  type: PropTypes.string
};

ManualKpiMultiSelectInputBase.defaultProps = {
  showClearValueButton: true,
  selectOptions: []
};

export default ManualKpiMultiSelectInputBase;