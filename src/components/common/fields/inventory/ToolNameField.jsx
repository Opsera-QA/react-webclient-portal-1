import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import ToolNameFieldDisplayer from "components/common/fields/inventory/name/ToolNameFieldDisplayer";

function ToolNameField(
  {
    model,
    fieldName,
    className,
    handleClose,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel field={field}/>
      <ToolNameFieldDisplayer
        toolId={model?.getData(fieldName)}
        handleClose={handleClose}
      />
    </FieldContainer>
  );
}

ToolNameField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  handleClose: PropTypes.func,
};

export default ToolNameField;