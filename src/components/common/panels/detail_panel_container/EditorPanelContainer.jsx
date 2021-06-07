import React from "react";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";
import {Form} from "react-bootstrap";
import Row from "react-bootstrap/Row";

function EditorPanelContainer(
  {
    children,
    isLoading,
    showRequiredFieldsMessage,
    createRecord,
    updateRecord,
    recordDto,
    setRecordDto,
    handleClose,
    lenient,
    disable,
    addAnotherOption,
    extraButtons,
    showBooleanToggle,
    enabledText,
    disabledText
  }) {

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

  const getBooleanToggle = () => {
    if (showBooleanToggle === true) {
      return (
        <div className={"mt-2"}>
          <Row className={"mx-0 d-flex"}>
            <div className={"d-flex ml-auto mr-4"}>
              <Form.Check
                type="switch"
                id={"active"}
                checked={!!recordDto?.getData("active")}
                label={<span> </span>}
                onChange={() => { recordDto?.setData("active");}}
              />
              <div style={{marginTop: "1px"}}>{recordDto?.getData("active") === true ? enabledText : disabledText}</div>
            </div>
          </Row>
        </div>
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className="h-100">
      {getBooleanToggle()}
      <div className={showBooleanToggle === true ? "mx-2 px-3 pb-3" : "mx-2 p-3"}>
        <div>{children}</div>
        <div>
          <div>{getPersistButtonContainer()}</div>
          <div>{getRequiredFieldsMessage()}</div>
        </div>
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
  showBooleanToggle: PropTypes.bool,
  enabledText: PropTypes.string,
  disabledText: PropTypes.string
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true,
  addAnotherOption: true,
  enabledText: "Enabled",
  disabledText: "Disabled"
};

export default EditorPanelContainer;