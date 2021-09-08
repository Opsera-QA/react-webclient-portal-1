import React, { useState } from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function TerraformStoreStateInS3Toggle({ dataObject, setDataObject, fieldName, disabled }) {
  const [field, setField] = useState(dataObject?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput disabled={disabled} fieldName={field.id}
        dataObject={dataObject}
        setDataObject={setDataObject}
      />
    </>
  );
}

TerraformStoreStateInS3Toggle.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool
};

export default TerraformStoreStateInS3Toggle;