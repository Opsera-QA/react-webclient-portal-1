import React, {useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import Button from "react-bootstrap/Button";
import {faFileDownload} from "@fortawesome/pro-light-svg-icons";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import ExportLogDataModal from "components/common/modal/export_data/ExportLogDataModal";
import IconBase from "components/common/icons/IconBase";

//if date should be parsed from ISO
// function parseISOString(str) {
//   var b = str.split(/\D+/);
//   return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
// }

function ExportLogSearchButton({isLoading, searchResults, exportDisabled}) {
  const [showExportModal, setShowExportModal] = useState(false);

  const closeModal = () => {
    setShowExportModal(false);
  };

  const rawDataResults = () =>{
   return searchResults.hits ? searchResults.hits.map(item => JSON.stringify(item)) : "export failure";
  };

  const formatSearchResults = () => {
    let formattedData = [searchResults];

     //formats each result to match results returned from search
  // doc.autoTable({
  //   showHead: "firstPage",
  //   head:[["Logs Search Results"]],
  //   body: data.map(item => [
  //   "Date: " + parseISOString(item?._source[Object.keys(item._source)[0]]) + "\n" +
  //   "id: " + item._source.data.tool_output.vulnerabilities.nvd_data[0].id + "\n" +
  //   "package_path: " + item._source.data.tool_output.vulnerabilities.package_path + "\n" +
  //   "url: " + item._source.data.tool_output.vulnerabilities.url + "\n" +
  //   "pipeline_tags: " + item._source.data.pipeline_tags + "\n" +
  //   "jobId: " + item._source.data.jobId + "\n" +
  //   "stepId: " + item._source.data.stepId + "\n" +
  //   "job_log: " + JSON.stringify(item._source.data.job_log) + "\n" +
  //   "tags: " + item._source.tags[0] + "\n" +
  //   "sort: " + item.sort[0]])
  // })
   

    // console.log(formattedData);
    return formattedData;
  };

  // TODO: Refine when more is complete
  return (
    <>
      <TooltipWrapper innerText={"Export as PDF"}>
        <div className={'float-right'}>
          <Button
            variant={"primary"}
            disabled={exportDisabled}
            className={"ml-1 float-right"}
            onClick={() => setShowExportModal(true)}>
            <span><IconBase icon={faFileDownload}/></span>
          </Button>
        </div>
      </TooltipWrapper>
      <ExportLogDataModal
        showModal={showExportModal}
        closeModal={closeModal}
        isLoading={isLoading}
        formattedData={formatSearchResults()}
        rawData={rawDataResults()}
      />
    </>
  );
}

ExportLogSearchButton.propTypes = {
  searchResults: PropTypes.any,
  isLoading: PropTypes.bool,
  exportDisabled: PropTypes.bool,
};

export default ExportLogSearchButton;