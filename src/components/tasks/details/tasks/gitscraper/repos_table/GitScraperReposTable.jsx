import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import gitScraperReposMetadata from "./gitscraper-repos-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import { faBrowser } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import GitScraperReposOverlay from "./GitScraperReposOverlay";
import CustomTable from "../../../../../common/table/CustomTable";
import taskActions from "../../../../task.actions";
import { AuthContext } from "../../../../../../contexts/AuthContext";

function GitScraperReposTable({
  setParentDataObject,
  gitScraperRepos,
  isLoading,
  parentDataObject,
}) {
  const toastContext = useContext(DialogToastContext);
  const [tableData, setTableData] = useState([]);
  const { getAccessToken } = useContext(AuthContext);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [noDataMessage, setNoDataMessage] = useState("No Repositories configured for the scan");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsTableLoading(true);
      await getTaskData();
    }
    catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    finally {
      setIsTableLoading(false);
    }
  };

  const getTaskData = async (cancelSource = cancelTokenSource) => {
    try {
      const response = await taskActions.getTaskByIdV2(getAccessToken, cancelSource, parentDataObject.getData("_id"));
      const taskData = response?.data?.data;
      const taskConfiguration = taskData?.configuration;
      const repos = taskConfiguration?.reposToScan;
      if (repos) {
        setTableData(repos);
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
      setNoDataMessage("Error in fetching configured repositories");
    }
  };

  const createGitScraperRepos = () => {
    toastContext.showOverlayPanel(
      <GitScraperReposOverlay
        setParentDataObject={setParentDataObject}
        loadData={loadData}
        parentDataObject={parentDataObject}
        gitScraperRepos={gitScraperRepos}
      />,
    );
  };

  const columns = useMemo(
    () => [
      { Header: "Repository", accessor: "repository", class: undefined },
      {
        Header: "Branch",
        accessor: "gitBranch",
        class: undefined,
        Cell: function stringifyArray(row) {
          return JSON.stringify(row?.value, null,2);
        },
      },
    ],
    [],
  );


  const onRowSelect = (rowData) => {
    let selectedRow = gitScraperRepos[rowData?.index];
    toastContext.showOverlayPanel(
      <GitScraperReposOverlay
        gitscraperDataObject={selectedRow}
        applicationId={rowData?.index}
        setParentDataObject={setParentDataObject}
        parentDataObject={parentDataObject}
        loadData={loadData}
        gitScraperRepos={gitScraperRepos}
      />
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={tableData}
        onRowSelect={onRowSelect}
        loadData={loadData}
        disabled={true}
        isLoading={isTableLoading}
        noDataMessage={noDataMessage}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"GitScraper Repository Selection"}
      type={"GitScraper Repository Selection"}
      titleIcon={faBrowser}
      addRecordFunction={createGitScraperRepos}
      body={getTable()}
      showBorder={false}
      metadata={gitScraperReposMetadata}
    />
  );
}

GitScraperReposTable.propTypes = {
  setParentDataObject: PropTypes.func,
  parentDataObject: PropTypes.object,
  isLoading: PropTypes.bool,
  gitScraperRepos: PropTypes.array,
};

export default GitScraperReposTable;
