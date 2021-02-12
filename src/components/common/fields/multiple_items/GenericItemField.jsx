import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

// TODO: Final styling when implementing
function GenericItemField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>No Items Applied</span>;
    }

    return (
      dataObject.getData(fieldName).map((item, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light generic-badge">
            {item}
          </span>
        );
      })
    );
  };

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