import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";

function NameValueFieldBase({dataObject, fieldName, icon, badgeStyleName, noDataMessage, className }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getItems = () => {
    const items = dataObject?.getData(fieldName);

    if (items == null || items?.length === 0) {
      return <span>{noDataMessage}</span>;
    }

    return (
      items.map((item, i) => {
        return (
          <span key={i} className={`mx-1 mb-1 badge badge-light ${badgeStyleName}`}>
            <IconBase icon={icon} className={"mr-1"}/>{`${item.name}: ${item.value}`}
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

NameValueFieldBase.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  icon: PropTypes.object,
  badgeStyleName: PropTypes.string,
  noDataMessage: PropTypes.string,
  className: PropTypes.string
};

NameValueFieldBase.defaultProps = {
  icon: faBracketsCurly,
  badgeStyleName: "item-badge",
  noDataMessage: "No Items Applied"
};

export default NameValueFieldBase;