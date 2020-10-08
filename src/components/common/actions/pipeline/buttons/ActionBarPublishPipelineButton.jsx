import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "../../buttons/ActionBarButton";
import {faShareSquare} from "@fortawesome/pro-light-svg-icons";

function ActionBarPublishPipelineButton({handlePublishClick, itemId}) {

  const publish = () => {
    handlePublishClick(itemId);
  }

  return (
    <ActionBarButton action={publish} icon={faShareSquare} popoverText={`Publish this Pipeline to the shared Catalog`} />
  );
}

ActionBarPublishPipelineButton.propTypes = {
  handlePublishClick: PropTypes.func,
  itemName: PropTypes.string,
  itemId: PropTypes.string
};

export default ActionBarPublishPipelineButton;