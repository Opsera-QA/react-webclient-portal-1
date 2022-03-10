import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function BooleanPropertiesField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    const properties = dataObject.getData(fieldName);
    const propertyKeys = Object.keys(properties);

    if (propertyKeys == null || propertyKeys.length === 0) {
      return <span>No Properties Applied</span>;
    }

    return (
      propertyKeys.map((key, i) => {
        const property = `${key}: ${properties[key]}`;
        return (
          <div key={i} className="mx-1 mb-1 badge badge-light generic-badge">
            <span><IconBase icon={faBracketsCurly} className={"mr-2"}/>{property}</span>
          </div>
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

BooleanPropertiesField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default BooleanPropertiesField;