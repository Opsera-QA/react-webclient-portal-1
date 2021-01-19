import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";

// TODO: Final styling when implementing
function TagField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getTags = () => {
    if (dataObject?.getData(fieldName) == null || dataObject?.getData(fieldName)?.length === 0) {
      return <span>No Tags Applied</span>;
    }

    return (
      dataObject.getData(fieldName).map((tag, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-secondary">
            {`${tag.type}: ${tag.value}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getTags()}
      </span>
    </FieldContainer>
  );
}

TagField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default TagField;