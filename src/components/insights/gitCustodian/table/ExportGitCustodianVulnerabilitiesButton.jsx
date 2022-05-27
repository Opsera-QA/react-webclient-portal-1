import React, {useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportGitCustodianVulnerabilitiesDataModal from "components/common/modal/export_data/ExportGitCustodianVulnerabilitiesDataModal";
import IconBase from "components/common/icons/IconBase";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import chartsActions from "../../charts/charts-actions";

function ExportGitCustodianVulnerabilitiesButton({ className, gitCustodianData, isLoading }) {

  const { getAccessToken } = useContext(AuthContext);
  const isMounted = useRef(false);
  const [isDownloadDataLoading, setIsDownloadDataLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [issuesData, setIssuesData] = useState([]);
  const [showExportModal, setShowExportModal] = useState(false);  

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
    return issuesData;
   };

  const formattedData = () => {
    let formattedData = issuesData;

    //any data formatting goes here

    return formattedData;
  };

  const fetchDownloadData = async () => {
    try {
      setIsDownloadDataLoading(true);
      setShowExportModal(true);
      const dataResponse = await chartsActions.exportGitCustodianData(getAccessToken, cancelTokenSource, gitCustodianData);
      const issuesArr = dataResponse?.data?.data?.data;
      if (Array.isArray(issuesArr)) {
        setIssuesData(issuesArr);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsDownloadDataLoading(false);        
      }
    }    
  };

  // TODO: Refine when more is complete
  return (
    <>
      <TooltipWrapper innerText={"Export"}>
        <div className={className}>
          <Button
            variant={"outline-primary"}
            size={"sm"}
            disabled={isLoading}
            onClick={fetchDownloadData}>
            <span><IconBase icon={faFileDownload}/></span>
          </Button>
        </div>
      </TooltipWrapper>
      <ExportGitCustodianVulnerabilitiesDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        setParentVisibility={setShowExportModal}
        isLoading={isDownloadDataLoading}
        formattedData={formattedData()}
        rawData={rawDataResults()}
       />
    </>
  );
}

ExportGitCustodianVulnerabilitiesButton.propTypes = {  
  className: PropTypes.string,
  gitCustodianData: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default ExportGitCustodianVulnerabilitiesButton;