import React from "react";
import PropTypes from "prop-types";
import { faInfoCircle } from "@fortawesome/pro-light-svg-icons";
import OverlayIconBase from "components/common/icons/OverlayIconBase";

export default function ParameterSelectListInputBaseHelpIcon({visible}) {
  const getHelpOverlayBody = () => {
    return (
      <div className="text-muted mb-2">
        This functionality helps users use Opsera Parameters that are defined under the Parameters tab in Tool
        Registry. In order to use any of these parameters in the step - enter them in the commands with the
        following syntax: <strong>{"${parameter_name}"}</strong>, where the parameter_name is the one of the
        names derived from this list of available parameters.
        <br />
        <br />
        You must select all parameters that you pass in the commands in the parameter selection view as well in
        order for the details to be fetched during runtime.
        <br />
        <br />
        <strong>Pipelines with Terraform Steps: </strong> If the <strong>Use Terraform Output</strong> checkbox has been selected, the available parameters will
        appear in the Parameter selection option with <strong>Terraform Output</strong> as the Parameter Origin.
        They use the same syntax mentioned above in order to be used in the commands.
      </div>
    );
  };

  return (
    <OverlayIconBase
      icon={faInfoCircle}
      className={"fa-pull-right pr-2 mt-1 pl-0"}
      overlayTitle={"Parameter Selection"}
      overlayBody={getHelpOverlayBody()}
      overlayWidth={"500px"}
      overlayPlacement={"left"}
      visible={visible}
    />
  );
}

ParameterSelectListInputBaseHelpIcon.propTypes = {
  visible: PropTypes.bool,
};
