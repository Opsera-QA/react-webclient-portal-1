import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSpinner, faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import {List} from "dhx-suite-package";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";

function ListInputBase(
  {
    fieldName, dataObject, setDataObject,
    selectOptions, valueField, textField,
    setDataFunction, isLoading, disabled, clearDataFunction,
    showClearValueButton, getCurrentValue,
    height, icon, filterFunction, showSelectAllButton
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    let list = new List(containerRef.current, {
      data: selectOptions,
      multiselection: disabled !== true || isLoading === true,
      selection: disabled !== true || isLoading === true,
      template
    });

    list.events.on("BeforeSelect", addItem);
    list.events.on("AfterUnselect", removeItem);
    const currentValues = findCurrentValue();

    if (Array.isArray(currentValues) && currentValues.length > 0) {
      currentValues.forEach((item) => {
        list.selection.add(item);
      });
    }

    if (filterFunction && searchTerm !== "") {
      list.data.filter((item) => {
        return filterFunction(item, searchTerm);
      });
    }
    else {
      list.data.filter();
    }

    // list.data.map(function (item, i) {
    //   if (!(i % 2)) {
    //     list.data.update(item.id, {css: "alt-background"});
    //   }
    //   else {
    //     list.data.update(item.id, {css: "primary-background"});
    //   }
    // });

    return () => {
      list.destructor();
    };
  }, [selectOptions, isLoading, searchTerm, dataObject]);

  function template(item) {
    return (`
      <div class='list_item'>
        <div class='item_name'>${item[textField]}</div>
      </div>
    `);
  }

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    // TODO: If we can get whole objects, we should do that
    // let parsedValues = parseValues(valueArray);

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

  const updateValue = (newArray) => {
    if (setDataFunction) {
      setDataFunction(field?.id, newArray);
    }
    else {
      validateAndSetData(field?.id, newArray);
    }
  };

  const addItem = (item) => {
    let currentData = findCurrentValue();

    if (Array.isArray(currentData) && !currentData.includes(item)) {
      if (currentData.length + 1 > field.maxItems) {
        setErrorMessage("You have reached the maximum allowed number of values. Please remove one to add another.");
        return false;
      }

      currentData.push(item);
      updateValue(currentData);
    }
  };

  const removeItem = (item) => {
    let currentData = findCurrentValue();

    if (Array.isArray(currentData) && currentData.includes(item)) {
      const index = currentData.indexOf(item);

      if (index > -1) {
        currentData.splice(index, 1);
        updateValue(currentData);
      }
    }
  };

  const clearValue = () => {
    if (!setDataFunction) {
      validateAndSetData(field.id, []);
    }
    else if (clearDataFunction) {
      clearDataFunction();
    }
  };

  // TODO: Make clearDataButton Component
  const getClearDataIcon = () => {
    if (dataObject?.getData(field?.id) !== "" && !disabled && showClearValueButton !== false && (setDataFunction == null || clearDataFunction)) {
      return (
        <TooltipWrapper innerText={"Clear this Value"}>
          <span onClick={() => clearValue()} className="my-auto badge badge-danger clear-value-badge pointer ml-2">
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>Clear Selection
          </span>
        </TooltipWrapper>
      );
    }
  };

  const selectAllOptions = () => {
    let newDataObject = dataObject;
    let newSelections = [];

    if (Array.isArray(selectOptions) && selectOptions.length > 0) {
      newSelections = selectOptions.map(item => item[valueField]);
    }

    newDataObject.setData(fieldName, newSelections);
    setDataObject({...newDataObject});
  };

  // TODO: Make selectAllIcon Component
  const getSelectAllIcon = () => {
    if (dataObject?.getData(field?.id) !== "" && !disabled && showSelectAllButton === true && setDataFunction == null) {
      return (
        <span onClick={() => selectAllOptions()} className="my-auto badge badge-success clear-value-badge pointer">
          <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1"/>Select All
        </span>
      );
    }
  };

  const findCurrentValue = () => {
    if (getCurrentValue) {
      return getCurrentValue();
    }

    return dataObject?.getArrayData(field.id);
  };

  const getItemCount = () => {
    const array = findCurrentValue();
    return Array.isArray(array) ? array.length : 0;
  };

  // TODO: Remake to something that makes more sense
  const getExtraRow = () => {
    return (
      <div className={"px-2 py-1 title-bar-selection-row d-flex justify-content-between"}>
        <div className={"text-muted"}>{getItemCount()} selected</div>
        <div className={"mb-1"}>{getSelectAllIcon()}{getClearDataIcon()}</div>
      </div>
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <div className={"h-100 w-100"}>
          <div className="w-100 info-text text-center p-3">
            <div className="row" style={{ height: height, width: "100%"}}>
              <div className="col-sm-12 my-auto text-center">
                <span><FontAwesomeIcon icon={faSpinner} spin className="mr-2 mt-1"/>Loading Data</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        id="list"
        style={{width: "100%", height: height}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  if (field == null) {
    return null;
  }

  // TODO: Pull out title bar and use on ListInput?
  return (
    <InputContainer className="list-input my-2">
      <div className={"content-container"}>
        <InputTitleBar icon={icon} isLoading={isLoading} field={field} setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
        {getExtraRow()}
        {getBody()}
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

ListInputBase.propTypes = {
  selectOptions: PropTypes.array.isRequired,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  groupBy: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  dataObject: PropTypes.object,
  valueField: PropTypes.string,
  textField: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  disabled: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array
  ]),
  showClearValueButton: PropTypes.bool,
  getCurrentValue: PropTypes.func,
  showLabel: PropTypes.bool,
  height: PropTypes.string,
  icon: PropTypes.object,
  filterFunction: PropTypes.func,
  showSelectAllButton: PropTypes.bool
};

ListInputBase.defaultProps = {
  height: "300px",
};

export default ListInputBase;