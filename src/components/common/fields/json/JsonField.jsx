import React, {useState} from "react";
import PropTypes from "prop-types";
import StandaloneJsonField from "components/common/fields/json/StandaloneJsonField";
import FieldContainer from "components/common/fields/FieldContainer";

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
    <FieldContainer>
      <StandaloneJsonField
        json={dataObject?.getData(fieldName)}
        titleText={field?.label}
        collapsed={field?.isCollapsed}
        className={className}
      />
    </FieldContainer>
  );
}

JsonField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default JsonField;