import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faUser} from "@fortawesome/pro-light-svg-icons/faUser";
import IconBase from "components/common/icons/IconBase";

function ContactField({dataObject, fieldName, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  const getContacts = () => {
    const contacts = dataObject.getData(fieldName);

    if (!Array.isArray(contacts) || contacts.length === 0) {
      return <span>No contacts have been registered.</span>;
    }

    return (
      contacts.map((contact, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light item-badge">
            <IconBase icon={faUser} className={"mr-1"}/>{`${contact.name} (${contact.email})${contact.user_id ? ` [${contact.user_id}]` : ""}`}
          </span>
        );
      })
    );
  };

  return (
    <FieldContainer className={className}>
      <FieldLabel fieldName={fieldName} field={field}/>
      <span className="item-field">
        {getContacts()}
      </span>
    </FieldContainer>
  );
}

ContactField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string
};

export default ContactField;