import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "./ActionBarButton";
import {faFileAlt} from "@fortawesome/pro-light-svg-icons";

function ActionBarViewButton({handleViewClick, itemName, data}) {

  const viewDetails = () => {
    handleViewClick(data)
  }

  return (
    <ActionBarButton action={viewDetails} icon={faFileAlt} popoverText={`View ${itemName} Configurations`} />
  );
}

ActionBarViewButton.propTypes = {
  handleViewClick: PropTypes.func,
  itemName: PropTypes.string,
  data: PropTypes.object
};

export default ActionBarViewButton;