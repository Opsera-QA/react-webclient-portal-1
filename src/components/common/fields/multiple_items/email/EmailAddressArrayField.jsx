import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faUser} from "@fortawesome/pro-light-svg-icons";
import BadgeBase from "components/common/badges/BadgeBase";

function EmailAddressArrayField({model, fieldName, className}) {
  const [field] = useState(model?.getFieldById(fieldName));

  const getGroups = () => {
    const emailAddresses = model?.getData(fieldName);

    if (!Array.isArray(emailAddresses) || emailAddresses.length === 0) {
      return "";
    }

    return (
      emailAddresses.map((emailAddress, i) => {
        return (
          <BadgeBase
            className={"p-2"}
            badgeText={emailAddress}
            key={i}
            icon={faUser}
          />
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getGroups()}
      </span>
    </FieldContainer>
  );
}

EmailAddressArrayField.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string
};

export default EmailAddressArrayField;