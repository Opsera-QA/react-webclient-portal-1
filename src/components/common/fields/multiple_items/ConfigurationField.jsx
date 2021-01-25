import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";

function ConfigurationField({dataObject, fieldName}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    const configuration = dataObject.getData(fieldName);

    if (configuration == null || configuration === {}) {
      return <span>No Configurations Applied</span>;
    }

    const configurationKeys = Object.keys(configuration);

    return (
      configurationKeys.map((key, i) => {
        return (
          <div key={i} className="mx-1 mb-1 badge badge-secondary">
            <span><FontAwesomeIcon icon={faBracketsCurly} className="mr-2" fixedWidth />{key}: {configuration[key]}</span>
          </div>
        );
      })
    );
  };

  return (
    <FieldContainer>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getItems()}
      </span>
    </FieldContainer>
  );
}

ConfigurationField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
};

export default ConfigurationField;