import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Model from "core/data_model/model";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function NotificationsToggle({ fieldName, dataObject, setDataObject, disabled }) {
  const [field] = useState(dataObject.getFieldById("enabled"));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject;
    if (value === true) {
      newDataObject = dataObject;
      newDataObject.setData(fieldName, value);
    } else {
      // Reset all fields if toggled off
      newDataObject = new Model({...dataObject.getNewObjectFields()}, dataObject.getMetaData(), true);
    }

    setDataObject({...newDataObject});
  };

  if (field == null) {
    return <span className="danger-red">No Field Configured in Metadata for This Notification Toggle!</span>;
  }

  return (
    <InputContainer>
      <Form.Check
        type="switch"
        id={field.label + "-" + field.id}
        checked={!!dataObject.getData(fieldName)}
        disabled={disabled}
        label={field.label}
        onChange={() => {
          validateAndSetData(field.id, !dataObject.getData(fieldName));
        }}
      />
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
      />
    </InputContainer>
  );
}

NotificationsToggle.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string
};

NotificationsToggle.defaultProps = {
  fieldName: "enabled"
};

export default NotificationsToggle;