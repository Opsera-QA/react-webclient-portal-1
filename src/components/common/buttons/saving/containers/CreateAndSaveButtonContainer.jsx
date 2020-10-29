import React  from "react";
import PropTypes from "prop-types";

function CreateAndSaveButtonContainer({ recordDto, saveButtonContainer, createButtonContainer }) {

  if (recordDto.isNew()){
    return (createButtonContainer)
  }

  return (saveButtonContainer);
}

CreateAndSaveButtonContainer.propTypes = {
  recordDto: PropTypes.object,
  createButtonContainer: PropTypes.any,
  saveButtonContainer: PropTypes.any
};

export default CreateAndSaveButtonContainer;