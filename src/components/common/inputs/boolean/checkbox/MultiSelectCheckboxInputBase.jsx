import React, {useMemo} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import StandaloneCheckboxInput from "components/common/inputs/boolean/checkbox/StandaloneCheckboxInput";
import FieldLabel from "components/common/fields/FieldLabel";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";

// This is the first version so will probably require tweaks
export default function MultiSelectCheckboxInputBase(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    showLabel,
    textField,
    valueField,
    checkboxOptions,
    isLoading,
    singularTopic,
    pluralTopic,
    className,
    clearDataFunction,
    visible,
  }) {
  const field = model?.getFieldById(fieldName);
  const selectedOptions = DataParsingHelper.parseArray(model?.getData(fieldName), []);
  const parsedCheckboxOptions = useMemo(() => DataParsingHelper.parseArray(checkboxOptions), [checkboxOptions]);

  const validateAndSetData = (value) => {
    model.setData(fieldName, value);
    setModel({...model});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    } else {
      validateAndSetData(newValue);
    }
  };

  const clearData = () => {
    if (clearDataFunction) {
      clearDataFunction();
    } else {
      updateValue([]);
    }
  };

  const handleOptionSelection = (value) => {
    const selectedOptions = DataParsingHelper.parseArray(model?.getData(fieldName), []);
    const index = selectedOptions.indexOf(value);

    if (index === -1) {
      selectedOptions.push(value);
    } else {
      selectedOptions.splice(index, 1);
    }

    updateValue(selectedOptions);
  };

  const selectAllFunction = () => {
    const items = [];

    parsedCheckboxOptions.forEach((checkboxOption) => {
      if (typeof checkboxOption === "string") {
        items.push(checkboxOption);
      }

      const parsedSelectedOption = DataParsingHelper.parseObject(checkboxOption);

      if (parsedSelectedOption) {
        const value = parsedSelectedOption[valueField];

        if (value) {
          items.push(value);
        }
      }
    });

    updateValue(items);
  };

  const getCheckboxes = () => {
    if (isLoading === true && !parsedCheckboxOptions) {
      return (
        <CenterLoadingIndicator
          type={pluralTopic}
        />
      );
    }

    return parsedCheckboxOptions.map((checkboxOption) => {
      if (typeof checkboxOption === "string") {
        return (
          <StandaloneCheckboxInput
            key={checkboxOption}
            value={selectedOptions.includes(checkboxOption)}
            disabled={disabled}
            label={checkboxOption}
            setDataFunction={handleOptionSelection}
          />
        );
      }

      const parsedSelectedOption = DataParsingHelper.parseObject(checkboxOption);

      if (parsedSelectedOption) {
        const text = DataParsingHelper.parseString(parsedSelectedOption[textField]);
        const value = parsedSelectedOption[valueField];

        if (text && value) {
          return (
            <StandaloneCheckboxInput
              key={value}
              value={selectedOptions.includes(value)}
              disabled={disabled}
              label={text}
              setDataFunction={() => handleOptionSelection(value)}
            />
          );
        }
      }
    });
  };

  if (field == null || !parsedCheckboxOptions || visible === false) {
    return null;
  }

  return (
    <div className={className}>
      <InputLabel
        isLoading={isLoading}
        field={field}
        showLabel={showLabel}
        className={"bold input-label"}
        clearDataFunction={clearData}
        selectAllFunction={selectAllFunction}
      />
      <div className={"mx-1"}>
        {getCheckboxes()}
      </div>
      <InfoText
        field={field}
        model={model}
        fieldName={fieldName}
      />
    </div>
  );
}

MultiSelectCheckboxInputBase.propTypes = {
  disabled: PropTypes.bool,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  selectAllFunction: PropTypes.func,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  showLabel: PropTypes.func,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  checkboxOptions: PropTypes.array,
  isLoading: PropTypes.bool,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  className: PropTypes.string,
  visible: PropTypes.bool,
};

MultiSelectCheckboxInputBase.defaultProps = {
  textField: "text",
  valueField: "value",
  className: "my-2",
};