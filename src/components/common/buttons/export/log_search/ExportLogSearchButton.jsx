import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import "jspdf-autotable";
import ExportLogDataOverlay from "components/logs/export/ExportLogDataOverlay";
import { DialogToastContext} from "../../../../../contexts/DialogToastContext";
import ExportDataButtonBase from "../../../modal/export_data/ExportDataButtonBase";

//if date should be parsed from ISO
// function parseISOString(str) {
//   var b = str.split(/\D+/);
//   return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
// }

function ExportLogSearchButton(
  {
    isLoading,
    searchResults,
    exportDisabled,
  }) {
  const toastContext = useContext(DialogToastContext);

  const launchOverlayFunction = () => {
    toastContext.showOverlayPanel(
      <ExportLogDataOverlay
        isLoading={isLoading}
        formattedData={formattedData()}
        searchResults={searchResults}
        rawData={rawDataResults()}
      />
    );
  };

  const rawDataResults = () =>{
   return searchResults.hits ? searchResults.hits.map(item => JSON.stringify(item)) : "export failure";
  };

  const formattedData = () => {
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
    <ExportDataButtonBase
      isLoading={isLoading}
      searchResults={searchResults}
      launchOverlayFunction={launchOverlayFunction}
    />
  );
}

ExportLogSearchButton.propTypes = {
  searchResults: PropTypes.any,
  isLoading: PropTypes.bool,
  exportDisabled: PropTypes.bool,
};

export default ExportLogSearchButton;