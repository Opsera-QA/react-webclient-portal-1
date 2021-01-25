import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import {faSpinner} from "@fortawesome/pro-light-svg-icons";
import {useHistory} from "react-router-dom";
import {faArrowLeft} from "@fortawesome/pro-solid-svg-icons";
import ActionBarButton from "components/common/actions/buttons/ActionBarButton";

// TODO: Move and rename
function TitleBar({ title, titleIcon, parentBreadcrumb, isLoading, inactive }) {
  const history = useHistory();

  const handleBackButton = () => {
    history.push(`/${parentBreadcrumb.path}`);
  }

  if (isLoading) {
    return (<span><FontAwesomeIcon icon={faSpinner} spin fixedWidth className="mr-1"/>Loading Data</span>);
  }

  const getBackButton = () => {
    if (parentBreadcrumb) {
      return (
        <div className="mr-2 pointer" onClick={() => handleBackButton()}>
          <ActionBarButton action={handleBackButton} icon={faArrowLeft} popoverText={`Go back to ${parentBreadcrumb.label}`} />
        </div>
      );
    }
  };

  return (
    <div className="d-flex">
      {/*{getBackButton()}*/}
      <div><span><FontAwesomeIcon icon={titleIcon} fixedWidth className="mr-1"/>{title}</span></div>
      <div className="ml-auto mr-3"><span className="text-white-50">{inactive && "Inactive"}</span></div>
    </div>);
}


TitleBar.propTypes = {
  inactive: PropTypes.bool,
  title: PropTypes.string,
  parentBreadcrumb: PropTypes.object,
  titleIcon: PropTypes.object,
  isLoading: PropTypes.bool
};

export default TitleBar;