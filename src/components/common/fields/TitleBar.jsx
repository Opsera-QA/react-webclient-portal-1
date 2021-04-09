import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-solid-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

function TitleBar({ title, titleIcon, parentBreadcrumb, isLoading, inactive, titleActionBar }) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push(`/${parentBreadcrumb.path}`);
  };

  const getBackButton = () => {
    if (parentBreadcrumb) {
      return (
        <div className="mr-2 pointer" onClick={() => handleBackButton()}>
          <ActionBarButton action={handleBackButton} icon={faArrowLeft} popoverText={`Go back to ${parentBreadcrumb.title}`} />
        </div>
      );
    }
  };

  // TODO: Remove after wiring up TitleActionBar everywhere that uses this
  const getInactiveText = () => {
    if (inactive) {
      return (<span className="text-white-50 mx-1">{inactive && "Inactive"}</span>);
    }
  };

  const getRightSideItems = () => {
    return (
      <div className="ml-auto d-flex mr-1">
        {getInactiveText()}
        {titleActionBar}
      </div>
    );
  };

  if (isLoading) {
    return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
  }

  return (
    <div className="d-flex">
      <div><span><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>{title}</span></div>
      {getRightSideItems()}
    </div>
  );
}


TitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  parentBreadcrumb: PropTypes.object,
  titleActionBar: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default TitleBar;