import React  from "react";
import PropTypes from "prop-types";
import ActionBarBackButton from "./buttons/ActionBarBackButton";
import ActionBarShowDetailsButton from "./buttons/ActionBarShowDetailsButton";
import ActionBarDeleteButton from "./buttons/ActionBarDeleteButton";
import ActionBarDuplicateButton from "./buttons/ActionBarDuplicateButton";
import ActionBarViewButton from "./buttons/ActionBarViewButton";
import ActionBarToggleButton from "./buttons/ActionBarToggleButton";

// TODO: Rework to display the children inside, allowing creation of area specific action bars
function SummaryActionBarContainer(
  {itemName, itemId, backButtonPath, handleDuplicateClick, handleDeleteClick, handleActiveToggle, handleViewClick, handleDetailsClick, data, status}
  ) {

  return (
    <div className="text-muted action-bar justify-content-between d-flex pb-2">
      <div>
        {backButtonPath && <ActionBarBackButton path={backButtonPath} />}
      </div>
      <div>
      {handleDetailsClick   && <ActionBarShowDetailsButton showDetails={handleDetailsClick} />}
      {handleDeleteClick    && <ActionBarDeleteButton handleDeleteClick={handleDeleteClick} itemName={itemName}  />}
      {handleDuplicateClick && <ActionBarDuplicateButton handleDuplicateClick={handleDuplicateClick} itemName={itemName} itemId={itemId} />}
      {handleViewClick      && <ActionBarViewButton handleViewClick={handleViewClick} itemName={itemName} data={data} />}
      {handleActiveToggle   && <ActionBarToggleButton handleActiveToggle={handleActiveToggle} status={status} data={data} />}
      </div>
    </div>
  );
}

SummaryActionBarContainer.propTypes = {
  handleDeleteClick: PropTypes.func,
  handleDuplicateClick: PropTypes.func,
  backButtonPath: PropTypes.string,
  handleActiveToggle: PropTypes.func,
  handleViewClick: PropTypes.func,
  handleDetailsClick: PropTypes.func,
  data: PropTypes.object,
  status: PropTypes.bool,
  itemName: PropTypes.string,
  itemId: PropTypes.string,
};

export default SummaryActionBarContainer;