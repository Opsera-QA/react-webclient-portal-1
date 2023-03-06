import React from "react";
import PropTypes from "prop-types";
import FieldContainer from "components/common/fields/FieldContainer";
import FieldLabel from "components/common/fields/FieldLabel";
import {faUserFriends} from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import HelpDocumentationLink from "components/common/links/HelpDocumentationLink";

export const ROLE_HELP_DOCUMENTATION_LINK = "https://docs.opsera.io/role-based-access-pipelines-and-tool-registry";

export default function GroupField(
  {
    dataObject,
    fieldName,
    className,
    showExternalHelpDocumentationLink,
  }) {
  const field = dataObject?.getFieldById(fieldName);

  const getGroups = () => {
    const groups = dataObject.getData(fieldName);

    if (!groups || !Array.isArray(groups) || groups.length === 0) {
      return <span>User is not a member of any groups.</span>;
    }

    return (
      groups.map((group, i) => {
        return (
          <span key={i} className="mx-1 mb-1 badge badge-light group-badge">
            <IconBase icon={faUserFriends} className={"mr-1"}/>{`${group}`}
          </span>
        );
      })
    );
  };

  const getHelpDocumentationLinkIcon = () => {
    if (showExternalHelpDocumentationLink === true) {
      return (
        <HelpDocumentationLink
          link={ROLE_HELP_DOCUMENTATION_LINK}
          className={"ml-2"}
        />
      );
    }
  };

  return (
    <FieldContainer className={className}>
      <div className={"d-flex"}>
        <FieldLabel fieldName={fieldName} field={field}/>
        <div className={"item-field"}>
          {getGroups()}
        </div>
        {getHelpDocumentationLinkIcon()}
      </div>
    </FieldContainer>
  );
}

GroupField.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  className: PropTypes.string,
  showExternalHelpDocumentationLink: PropTypes.bool,
};
