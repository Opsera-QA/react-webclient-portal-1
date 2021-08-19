import React  from "react";
import PropTypes from "prop-types";
import ActionBarButton from "../../buttons/ActionBarButton";
import {faShareAll} from "@fortawesome/pro-light-svg-icons";

function ActionBarPublishPipelineButton({handlePublishClick, itemId}) {

  const publish = () => {
    handlePublishClick(itemId);
  };

  return (
    <ActionBarButton action={publish} icon={faShareAll} popoverText={`Publish this pipeline template to your organization's private catalog`} />
  );
}

ActionBarPublishPipelineButton.propTypes = {
  handlePublishClick: PropTypes.func,
  itemName: PropTypes.string,
  itemId: PropTypes.string
};

export default ActionBarPublishPipelineButton;