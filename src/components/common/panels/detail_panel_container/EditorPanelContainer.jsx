import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";

function EditorPanelContainer({ children, isLoading, showRequiredFieldsMessage, createRecord, updateRecord, recordDto, setRecordDto, handleClose  }) {

  // TODO: Remove check. Editor panels should always have the message. If not an editor panel, use summary or detail or make a new panel.
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage) {
      return (<RequiredFieldsMessage />);
    }
  }

  const getPersistButtonContainer = () => {
    if (recordDto) {
      return (
        <PersistAndCloseButtonContainer
          createRecord={createRecord}
          updateRecord={updateRecord}
          setRecordDto={setRecordDto}
          recordDto={recordDto}
          handleClose={handleClose}
        />
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y h-100">
      <div className="p-3">
        <div>{children}</div>
        <div className="mr-3">
          <div>{getPersistButtonContainer()}</div>
          <div>{getRequiredFieldsMessage()}</div>
        </div>
      </div>
    </Form>
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
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
}

export default EditorPanelContainer;