import React from "react";
import PropTypes from "prop-types";
import useComponentStateReference from "hooks/useComponentStateReference";
import SiteRoleFieldBase from "components/common/fields/access/SiteRoleFieldBase";

export default function SiteRoleField(
  {
    showDescription,
    showExternalHelpDocumentationLink,
    className,
  }) {
  const {
    userData,
  } = useComponentStateReference();

  if (userData == null) {
    return null;
  }

  return (
   <SiteRoleFieldBase
    className={className}
    userData={userData}
    showDescription={showDescription}
    showExternalHelpDocumentationLink={showExternalHelpDocumentationLink}
   />
  );
}

SiteRoleField.propTypes = {
  className: PropTypes.string,
  showDescription: PropTypes.bool,
  showExternalHelpDocumentationLink: PropTypes.bool,
};