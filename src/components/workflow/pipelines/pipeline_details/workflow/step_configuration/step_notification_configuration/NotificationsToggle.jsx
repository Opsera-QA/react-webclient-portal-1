import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Model from "../../../../../../../core/data_model/model";

function NotificationsToggle({ dataObject, setDataObject, disabled }) {
    const [field] = useState(dataObject.getFieldById("enabled"));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject;
    if (value === true) {
      newDataObject = dataObject;
      newDataObject.setData(fieldName, value);
    }
    else {
      // Reset all fields if toggled off
      newDataObject = new Model({...dataObject.getNewObjectFields()}, dataObject.getMetaData(), true);
    }

    setDataObject({...newDataObject});
  };

  if (field == null) {
    return <span className="danger-red">No Field Configured in Metadata for This Notification Toggle!</span>;
  }

  return (
    <div className="form-group m-2">
        <Form.Check
          type="switch"
          id={field.label + "-" + field.id}
          checked={!!dataObject.getData("enabled")}
          disabled={disabled}
          label={field.label}
          onChange={() => {validateAndSetData(field.id, !dataObject.getData("enabled"));}}
        />
      <small className="text-muted form-text">
        <div>{field.formText}</div>
      </small>
    </div>
  );
}

NotificationsToggle.propTypes = {
  disabled: PropTypes.bool,
  setDataObject: PropTypes.func,
  dataObject: PropTypes.object,
};

export default NotificationsToggle;