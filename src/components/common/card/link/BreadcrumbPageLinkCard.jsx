import React from "react";
import PropTypes from "prop-types";
import {getBreadcrumb} from "components/common/navigation/trails";
import PageLinkCard from "components/common/card/link/PageLinkCard";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {hasStringValue} from "components/common/helpers/string-helpers";
import RoleHelper from "@opsera/know-your-role/roles/role.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

const getPathLink = (breadcrumb, pathParameter) => {
  const parsedBreadcrumb = DataParsingHelper.parseObject(breadcrumb, {});

  if (parsedBreadcrumb?.pathFunction && pathParameter) {
    return parsedBreadcrumb.pathFunction(pathParameter);
  }

  return parsedBreadcrumb.path;
};

export default function BreadcrumbPageLinkCard(
  {
    breadcrumbDestination,
    visible,
    pathParameter,
    className,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const breadcrumb = getBreadcrumb(breadcrumbDestination);
  const breadcrumbPath = getPathLink(breadcrumb, pathParameter);

  if (!breadcrumb) {
    console.error(`Could not find breadcrumb for destination [${breadcrumbDestination}]`);
    return null;
  }

  const allowedRoles = DataParsingHelper.parseArray(breadcrumb?.allowedRoles);

  const getLink = () => {
    if (breadcrumbPath.startsWith("/") !== true) {
      return `/${breadcrumbPath}`;
    }

    return breadcrumbPath;
  };

  if (hasStringValue(breadcrumbPath) !== true || (allowedRoles && RoleHelper.doesUserMeetSiteRoleRequirements(userData, allowedRoles) !== true)) {
    return null;
  }

  return (
    <PageLinkCard
      linkText={breadcrumb?.linkText}
      icon={breadcrumb?.icon}
      link={getLink()}
      visible={visible}
      pageDescription={breadcrumb?.pageDescription}
      className={className}
    />
  );
}

BreadcrumbPageLinkCard.propTypes = {
  breadcrumbDestination: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  pathParameter: PropTypes.any,
  className: PropTypes.string,
};