import React from "react";
import PropTypes from "prop-types";
import {Row} from "react-bootstrap";
import CloseIcon from "components/common/icons/general/CloseIcon";
import PageLinkIcon from "components/common/icons/general/PageLinkIcon";
import LoadingIcon from "components/common/icons/LoadingIcon";
import IconBase from "components/common/icons/IconBase";
import HelpDocumentationLink from "components/common/links/HelpDocumentationLink";
import {ROLE_HELP_DOCUMENTATION_LINK} from "components/common/fields/multiple_items/GroupField";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import HelpIconBase from "components/common/icons/help/HelpIconBase";

// TODO: Cleanup
function OverlayTitleBar(
  {
    titleText,
    titleIcon,
    isLoading,
    handleClose,
    pageLink,
    linkTooltipText,
    externalHelpPageLink,
    setShowHelpPanel,
    helpIsShown,
    softLoading,
  }) {
  const getTitleIcon = () => {
    if (titleIcon) {
      return (
        <IconBase
          icon={titleIcon}
          className={"mr-1"}
          isLoading={isLoading || softLoading}
        />
      );
    }
  };
  
  const getHelpIcon = () => {
    if (setShowHelpPanel) {
      return (
        <HelpIconBase
          onClickFunction={() => setShowHelpPanel(!helpIsShown)}
          tooltipPlacement={"bottom"}
          className={"mr-3"}
        />
      );
    }

    if (externalHelpPageLink) {
      return (
        <HelpDocumentationLink
          link={externalHelpPageLink}
          className={"mr-2"}
          tooltipPlacement={"bottom"}
        />
      );
    }
  };

  if (isLoading) {
    return (
      <div className={"px-3 py-2 content-block-header title-text-header-1 d-flex"}>
        <div className={"d-flex justify-content-between my-auto w-100"}>
          <div><span><LoadingIcon className="mr-2"/>Loading Data</span></div>
          <div className={"d-flex"}>
            {getHelpIcon()}
            <PageLinkIcon handleClose={handleClose} className={"mr-2"} pageLink={pageLink} linkTooltipText={linkTooltipText} />
            <CloseIcon handleCloseFunction={handleClose} />
          </div>
        </div>
      </div>
    );
  }

  if (titleText == null) {
    return (
      <Row className={"title-text-header-1 w-100 p-2 mx-0 bg-white d-flex"}>
        <div className={"ml-auto dark-grey d-flex my-auto"}>
          {getHelpIcon()}
          <PageLinkIcon handleClose={handleClose} className={"mr-2"} pageLink={pageLink} linkTooltipText={linkTooltipText} />
          <CloseIcon handleCloseFunction={handleClose} />
        </div>
      </Row>
    );
  }

  return (
    <div className={"px-3 py-2 content-block-header title-text-header-1 d-flex"}>
      <div className={"d-flex justify-content-between my-auto w-100"}>
        <div><span>{getTitleIcon()}{titleText}</span></div>
        <div className={"d-flex"}>
          {getHelpIcon()}
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
  linkTooltipText: PropTypes.string,
  externalHelpPageLink: PropTypes.string,
  setShowHelpPanel: PropTypes.func,
  helpIsShown: PropTypes.bool,
  softLoading: PropTypes.bool,
};

export default OverlayTitleBar;