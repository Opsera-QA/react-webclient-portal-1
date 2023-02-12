import React from "react";
import PropTypes from "prop-types";
import {faSearchMinus, faSearchPlus} from "@fortawesome/pro-light-svg-icons";
import VanityButtonBase from "temp-library-components/button/VanityButtonBase";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";

export default function PipelineWorkflowZoomButtons(
  {
    zoomValue,
    setZoomValue,
  }) {
  return (
    <ButtonContainerBase className={"mb-1 mx-3"}>
      <VanityButtonBase
        icon={faSearchPlus}
        variant={"secondary"}
        className={"mr-1"}
        onClickFunction={() => setZoomValue(zoomValue + 1)}
        buttonSize={"sm"}
        disabled={zoomValue >= 2}
      />
      <VanityButtonBase
        icon={faSearchMinus}
        variant={"secondary"}
        className={"mr-1"}
        buttonSize={"sm"}
        onClickFunction={() => setZoomValue(zoomValue - 1)}
        disabled={zoomValue <= 1}
      />
    </ButtonContainerBase>
  );
}

PipelineWorkflowZoomButtons.propTypes = {
  zoomValue: PropTypes.number,
  setZoomValue: PropTypes.func,
};