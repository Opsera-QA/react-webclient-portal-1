import React from "react";
import PropTypes from "prop-types";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import verboseLoggingConstants
  from "@opsera/definitions/constants/platform/system_parameters/logging/verboseLogging.constants";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import StandaloneCheckboxInput from "components/common/inputs/boolean/checkbox/StandaloneCheckboxInput";

export default function PlatformSystemVerboseLoggingMultiCheckboxInput(
  {
    fieldName,
    model,
    setModel,
    className,
    disabled,
  }) {
  const field = model?.getFieldById(fieldName);
  const selectOptions = DataParsingHelper.parseArray(verboseLoggingConstants.VERBOSE_LOGGING_IDENTIFIER_SELECT_OPTIONS, []);

  const setDataFunction = (identifier, value) => {
    const data = DataParsingHelper.parseObject(model?.getData(fieldName), {});
    data[identifier] = value === true;
    model.setData("value", data);
    setModel({...model});
  };

  if (field == null) {
    return null;
  }

  return(
    <InputContainer className={className}>
      <InputLabel
        field={field}
      />
      {selectOptions.map((selectOption) => {
        return (
          <div key={selectOption.value}>
            <StandaloneCheckboxInput
              className={""}
              disabled={disabled}
              label={selectOption?.text}
              value={model?.getData(fieldName)?.[selectOption?.value] === true}
              setDataFunction={() => setDataFunction(selectOption?.value, model?.getData(fieldName)?.[selectOption?.value] !== true)}
            />
          </div>
        );
      })}
    </InputContainer>
  );
}

PlatformSystemVerboseLoggingMultiCheckboxInput.propTypes = {
  className: PropTypes.string,
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};