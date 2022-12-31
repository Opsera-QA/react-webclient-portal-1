import React from "react";
import PropType from "prop-types";
import {useHistory} from "react-router-dom";
import {getBreadcrumb} from "components/common/navigation/trails";
import {hasStringValue} from "components/common/helpers/string-helpers";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {breadcrumbsHelper} from "temp-library-components/breadcrumbs/breadcrumbs.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SiteRoleManagementPageLinkCardBase(
  {
    siteRole,
    breadcrumbDestination,
  }) {
  const {
    userData,
  } = useComponentStateReference();
  const history = useHistory();
  const breadcrumb = getBreadcrumb(breadcrumbDestination);
  const breadcrumbPath = breadcrumbsHelper.getPathLink(breadcrumb, userData);

  const handleOnClickFunction = () => {
    history.push(breadcrumbPath);
  };

  const getTitle = () => {
    return (
      <div className={"w-100 d-flex justify-content-between"}>
        <div>{breadcrumb.title}</div>
        <div>
          <div className={"ml-auto"}><b>{DataParsingHelper.parseNumber(siteRole.memberCount, 0)}</b> Users</div>
        </div>
      </div>
    );
  };

  const getBody = () => {
    return (
      <div>
        {breadcrumb?.pageDescription}
      </div>
    );
  };

  if (!breadcrumb) {
    console.error(`Could not find breadcrumb for destination [${breadcrumbDestination}]`);
    return null;
  }

  if (hasStringValue(breadcrumbPath) !== true) {
    return null;
  }

  return (
    <SelectionCardBase
      titleText={getTitle()}
      body={getBody()}
      icon={breadcrumb?.icon}
      onClickFunction={handleOnClickFunction}
      className={"my-3"}
    />
  );
}

SiteRoleManagementPageLinkCardBase.propTypes = {
  siteRole: PropType.object,
  breadcrumbDestination: PropType.string,
};
