import React from "react";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-solid-svg-icons";
import DataNotFoundContainer from "./DataNotFoundContainer";
import DataNotFoundDialog from "../../status_notifications/data_not_found/DataNotFoundDialog";

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
    isLoading
  }) {

  const getTitleBar = () => {
    if (isLoading) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
    }
    else {
      return (<span><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>{title}</span>);
    }
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
        <div className="pt-2 pl-2 content-block-header">
          <h5>{getTitleBar()}</h5>
        </div>
        <div>
          {actionBar}
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
  breadcrumbDestination: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  managementViewLink: PropTypes.string,
  managementTitle: PropTypes.string,
  titleIcon: PropTypes.object,
  summaryPanel: PropTypes.object,
  detailPanel: PropTypes.object,
  dataObject: PropTypes.object,
  actionBar: PropTypes.object,
  managementViewIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default DetailScreenContainer;