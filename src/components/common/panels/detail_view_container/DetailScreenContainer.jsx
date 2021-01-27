import React, {useState} from "react";
import PropTypes from "prop-types";
import DataNotFoundContainer from "components/common/panels/detail_view_container/DataNotFoundContainer";
import DataNotFoundDialog from "components/common/status_notifications/data_not_found/DataNotFoundDialog";
import BreadcrumbTrail from "components/common/navigation/breadcrumbTrail";
import AccessDeniedContainer from "components/common/panels/detail_view_container/AccessDeniedContainer";
import TitleBar from "components/common/fields/TitleBar";
import {getBreadcrumb, getParentBreadcrumb} from "components/common/navigation/trails";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    actionBar,
    dataObject,
    // TODO: Remove these four after wiring up everything
    type,
    managementViewIcon,
    managementViewLink,
    managementTitle,

    title,

    // TODO: remove title icon when pulling from breadcrumb
    titleIcon,

    detailPanel,
    isLoading,
    accessDenied
  }) {
  const [breadcrumb, setBreadcrumb] = useState(getBreadcrumb(breadcrumbDestination));
  const [parentBreadcrumb, setParentBreadcrumb] = useState(getParentBreadcrumb(breadcrumbDestination));


  const getTitleBar = () => {
    const activeField = dataObject?.getActiveField();
    return (<TitleBar isLoading={isLoading} parentBreadcrumb={parentBreadcrumb} titleIcon={titleIcon} title={title} inactive={activeField ? dataObject?.getData(activeField) === false : false} /> );
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

    return (
      <DataNotFoundContainer type={type} breadcrumbDestination={breadcrumbDestination} />
    )
  }

  if (!isLoading && accessDenied) {
    return (
      <AccessDeniedContainer />
    )
  }

  return (
    <div className="max-content-width mb-2 ml-2 max-content-height">
      <BreadcrumbTrail destination={breadcrumbDestination} />
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
  accessDenied: PropTypes.bool
};

export default DetailScreenContainer;