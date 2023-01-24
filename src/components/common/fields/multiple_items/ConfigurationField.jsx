import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function ConfigurationField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    const configuration = DataParsingHelper.parseObject(dataObject.getData(fieldName));

    if (!configuration) {
      return <span>No Configurations Applied</span>;
    }

    const configurationKeys = Object.keys(configuration);

    return (
      configurationKeys.map((key, i) => {
        return (
          <div key={i} className="mx-1 mb-1 badge badge-light generic-badge">
            <span><IconBase icon={faBracketsCurly} className={"mr-2"} />{key}: {configuration[key]}</span>
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

ConfigurationField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default ConfigurationField;