import React, {useContext, useEffect, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faCog} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import taskActions from "components/tasks/task.actions";
import IconBase from "components/common/icons/IconBase";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import useComponentStateReference from "hooks/useComponentStateReference";

function GenerateSalesforceCertificateButton({refreshData, recordDto, disable, size, showSuccessToasts, className, saveButtonText}) {
  let toastContext = useContext(DialogToastContext);
  const [canGenerate, setCanGenerate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    userData,
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);


  const loadData = async () => {
    try {
      setIsSaving(true);
      const gitTask = recordDto.getPersistData();
      setCanGenerate(TaskRoleHelper.canGenerateSalesforceCertificate(userData, gitTask));
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsSaving(false);
      }
    }
  };

  const generateCertificate = async () => {
    try{
      setIsSaving(true);
      const response = await taskActions.generateCert(getAccessToken, recordDto.getData("_id"), cancelTokenSource);
      // console.log(response);
      if(!(response?.data?.message === "SUCCESS")) {
        toastContext.showErrorDialog("error occured while generating cert!");
      }
      refreshData();
    } catch (e) {
      console.log("error occured while generating cert!");
      toastContext.showErrorDialog("error occured while generating cert!");
    } finally {
      setIsSaving(false);
    }
    
    if (isMounted.current === true) {
      setIsSaving(false);
    }
  };

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable || !canGenerate} onClick={() => generateCertificate()}>
        <IconBase icon={faCog} className={"mr-1"} isLoading={isSaving} />
      </Button>
    </div>
  );
}

GenerateSalesforceCertificateButton.propTypes = {
  recordDto: PropTypes.object,
  refreshData: PropTypes.func,
  disable: PropTypes.bool,
  showSuccessToasts: PropTypes.bool,
  size: PropTypes.string,
  className: PropTypes.string,
  saveButtonText: PropTypes.string
};

GenerateSalesforceCertificateButton.defaultProps = {
  disable: false,
  size: "md",
  showSuccessToasts: true,
  saveButtonText: "Generate Certificate"
};

export default GenerateSalesforceCertificateButton;