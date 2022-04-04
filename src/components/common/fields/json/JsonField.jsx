import React, {useState} from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";

function JsonField(
  {
    dataObject,
    fieldName,
    className,
  }) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <StandaloneJsonField
      json={dataObject?.getData(fieldName)}
      titleText={field?.label}
      collapsed={field?.isCollapsed}
      className={className}
    />
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default JsonField;