import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faTimes} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import InfoText from "components/common/inputs/info_text/InfoText";
import InputContainer from "components/common/inputs/InputContainer";
import {List} from "@opsera/dhx-suite-package";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import ComponentLoadingWrapper from "components/common/loading/ComponentLoadingWrapper";
import StandaloneDatePickerInput from "components/common/inputs/date/StandaloneDateTimeInput";

// TODO: Make an actual base version and rename this VanityListInput
// TODO: Refactor
function ListInputBase(
  {
    fieldName,
    dataObject,
    setDataObject,
    selectOptions,
    valueField,
    textField,
    setDataFunction,
    isLoading,
    disabled,
    clearDataFunction,
    showClearValueButton,
    getCurrentValue,
    height,
    icon,
    searchFunction,
    showSelectAllButton,
    customTemplate,
    disabledOptions,
    noDataMessage,
    customTitle,
    loadDataFunction,
}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const [list, setList] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    if (selectOptions == null) {
      return;
    }

    let list = constructList();

    return () => {
      list?.destructor();
    };
  }, [selectOptions, isLoading]);

  useEffect(() => {
    if (list && searchFunction) {
      if (searchTerm !== "") {
        list.data.filter((item) => {
          return searchFunction(item, searchTerm);
        });
      }
      else {
        list.data.filter();
      }
    }
  }, [searchTerm]);

  // TODO: We should probably also handle selection here. Look at when more use cases arise
  useEffect(() => {
    if (list) {
      const currentValues = findCurrentValue();

      if (Array.isArray(currentValues) && currentValues.length === 0) {
        list.selection.remove();
      }

      if (dataObject?.isNew() === false || dataObject?.isChanged(fieldName) === true) {
        validateData(dataObject);
      }
    }
  }, [dataObject]);

  const constructList = () => {
    if (Array.isArray(selectOptions) && selectOptions.length > 0) {
      selectOptions.forEach(data => data.id = data[valueField]);
    }

    let list = new List(containerRef.current, {
      data: selectOptions || [],
      multiselection: disabled !== true && isLoading !== true,
      selection: disabled !== true && isLoading !== true,
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

    if (searchFunction && searchTerm !== "") {
      list.data.filter((item) => {
        return searchFunction(item, searchTerm);
      });
    }
    else {
      list.data.filter();
    }

    setList(list);
    return list;
  };

  const template = (item) => {
    if (customTemplate) {
      return customTemplate(item);
    }

    return (`
      <div class='list_item'>
        <div class='item_name'>${item[textField]}</div>
      </div>
    `);
  };

  const validateData = (dataModel) => {
    let errors = dataModel?.isFieldValid(field.id);

    if ( errors != null && errors !== true) {
      setErrorMessage(errors[0]);
    }
    else {
      setErrorMessage("");
    }
  };

  const validateAndSetData = (fieldName, valueArray) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, valueArray);
    validateData(newDataObject);
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

    if (Array.isArray(disabledOptions) && disabledOptions.length > 0) {
      let itemDisabled = disabledOptions.find((option) => option[valueField] === item);

      if (itemDisabled) {
        return false;
      }
    }

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
    list.selection.remove();
    updateValue([]);
  };

  // TODO: Make clearDataButton Component
  const getClearDataIcon = () => {
    if (!disabled && dataObject?.getArrayData(field?.id)?.length > 0 && showClearValueButton !== false && (setDataFunction == null || clearDataFunction)) {
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
    let newSelections = [];

    if (Array.isArray(selectOptions) && selectOptions.length > 0) {
      list.selection.remove();
      selectOptions.forEach((item) => {
        if (Array.isArray(disabledOptions) && disabledOptions.length > 0) {
          let itemDisabled = disabledOptions.find((option) => option[valueField] === item[valueField]);

          if (itemDisabled) {
            return;
          }
        }

        newSelections.push(item[valueField]);
        list.selection.add(item[valueField]);
      });
    }

    updateValue(newSelections);
  };

  // TODO: Make selectAllIcon Component
  const getSelectAllIcon = () => {
    if (!disabled && selectOptions.length > 0 && showSelectAllButton === true) {
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

  const getList = () => {
    return (
      <div
        id="list"
        style={{width: "100%", height: height}}
        ref={el => (containerRef.current = el)}
      />
    );
  };

  const getBody = () => {
    return (
      <div style={{height: height}}>
        <ComponentLoadingWrapper
          isLoading={isLoading}
          data={selectOptions}
          component={getList()}
          noDataMessage={noDataMessage}
        />
      </div>
    );
  };

  if (field == null) {
    return null;
  }

  // TODO: Pull out title bar and use on ListInput?
  return (
    <InputContainer className="list-input my-2">
      <div className={"content-container"}>
        <InputTitleBar
          disabled={disabled || selectOptions.length === 0}
          icon={icon}
          isLoading={isLoading}
          customTitle={customTitle}
          field={field}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          showSearchBar={searchFunction != null}
          loadDataFunction={loadDataFunction}
        />
        {getExtraRow()}
        {getBody()}
      </div>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
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
  searchFunction: PropTypes.func,
  showSelectAllButton: PropTypes.bool,
  customTemplate: PropTypes.func,
  disabledOptions: PropTypes.array,
  noDataMessage: PropTypes.string,
  customTitle: PropTypes.string,
  loadDataFunction: PropTypes.func,
};

ListInputBase.defaultProps = {
  height: "300px",
  noDataMessage: "No items are currently available"
};

export default ListInputBase;