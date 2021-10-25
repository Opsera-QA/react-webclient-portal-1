import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faSpinner} from "@fortawesome/pro-light-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import taskActions from "components/tasks/task.actions";
import axios from "axios";
import workflowAuthorizedActions
from "components/workflow/pipelines/pipeline_details/workflow/workflow-authorized-actions";
function GenerateSalesforceCertificateButton({refreshData, recordDto, disable, size, showSuccessToasts, className, saveButtonText}) {
  const { getAccessToken, getUserRecord, setAccessRoles, getAccessRoleData } = useContext(AuthContext);
  let toastContext = useContext(DialogToastContext);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [canGenerate, setCanGenerate] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {

    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);


  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsSaving(true);
      const customerAccessRules = await getAccessRoleData();
      const gitTask = recordDto.getPersistData();
      setCanGenerate(workflowAuthorizedActions.gitItems(customerAccessRules, "sfdc_cert_gen", gitTask.owner, gitTask.roles));
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

  const getLabel = () => {
    if (isSaving) {
      return (<span><FontAwesomeIcon icon={faCog} spin className="mr-1" fixedWidth/>{saveButtonText}</span>);
    }

    return (<span><FontAwesomeIcon icon={faCog} fixedWidth className="mr-1"/>{saveButtonText}</span>);
  };

  return (
    <div className={className}>
      <Button size={size} variant="primary" disabled={isSaving || disable || !canGenerate} onClick={() => generateCertificate()}>
        {getLabel()}
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