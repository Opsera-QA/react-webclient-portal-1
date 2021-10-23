import React, {useContext, useEffect, useRef, useState} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import taskActions from "components/tasks/task.actions";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import PropTypes from 'prop-types';
import GenerateSalesforceCertificateButton from "components/tasks/buttons/GenerateSalesforceCertificateButton";
import DownloadSalesforceCertificateButton from "components/tasks/buttons/DownloadSalesforceCertificateButton";
import JenkinsSynchPanel from "./panels/JenkinsSynchPanel";

function CertManagementPanel({gitTasksData, setGitTasksData, loadData, handleClose}) {
    const location = useLocation();
    const { id } = useParams();
    const { getAccessToken, getUserRecord, setAccessRoles } = useContext(AuthContext);
    const toastContext = useContext(DialogToastContext);
    const [task, setTask] = useState(undefined);
    const [certDownloadable, isCertDownloadable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [accessRole, setAccessRole] = useState(undefined);
    const isMounted = useRef(false);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);  
    
  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);

    isMounted.current = true;
    loadTaskData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadTaskData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadRecord(cancelSource);
    } catch (error) {
      if (isMounted.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    } finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadRecord = async (cancelSource = cancelTokenSource) => {
    const response = await taskActions.getGitTaskByIdV2(getAccessToken, cancelSource, id);
    const task = response?.data?.data[0];
    const certDownloadable = response?.data?.data[0]?.configuration?.downloadable;
    setTask(task);
    isCertDownloadable(certDownloadable);
  };

  const getCertInfo = () => {
    //   TODO: Clean this up once ready
    return (
      <tr>
        <td>Generate / Download Cert</td>
        <td>
            {isLoading ? <>loading</> : 
            <>
              {certDownloadable ? <DownloadSalesforceCertificateButton recordDto={gitTasksData}/> : <GenerateSalesforceCertificateButton recordDto={gitTasksData} refreshData={loadTaskData} /> }
            </>
            } 
          </td>
      </tr>
    );
  };

  const getPushInfo = () => {
    if ( !isLoading  && certDownloadable ) {
      return (
        <tr>
          <td>Synch with Jenkins</td>
          <td style={{width: "50%"}}>
            <JenkinsSynchPanel gitTasksData={gitTasksData} setGitTasksData={setGitTasksData} />
          </td>
        </tr>
      );
    }
  };
    return (
        <div className="text-muted p-3">
            <div className="h6">Opsera Managed Cert Creation</div>
            {/* <div className="mb-3">Opsera enables you to generate a certificate which can be used on custome connected app on salesforce org. You can upload this file when you create the connected app required by the JWT bearer flow. </div> */}
            <div className="pt-2">
                <Table className="m-0">
                <tbody>
                    {getCertInfo()}
                    {/* {getPushInfo()} */}
                </tbody>
                </Table>
            </div>
        </div>
    );
}

CertManagementPanel.propTypes = {
    gitTasksData: PropTypes.object,
    setGitTasksData: PropTypes.func,
    loadData: PropTypes.func,
    handleClose: PropTypes.func,
};

export default CertManagementPanel;

