import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import AccessRoleDisplayer from "components/common/fields/multiple_items/roles/displayer/AccessRoleDisplayer";

function RoleAccessField({model, fieldName, noDataMessage, className}) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <AccessRoleDisplayer
        roles={model?.getArrayData(fieldName)}
        noDataMessage={noDataMessage}
      />
    </FieldContainer>
  );
}

RoleAccessField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  noDataMessage: PropTypes.any,
  className: PropTypes.string
};

export default RoleAccessField;