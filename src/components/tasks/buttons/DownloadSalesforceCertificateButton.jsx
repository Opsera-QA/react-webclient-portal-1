import React, {useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import useComponentStateReference from "hooks/useComponentStateReference";

function DownloadSalesforceCertificateButton({recordDto, disable, size, showSuccessToasts, className, saveButtonText}) {
  const [isSaving, setIsSaving] = useState(false);
  const {
    isMounted,
    getAccessToken,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {}, []);

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

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable} onClick={() => downloadCertificate()}>
        <span><IconBase icon={faFileDownload} isLoading={isSaving} className={"mr-1"}/>{saveButtonText}</span>
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