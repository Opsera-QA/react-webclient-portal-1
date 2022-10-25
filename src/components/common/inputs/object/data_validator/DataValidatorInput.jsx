import React, { useState } from "react";
import PropTypes from "prop-types";
import JsonInputBase from "components/common/inputs/object/JsonInputBase";
import InfoContainer from "components/common/containers/InfoContainer";
import { faShield } from "@fortawesome/pro-light-svg-icons";
import VanityCreateButton from "components/common/buttons/saving/VanityCreateButton";
import VanitySaveButtonBase from "components/common/buttons/saving/VanitySaveButtonBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function DataValidatorInput(
  {
    fieldName,
    model,
    disabled,
    className,
    handleClose,
  }) {
  const [json, setJson] = useState(model?.getCurrentData());
  const [clonedModel, setClonedModel] = useState(model?.clone());

  const setDataFunction = (value) => {
    setJson(value);
    clonedModel.replaceData(value);
    setClonedModel({...clonedModel});
  };

  const getSaveButton = () => {
    if (clonedModel.isNew()) {
      return (
        <VanityCreateButton
          model={clonedModel}
          handleClose={handleClose}
          size={"sm"}
        />
      );
    }

    return (
      <VanitySaveButtonBase
        model={clonedModel}
        size={"sm"}
      />
    );
  };

  return (
    <InfoContainer
      className={className}
      titleText={"Data Validator"}
      titleIcon={faShield}
      titleRightSideButton={getSaveButton()}
    >
      <JsonInputBase
        value={json}
        fieldName={fieldName}
        customTitle={"Data Validator"}
        disabled={disabled}
        setDataFunction={setDataFunction}
      />
    </InfoContainer>
  );
}

DataValidatorInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  handleClose: PropTypes.func,
};