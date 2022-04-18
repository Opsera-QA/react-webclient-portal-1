import React, {useState} from "react";
import PropTypes from "prop-types";
import UserNameFieldBase from "components/common/fields/user/UserNameFieldBase";

function UserNameField({ model, fieldName, className, showLabel, }) {
  const [field] = useState(model?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <UserNameFieldBase
      showLabel={showLabel}
      label={field?.label}
      className={className}
      userId={model?.getData(fieldName)}
    />
  );
}

UserNameField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default UserNameField;