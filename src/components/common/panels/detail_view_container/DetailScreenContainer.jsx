import React from "react";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-solid-svg-icons";
import DataNotFoundContainer from "./DataNotFoundContainer";
import DataNotFoundDialog from "../../status_notifications/data_not_found/DataNotFoundDialog";
import DetailScreenTitleBar from "./DetailScreenTitleBar";

function DetailScreenContainer(
  {
    breadcrumbDestination,
    type,
    actionBar,
    dataObject,
    managementViewIcon,
    managementViewLink,
    managementTitle,
    title,
    titleIcon,
    detailPanel,
    isLoading,
    activeField
  }) {

  const getTitleBar = () => {
    return (<DetailScreenTitleBar isLoading={isLoading} titleIcon={titleIcon} title={title} inactive={activeField ? dataObject?.getData(activeField) === false : false} /> );
  };

  const getDetailBody = () => {
    if (isLoading) {
      return <div className="content-block-loading m-3" />;
    }

    return (
      <>
        <div className="mt-2">
          {detailPanel}
        </div>
      </>
    );
  };

  const getActionBar = () => {
    if (dataObject != null) {
      return actionBar;
    }
  };

  if (!isLoading && dataObject == null) {
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
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div>
          {getActionBar()}
        </div>
        <div className="detail-view-body">
          {getDetailBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DetailScreenContainer.propTypes = {
  activeField: PropTypes.string,
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
  isLoading: PropTypes.bool
};

export default DetailScreenContainer;