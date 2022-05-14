import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import {
  persistNewRecord,
  persistNewRecordAndAddAnother,
  persistNewRecordAndClose,
  persistNewRecordAndViewDetails
} from "./saving-helpers";
import {useHistory} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

function CreateButton(
  {
    recordDto,
    createRecord,
    disable,
    showSuccessToasts,
    lenient,
    setRecordDto,
    addAnotherOption,
    handleClose,
    size,
    icon,
    className,
    showTypeOnLabel,
    customLabel,
    isIncomplete,
  }) {
  const [isSaving, setIsSaving] = useState(false);
  const [addAnother, setAddAnother] = useState(false);
  const history = useHistory();
  let toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const persistRecord = async () => {
    setIsSaving(true);

    if (addAnother) {
      await persistNewRecordAndAddAnother(
        recordDto,
        toastContext,
        showSuccessToasts,
        createRecord,
        lenient,
        setRecordDto,
        isIncomplete,
        );
    }
    else if (recordDto.getDetailViewLink() != null) {
      await persistNewRecordAndViewDetails(
        recordDto,
        toastContext,
        showSuccessToasts,
        createRecord,
        lenient,
        history,
          isIncomplete,
        );
    }
    else if (handleClose != null) {
      await persistNewRecordAndClose(
        recordDto,
        toastContext,
        showSuccessToasts,
        createRecord,
        lenient,
        handleClose,
        isIncomplete,
        );
    }
    else {
      await persistNewRecord(
        recordDto,
        toastContext,
        showSuccessToasts,
        createRecord,
        lenient,
        undefined,
        isIncomplete,
        );
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
      return (`Create ${recordDto.getType()}`);
    }

    return ("Create");
  };

  const getAddAnotherCheckbox = () => {
    if (addAnotherOption) {
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
        {/*TODO: Make sure button is not clickable until form is valid*/}
        <Button size={size} variant="primary" disabled={isSaving || disable} onClick={() => persistRecord()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

CreateButton.propTypes = {
  recordDto: PropTypes.object,
  createRecord: PropTypes.func,
  setRecordDto: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  handleClose: PropTypes.func,
  lenient: PropTypes.bool,
  addAnotherOption: PropTypes.bool,
  size: PropTypes.string,
  icon: PropTypes.object,
  className: PropTypes.string,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool,
  isIncomplete: PropTypes.bool,
};

CreateButton.defaultProps = {
  showSuccessToasts: true,
  addAnotherOption: true,
  size: "md",
  icon: faSave
};

export default CreateButton;