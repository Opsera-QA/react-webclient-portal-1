import React from "react";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";

function EditorPanelContainer({ children, isLoading, showRequiredFieldsMessage, createRecord, updateRecord, recordDto, setRecordDto, handleClose, lenient, disable, addAnotherOption, extraButtons, viewMode }) {

  // TODO: Remove check. Editor panels should always have the message. If not an editor panel, use summary or detail or make a new panel.
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage) {
      return (<RequiredFieldsMessage />);
    }
  };

  const getPersistButtonContainer = () => {
    if (recordDto) {
      return (
        <PersistAndCloseButtonContainer
          extraButtons={extraButtons}
          createRecord={createRecord}
          updateRecord={updateRecord}
          setRecordDto={setRecordDto}
          recordDto={recordDto}
          handleClose={handleClose}
          addAnotherOption={addAnotherOption}
          disable={disable}
          lenient={lenient}
        />
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="p-3 h-100">
      <div>{children}</div>
      <div>
        <div>{!viewMode && getPersistButtonContainer()}</div>
        <div>{!viewMode && getRequiredFieldsMessage()}</div>
      </div>
    </div>
  );
}


EditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool,
  createRecord: PropTypes.func,
  updateRecord: PropTypes.func,
  handleClose: PropTypes.func,
  setRecordDto: PropTypes.func,
  recordDto: PropTypes.object,
  lenient: PropTypes.bool,
  disable: PropTypes.bool,
  addAnotherOption: PropTypes.bool,
  extraButtons: PropTypes.any,
  viewMode: PropTypes.bool
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true,
  addAnotherOption: true
};

export default EditorPanelContainer;