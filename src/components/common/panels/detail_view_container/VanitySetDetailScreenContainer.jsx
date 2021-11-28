import React, {useState} from "react";
import PropTypes from "prop-types";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb} from "components/common/navigation/trails";
import RoleRequirementField from "components/common/fields/access/RoleRequirementField";
import {meetsRequirements} from "components/common/helpers/role-helpers";
import AccessRoleLevelField from "components/common/fields/access/AccessRoleLevelField";
import InlineLoadingDialog from "components/common/status_notifications/loading/InlineLoadingDialog";
import ScreenContainerBodyLoadingDialog
  from "components/common/status_notifications/loading/ScreenContainerBodyLoadingDialog";

function VanitySetDetailScreenContainer(
  {
    breadcrumbDestination,
    actionBar,
    model,
    detailPanel,
    isLoading,
    accessDenied,
    navigationTabContainer,
    accessRoleData,
    roleRequirement,
    titleActionBar,
    objectRoles,
    helpComponent
  }) {
  const [breadcrumb] = useState(getBreadcrumb(breadcrumbDestination));

  const getTopNavigation = () => {
    if (navigationTabContainer) {
      return (
        <div className="mb-3">
          {navigationTabContainer}
        </div>
      );
    }

    return (
      <div className="mb-3">
        <div className="sub-navigation-block" />
      </div>
    );
  };

  const getTitleBar = () => {
    return (
      <TitleBar
        isLoading={isLoading}
        titleIcon={breadcrumb?.icon}
        title={model?.getDetailViewTitle()}
        inactive={model?.isInactive()}
        titleActionBar={titleActionBar}
        helpComponent={helpComponent}
      />
    );
  };

  const getBody = () => {
    if (isLoading) {
      return (
        <ScreenContainerBodyLoadingDialog />
      );
    }

    return (
      <div>
        {getActionBar()}
        <div>
          {detailPanel}
         </div>
      </div>
    );
  };

  const getActionBar = () => {
    if (model != null) {
      return <div className="mb-1">{actionBar}</div>;
    }

    return <div className="py-2" />;
  };

  const getAccessBasedField = () => {
    if (objectRoles != null) {
      return (
        <div className="content-block-footer-text-container pt-2">
          <AccessRoleLevelField
            className={"mx-2"}
            accessRoleData={accessRoleData}
            objectRoles={objectRoles}
            dataObject={model}
          />
        </div>
      );
    }

    if (roleRequirement) {
      return (
        <div className="content-block-footer-text-container pt-2">
          <RoleRequirementField
            className={"mx-2"}
            roleRequirement={roleRequirement}
          />
        </div>
      );
    }
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  if (!isLoading && accessRoleData && roleRequirement && !meetsRequirements(roleRequirement, accessRoleData)) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  if (!isLoading && model == null) {
    return (
      <AccessDeniedContainer
        navigationTabContainer={navigationTabContainer}
      />
    );
  }

  return (
    <div className="max-content-width ml-2 max-content-height scroll-y hide-x-overflow">
      {getTopNavigation()}
      <div className="content-container content-card-1">
        <div className="px-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div className="detail-container-body">
          {getBody()}
        </div>
        {getAccessBasedField()}
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}

VanitySetDetailScreenContainer.propTypes = {
  navigationTabContainer: PropTypes.object,
  breadcrumbDestination: PropTypes.string,
  detailPanel: PropTypes.object,
  model: PropTypes.object,
  actionBar: PropTypes.object,
  isLoading: PropTypes.bool,
  accessDenied: PropTypes.bool,
  accessRoleData: PropTypes.object,
  roleRequirement: PropTypes.string,
  titleActionBar: PropTypes.object,
  objectRoles: PropTypes.array,
  helpComponent: PropTypes.object
};

export default VanitySetDetailScreenContainer;