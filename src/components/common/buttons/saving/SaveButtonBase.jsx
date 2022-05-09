import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faSave} from "@fortawesome/pro-light-svg-icons";
import {persistUpdatedRecord} from "./saving-helpers";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";

function SaveButtonBase(
  {
    recordDto,
    setModel,
    updateRecord,
    disable,
    size,
    showSuccessToasts,
    lenient,
    className,
    customLabel,
    showTypeOnLabel,
    showIncompleteDataMessage,
    isIncomplete,
  }) {
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);


  const persistRecord = async () => {
    setIsSaving(true);
    await persistUpdatedRecord(
      recordDto,
      toastContext,
      showSuccessToasts,
      updateRecord,
      lenient,
      showIncompleteDataMessage,
      setModel,
      isIncomplete,
      );

    if (isMounted.current === true) {
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
      return (`Save ${recordDto.getType()}`);
    }

    return ("Save");
  };

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable || (!lenient && !recordDto.isChanged())} onClick={() => persistRecord()}>
        <span><IconBase isLoading={isSaving} icon={faSave} fixedWidth className="mr-2"/>{getLabel()}</span>
      </Button>
    </div>
  );
}

SaveButtonBase.propTypes = {
  recordDto: PropTypes.object,
  updateRecord: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  size: PropTypes.string,
  lenient: PropTypes.bool,
  className: PropTypes.string,
  customLabel: PropTypes.string,
  showTypeOnLabel: PropTypes.bool,
  showIncompleteDataMessage: PropTypes.bool,
  setModel: PropTypes.func,
  isIncomplete: PropTypes.bool,
};

SaveButtonBase.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true
};

export default SaveButtonBase;