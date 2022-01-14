import React, {useState} from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import StandaloneLinkField from "components/common/fields/link/standalone/StandaloneLinkField";

function LdapAccountRegistrationLinkField({fieldName, model, className}) {
  const [field] = useState(model?.getFieldById(fieldName));

  return (
    <FieldContainer className={className}>
      <div className="w-100 d-flex">
        <StandaloneLinkField
          label={"New User Registration URL"}
          link={`${process.env.REACT_APP_OPSERA_CLIENT_ROOT_URL}/account/registration/${model?.orgDomain}`}
          openInNewWindow={true}
          showClipboardButton={true}
          formText={field?.formText}
        />
      </div>
    </FieldContainer>
  );
}

LdapAccountRegistrationLinkField.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  className: PropTypes.string,
};

export default LdapAccountRegistrationLinkField;