import React from "react";
import BreadcrumbTrail from "../../../common/navigation/breadcrumbTrail";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-solid-svg-icons";

function DetailViewContainer({ breadcrumbDestination, title, titleIcon, summaryPanel, detailPanel, isLoading }) {

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
          {summaryPanel}
        </div>
        <div>
          {detailPanel}
        </div>
      </>
    );
  };

  return (
    <div className="max-content-width mb-2 ml-2">
      <BreadcrumbTrail destination={breadcrumbDestination} />
      <div className="content-container content-card-1 ">
        <div className="pl-2 content-block-header title-text-header-1">
          {getTitleBar()}
        </div>
        <div className="detail-view-body">
          {getDetailBody()}
        </div>
        <div className="content-block-footer"/>
      </div>
    </div>
  );
}


DetailViewContainer.propTypes = {
  breadcrumbDestination: PropTypes.string,
  title: PropTypes.string,
  titleIcon: PropTypes.object,
  summaryPanel: PropTypes.object,
  detailPanel: PropTypes.object,
  isLoading: PropTypes.bool
};

export default DetailViewContainer;