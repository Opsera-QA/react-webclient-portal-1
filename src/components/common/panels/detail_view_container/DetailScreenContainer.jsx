import React, {useState} from "react";
import PropTypes from "prop-types";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";
import TitleComponent from "components/common/panels/TitleComponent";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    actionBar,
    dataObject,

    // TODO: Remove these after wiring up everything
    type,
    managementViewIcon,
    managementViewLink,
    managementTitle,
    title,
    titleIcon,

    detailPanel,
    isLoading,
    accessDenied,
    metadata,
    showBreadcrumbTrail,
    subNavigationBar
  }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const [parentBreadcrumb, setParentBreadcrumb] = useState(getParentBreadcrumb(breadcrumbDestination));

  const getTopNavigation = () => {
    if (showBreadcrumbTrail) {
      return (<BreadcrumbTrail destination={breadcrumbDestination} />);
    }

    if (subNavigationBar) {
      return subNavigationBar;
    }

    return (<TitleComponent title={breadcrumb.label} />);
  };

  const getTitleBar = () => {
    const activeField = dataObject?.getActiveField();
    const breadcrumbIcon = breadcrumb?.icon ? breadcrumb?.icon : titleIcon;
    const detailViewTitle = dataObject?.getDetailViewTitle();

    return (
      <TitleBar
        isLoading={isLoading}
        parentBreadcrumb={parentBreadcrumb}
        titleIcon={breadcrumbIcon}
        title={detailViewTitle != null ? detailViewTitle : title}
        inactive={activeField ? dataObject?.getData(activeField) === false : false}
      />
    );
  };

  const getDetailBody = () => {
    if (isLoading) {
      return <div className="content-block-loading m-3" />;
    }

    return (detailPanel);
  };

  const getActionBar = () => {
    if (dataObject != null) {
      return <div className="mb-1">{actionBar}</div>;
    }

    return <div className="py-2" />;
  };

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  // TODO: We should just pull all the management stuff from the breadcrumb's parent instead.
  if (!isLoading && dataObject == null) {
    // TODO: Remove using this when all detail views updated
    if (managementViewLink && managementViewIcon) {
      return (
        <DataNotFoundContainer type={type} breadcrumbDestination={breadcrumbDestination}>
          <DataNotFoundDialog
            type={type}
            managementViewIcon={managementViewIcon}
            managementViewTitle={managementTitle}
            managementViewLink={managementViewLink}
          />
        </DataNotFoundContainer>
      )
    }

    // TODO: just pass in metadata?.type once wired up everywhere
    const metadataType = metadata ? metadata?.type : type;

    return (
      <DataNotFoundContainer type={metadataType} breadcrumbDestination={breadcrumbDestination} />
    )
  }

  return (
    <div className="max-content-width mb-2 ml-2 max-content-height">
      {getTopNavigation()}
      <div className="content-container content-card-1">
        <div className="px-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div className="detail-container-body">
          {getActionBar()}
          <div className="shaded-container">
            {getDetailBody()}
          </div>
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DetailScreenContainer.propTypes = {
  showBreadcrumbTrail: PropTypes.bool,
  subNavigationBar: PropTypes.object,
  breadcrumbDestination: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  managementViewLink: PropTypes.string,
  managementTitle: PropTypes.string,
  titleIcon: PropTypes.object,
  detailPanel: PropTypes.object,
  dataObject: PropTypes.object,
  actionBar: PropTypes.object,
  managementViewIcon: PropTypes.object,
  isLoading: PropTypes.bool,
  accessDenied: PropTypes.bool,
  metadata: PropTypes.object
};

export default DetailScreenContainer;