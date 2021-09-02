import React, {useEffect, useRef} from "react";
import PropTypes from "prop-types";
import VisibleVaultField from "components/common/fields/text/VisibleVaultField";
import TextFieldBase from "components/common/fields/text/TextFieldBase";

// TODO: Should we construct model in here? Revisit that idea when implementing
function ParameterValueField({fieldName, model}) {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getValueFromVault = async () => {
    try {
      if (model?.getData("vaultEnabled") === true) {
        return await model.getValueFromVault(fieldName);
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        console.error(error);
        if (error?.response?.status === 404) {
          return "No value stored in vault";
        } else {
          return "Could not pull value from Vault";
        }
      }
    }
  };

  if (model?.getData("vaultEnabled") !== true) {
    return (
      <TextFieldBase
        fieldName={fieldName}
        dataObject={model}
        showClipboardButton={true}
      />
    );
  }

  return (
    <VisibleVaultField
      fieldName={fieldName}
      pullVaultDataFunction={getValueFromVault}
      model={model}
      isStoredInVault={true}
    />
  );
}

ParameterValueField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
};

ParameterValueField.defaultProps = {
  fieldName: "value"
};

export default ParameterValueField;