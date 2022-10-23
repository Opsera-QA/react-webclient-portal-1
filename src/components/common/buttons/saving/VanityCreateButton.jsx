import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faSave } from "@fortawesome/pro-light-svg-icons";
import {
  persistNewRecord,
  persistNewRecordAndAddAnother,
  persistNewRecordAndClose,
  persistNewRecordAndViewDetails,
} from "./saving-helpers-v2";
import { useHistory } from "react-router-dom";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { hasStringValue } from "components/common/helpers/string-helpers";

function VanityCreateButton(
  {
    model,
    setModel,
    disable,
    showSuccessToasts,
    handleClose,
    size,
    icon,
    className,
    showTypeOnLabel,
    customLabel,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const history = useHistory();
  const {
    isMounted,
    toastContext,
  } = useComponentStateReference();

  const persistRecord = async () => {
    setIsSaving(true);

    if (addAnother) {
      await persistNewRecordAndAddAnother(model, toastContext, showSuccessToasts, setModel);
    }
    else if (model.getDetailViewLink != null && hasStringValue(model.getDetailViewLink()) === true) {
      await persistNewRecordAndViewDetails(model, toastContext, showSuccessToasts, history);
    }
    else if (handleClose != null) {
      await persistNewRecordAndClose(model, toastContext, showSuccessToasts, handleClose);
    }
    else {
      await persistNewRecord(model, toastContext, showSuccessToasts);
    }

    if (isMounted?.current === true) {
      setIsSaving(false);
    }
  };

  const getLabel = () => {
    if (isSaving) {
      return ("Saving");
    }

    if (customLabel) {
      return (customLabel);
    }

    if (showTypeOnLabel) {
      return (`Create ${model.getType()}`);
    }

    return ("Create");
  };

  const getAddAnotherCheckbox = () => {
    if (model?.showAddAnotherCheckbox() === true) {
      return (
        <div className="d-flex mr-3 mt-auto">
          <div><span className="text-muted mr-2">Add Another</span></div>
          <div><input className="mt-1" type="checkbox" checked={addAnother} onChange={() => setAddAnother(!addAnother)} /></div>
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        {getAddAnotherCheckbox()}
        <Button
          size={size}
          disabled={isSaving || disable || (model?.checkCurrentValidity() !== true && model?.isLenient() !== true)}
          onClick={() => persistRecord()}
        >
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

VanityCreateButton.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  handleClose: PropTypes.func,
  size: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool,
};

VanityCreateButton.defaultProps = {
  showSuccessToasts: true,
  size: "md",
  icon: faSave,
};

export default VanityCreateButton;