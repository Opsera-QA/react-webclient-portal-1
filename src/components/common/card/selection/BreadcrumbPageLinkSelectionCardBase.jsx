import React from "react";
import PropTypes from "prop-types";
import {getBreadcrumb} from "components/common/navigation/trails";
import {hasStringValue} from "components/common/helpers/string-helpers";
import SelectionCardBase from "components/common/card/selection/SelectionCardBase";
import {useHistory} from "react-router-dom";
import {breadcrumbsHelper} from "temp-library-components/breadcrumbs/breadcrumbs.helper";

export default function BreadcrumbPageLinkSelectionCardBase(
  {
    breadcrumbDestination,
    visible,
    pathParameter,
    inactive,
    className,
  }) {
  const history = useHistory();
  const breadcrumb = getBreadcrumb(breadcrumbDestination);
  const breadcrumbPath = breadcrumbsHelper.getPathLink(breadcrumb, pathParameter);

  const handleOnClickFunction = () => {
    history.push(breadcrumbPath);
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
      titleText={breadcrumb?.title}
      body={breadcrumb?.pageDescription}
      icon={breadcrumb?.icon}
      onClickFunction={handleOnClickFunction}
      inactive={inactive}
      visible={visible}
      className={className}
    />
  );
}

BreadcrumbPageLinkSelectionCardBase.propTypes = {
  breadcrumbDestination: PropTypes.string.isRequired,
  visible: PropTypes.bool,
  pathParameter: PropTypes.any,
  inactive: PropTypes.bool,
  className: PropTypes.string,
};