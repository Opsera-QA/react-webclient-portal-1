import React from "react";
import PropTypes from "prop-types";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButtonBase from "components/common/buttons/back/BackButtonBase";
import CancelOverlayButton from "components/common/buttons/cancel/overlay/CancelOverlayButton";

export default function OverlayWizardButtonContainerBase(
  {
    backButtonFunction,
    children,
    className,
  }) {
  const getLeftHandButtons = () => {
    return (
      <div className={"d-flex"}>
        <BackButtonBase
          disabled={backButtonFunction == null}
          backButtonFunction={backButtonFunction}
          className={"mr-2"}
        />
        <CancelOverlayButton />
      </div>
    );
  };

  return (
    <ButtonContainerBase
      leftSideButtons={getLeftHandButtons()}
      className={className}
    >
      {children}
    </ButtonContainerBase>
  );
}

OverlayWizardButtonContainerBase.propTypes = {
  children: PropTypes.any,
  backButtonFunction: PropTypes.func,
  className: PropTypes.string,
};

OverlayWizardButtonContainerBase.defaultProps = {
  className: "p-3",
};

