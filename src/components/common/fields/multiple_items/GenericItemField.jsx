import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

// TODO: Final styling when implementing
function GenericItemField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>No Items Applied</span>;
    }

    return (
      dataObject.getData(fieldName).map((item, i) => {
        return (
          <Button key={i} variant="primary" className="mx-1 mb-1" size="sm">
            {item}
          </Button>
        );
      })
    );
  };

  return (
    <FieldContainer className="custom-text-field">
      <FieldLabel fieldName={fieldName} field={field}/>
      <div className="custom-item-input">
        {getItems()}
      </div>
    </FieldContainer>
  );
}

GenericItemField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default GenericItemField;