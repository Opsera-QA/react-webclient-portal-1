import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileDownload, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import taskActions from "components/tasks/task.actions";

function DownloadSalesforceCertificateButton({recordDto, disable, size, showSuccessToasts, className, saveButtonText}) {
  const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
  let toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);


  const downloadCertificate = async () => {
    try{
      setIsSaving(true);
      const response = await taskActions.getCert(getAccessToken, recordDto.getData("_id"));
      let certEncodedString = response?.data?.message;
      let decodedString = atob(certEncodedString);
      const element = document.createElement("a");
      const file = new Blob([decodedString], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "opsera-server.crt";
      document.body.appendChild(element);
      element.click();
    } catch (e) {
      console.log("error occured while downloading cert! ", e);
      toastContext.showErrorDialog("error occured while downloading cert!");
    } finally {
      setIsSaving(false);
    }
    
    if (isMounted.current === true) {
      setIsSaving(false);
    }
  };

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>{saveButtonText}</span>);
    }

    return (<span><FontAwesomeIcon icon={faFileDownload} fixedWidth className="mr-1"/>{saveButtonText}</span>);
  };

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable} onClick={() => downloadCertificate()}>
        {getLabel()}
      </Button>
    </div>
  );
}

DownloadSalesforceCertificateButton.propTypes = {
  recordDto: PropTypes.object,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  saveButtonText: PropTypes.string
};

DownloadSalesforceCertificateButton.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true,
  saveButtonText: "Download Certificate"
};

export default DownloadSalesforceCertificateButton;