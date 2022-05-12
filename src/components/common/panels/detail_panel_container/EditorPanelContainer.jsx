import React, {useState} from "react";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import PersistAndCloseButtonContainer from "components/common/buttons/saving/containers/PersistAndCloseButtonContainer";
import EditorPanelToggleInput from "components/common/inputs/boolean/EditorPanelToggleInput";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";

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
    disabledText,
    getHelpComponent,
    booleanToggleDisabled,
    className,
    isIncomplete,
  }) {
  const [helpIsShown, setHelpIsShown] = useState(false);

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
          isIncomplete={isIncomplete}
        />
      );
    }
  };

  const getHelpToggle = () => {
    if (getHelpComponent) {
      return (
        <ActionBarToggleHelpButton
          toggleHelp={() => setHelpIsShown(true)}
          helpIsShown={helpIsShown}
          visible={getHelpComponent() != null}
          className={"ml-2"}
        />
      );
    }
  };

  const getBooleanToggle = () => {
    if (showBooleanToggle === true) {
      return (
        <EditorPanelToggleInput
          setDataObject={setRecordDto}
          dataObject={recordDto}
          disabledText={disabledText}
          enabledText={enabledText}
          disabled={booleanToggleDisabled}
        />
      );
    }
  };

  const getStyling = () => {
    if (className) {
      return (className);
    }

    if (showBooleanToggle === true) {
      return ("mx-2 px-3 pb-3");
    }

    return ("mx-2 p-3");
  };

  const getActionBar = () => {
    if (getBooleanToggle() != null || getHelpToggle() != null) {
      return (
        <div className={"mt-2 d-flex justify-content-between"} style={{paddingRight: "20px"}}>
          <div />
          <div className={"d-flex"}>
            {getBooleanToggle()}
            {getHelpToggle()}
          </div>
        </div>
      );
    }
  };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  if (helpIsShown) {
    const helpComponent = getHelpComponent(setHelpIsShown);

    if (helpComponent != null) {
      return (
        <div className={"p-2"}>
          {helpComponent}
        </div>
      );
    }
  }

  return (
    <div className="h-100">
      {getActionBar()}
      <div className={getStyling()}>
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
  disabledText: PropTypes.string,
  getHelpComponent: PropTypes.func,
  booleanToggleDisabled: PropTypes.bool,
  className: PropTypes.string,
  isIncomplete: PropTypes.bool,
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true,
  addAnotherOption: true,
  enabledText: "Enabled",
  disabledText: "Disabled"
};

export default EditorPanelContainer;