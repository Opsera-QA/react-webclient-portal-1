import React from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import CloseIcon from "components/common/icons/general/CloseIcon";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";

// TODO: Cleanup
function OverlayTitleBar({ titleText, titleIcon, isLoading, handleClose, pageLink, linkTooltipText }) {
  const getTitleIcon = () => {
    if (titleIcon) {
      return (
        <IconBase icon={titleIcon} className={"mr-1"}/>
      );
    }
  };

  if (isLoading) {
    return (
      <div className={"pl-2 pr-3 content-block-header title-text-header-1 d-flex"}>
        <div className={"d-flex w-100 justify-content-between my-auto"}>
          <div><span><LoadingIcon className="mr-2"/>Loading Data</span></div>
          <div className={"d-flex"}>
            <PageLinkIcon handleClose={handleClose} className={"mr-2"} pageLink={pageLink} linkTooltipText={linkTooltipText} />
            <CloseIcon handleCloseFunction={handleClose} />
          </div>
        </div>
      </div>
    );
  }

  if (titleText == null) {
    return (
      <Row className={"title-text-header-1 w-100 p-1 mx-0 bg-white d-flex"}>
        <div className={"d-flex my-auto w-100"}>
          <div />
          <div className={"ml-auto dark-grey"}>
            <PageLinkIcon handleClose={handleClose} className={"mr-2"} pageLink={pageLink} linkTooltipText={linkTooltipText} />
            <CloseIcon handleCloseFunction={handleClose} />
          </div>
        </div>
      </Row>
    );
  }

  return (
    <div className={"pl-2 pr-3 content-block-header title-text-header-1 d-flex"}>
      <div className={"h-100 d-flex justify-content-between my-auto w-100"}>
        <div><span>{getTitleIcon()}{titleText}</span></div>
        <div className={"d-flex"}>
          <PageLinkIcon handleClose={handleClose} className={"mr-2"} pageLink={pageLink} linkTooltipText={linkTooltipText} />
          <CloseIcon handleCloseFunction={handleClose} />
        </div>
      </div>
    </div>
  );
}


OverlayTitleBar.propTypes = {
  titleText: PropTypes.string,
  titleIcon: PropTypes.object,
  handleClose: PropTypes.func,
  isLoading: PropTypes.bool,
  pageLink: PropTypes.string,
  linkTooltipText: PropTypes.string
};

export default OverlayTitleBar;