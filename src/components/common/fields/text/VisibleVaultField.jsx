import React, { useState } from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import CopyToClipboardIconBase from "components/common/icons/link/CopyToClipboardIconBase";
import ShowSensitiveDataIcon from "components/common/icons/password/ShowSensitiveDataIcon";
import { hasStringValue } from "components/common/helpers/string-helpers";

function VisibleVaultField({model, fieldName, className, showClipboardButton, pullVaultDataFunction, isStoredInVault}) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [vaultValue, setVaultValue] = useState("");
  const [valueShown, setValueShown] = useState(false);

  const getText = () => {
    if (valueShown && hasStringValue(vaultValue) === true) {
      return <span>{vaultValue}</span>;
    }

    if (isStoredInVault === true) {
      return <span>This credential is securely stored in the vault</span>;
    }
  };

  const getClipboardButton = () => {
    if (showClipboardButton !== false) {
      return (
        <CopyToClipboardIconBase
          className={"my-auto ml-3"}
          copyString={vaultValue}
        />
      );
    }
  };

  const hideVaultValue = () => {
    setVaultValue("");
    setValueShown(false);
  };

  const pullDataFromVault = async () => {
    if (pullVaultDataFunction) {
      const newVaultValue = await pullVaultDataFunction();

      if (newVaultValue) {
        setVaultValue(newVaultValue);
        setValueShown(true);
      }
    }
  };

  const getPullFromVaultButton = () => {
    if (pullVaultDataFunction != null) {
      return (
        <ShowSensitiveDataIcon
          showDataFunction={pullVaultDataFunction ? pullDataFromVault : undefined}
          valueShown={valueShown}
          fieldName={fieldName}
          className={"my-auto ml-3"}
          model={model}
          hideDataFunction={hideVaultValue}
        />
      );
    }
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <FieldLabel field={field}/>
        <span className={"d-flex"}>
          {getText()}
          {getClipboardButton()}
          {getPullFromVaultButton()}
        </span>
      </div>
    </FieldContainer>
  );
}

VisibleVaultField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  showClipboardButton: PropTypes.bool,
  pullVaultDataFunction: PropTypes.func,
  isStoredInVault: PropTypes.bool
};

export default VisibleVaultField;