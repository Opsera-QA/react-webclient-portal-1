import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

// TODO: Rework
function DtoTagField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <>
      {field &&
        <div className="custom-text-field my-2 d-flex">
          <label><span className="text-muted mr-2">{field.label}:</span></label>
          <div className="custom-item-input">
            {dataObject.getData(fieldName).map((item, i) => (
              <Button key={item.type} variant="primary" className="mx-1 mb-1" size="sm">
                {item.type + ": " + item.value}
              </Button>
            ))}
          </div>
        </div>
      }
    </>
  );
}

DtoTagField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default DtoTagField;