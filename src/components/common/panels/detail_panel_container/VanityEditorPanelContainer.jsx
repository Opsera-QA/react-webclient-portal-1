import React, {useState} from "react";
import PropTypes from "prop-types";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";
import VanityEditorPanelButtonContainer
  from "components/common/buttons/saving/containers/VanityEditorPanelButtonContainer";
import ActionBarToggleHelpButton from "components/common/actions/buttons/ActionBarToggleHelpButton";
import EditorPanelToggleInput from "components/common/inputs/boolean/EditorPanelToggleInput";

function VanityEditorPanelContainer(
  {
    children,
    isLoading,
    model,
    setModel,
    handleClose,
    disable,
    extraButtons,
    getHelpComponent,
    booleanToggleDisabled,
    showBooleanToggle,
    enabledText,
    disabledText,
    className,
  }) {
  const [helpIsShown, setHelpIsShown] = useState(false);

  const getRequiredFieldsMessage = () => {
    if (model?.showRequiredFieldsMessage() === true) {
      return (<RequiredFieldsMessage />);
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
          setDataObject={setModel}
          dataObject={model}
          disabledText={disabledText}
          enabledText={enabledText}
          disabled={booleanToggleDisabled}
        />
      );
    }
  };

  const getPersistButtonContainer = () => {
    return (
      <VanityEditorPanelButtonContainer
        extraButtons={extraButtons}
        handleClose={handleClose}
        disable={disable}
        model={model}
        setModel={setModel}
      />
    );
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

  if (model == null) {
    return null;
  }

  return (
    <div className={className}>
      {getActionBar()}
      <div>{children}</div>
      <div>
        <div>{getPersistButtonContainer()}</div>
        <div>{getRequiredFieldsMessage()}</div>
      </div>
    </div>
  );
}

VanityEditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool,
  handleClose: PropTypes.func,
  setModel: PropTypes.func,
  model: PropTypes.object,
  lenient: PropTypes.bool,
  disable: PropTypes.bool,
  extraButtons: PropTypes.any,
  showBooleanToggle: PropTypes.bool,
  enabledText: PropTypes.string,
  disabledText: PropTypes.string,
  getHelpComponent: PropTypes.func,
  booleanToggleDisabled: PropTypes.bool,
  className: PropTypes.string,
};

export default VanityEditorPanelContainer;