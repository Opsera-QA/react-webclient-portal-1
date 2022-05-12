import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

// TODO: Finalize styling
function GenericItemField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject?.getFieldById(fieldName));

  const getItems = () => {
    const items = dataObject?.getArrayData(fieldName);
    if (items == null || items?.length === 0) {
      return <span>No Items Applied</span>;
    }

    return (
      items.map((item, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light generic-badge">
            {item}
          </span>
        );
      })
    );
  };

  if (field == null) {
    return null;
  }

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getItems()}
      </span>
    </FieldContainer>
  );
}

GenericItemField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default GenericItemField;