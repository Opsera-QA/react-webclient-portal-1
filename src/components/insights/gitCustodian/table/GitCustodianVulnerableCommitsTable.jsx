import React, { useState, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import CustomTable from "../../../common/table/CustomTable";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
  getGitCustodianOriginColumn,
  getPathDefinition,
  getGitCustodianExternalLinkIconColumnDefinition,
  getTableInfoIconColumn,
  getCustomTableAccessor,
} from "../../../common/table/table-column-helpers";
import { getDurationInDaysHours } from "components/common/table/table-column-helpers-v2";
import { getField } from "../../../common/metadata/metadata-helpers";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";
import FilterContainer from "../../../common/table/FilterContainer";
import GitCustodianCreateJiraTicketOverlay from "components/insights/gitCustodian/modal/GitCustodianCreateJiraTicketOverlay";
import { GitCustodianFilterMetadata } from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";
import ExportGitCustodianVulnerabilitiesButton from "./ExportGitCustodianVulnerabilitiesButton";
import GitCustodianVulnerabilityDetailsOverlay from "../GitCustodianVulnerabilityDetailsOverlay";
import StandaloneCheckboxInput from "components/common/inputs/boolean/checkbox/StandaloneCheckboxInput";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import UpdateGitCustodianVulnerabilityStatusButton from "./UpdateGitCustodianVulnerabilityStatusButton";
import CustomTabContainer from "../../../common/tabs/CustomTabContainer";
import { faFileAlt } from "@fortawesome/pro-light-svg-icons";
import CustomTab from "../../../common/tabs/CustomTab";
import DetailTabPanelContainer from "../../../common/panels/detail_view/DetailTabPanelContainer";

// TODO: Leave here for now. If we reuse this concept in the future, I will make a generic version --Noah
//  Anything context specific and not generic should be left in the context.
const getGitCustodianExternalLinkIconOrCheckboxColumnDefinition = (
  selectedIssues,
  setDataFunction,
  field,
  className,
) => {
  return {
    accessor: getCustomTableAccessor(field),
    Cell: function getIcon(row) {
      const issue = row?.row?.original;
      const issueId = issue?.issueId;
      const index = selectedIssues.findIndex(
        (selectedIssue) => selectedIssue?.issueId === issueId,
      );

      if (issue.status !== "Open") {
        return null;
      }

      return (
        <TooltipWrapper
          innerText={"Select this item to include in a Jira ticket"}
        >
          <div>
            <StandaloneCheckboxInput
              value={index !== -1}
              setDataFunction={(newValue) => setDataFunction(issue, newValue)}
            />
          </div>
        </TooltipWrapper>
      );
    },
    class: className,
  };
};

function GitCustodianVulnerableCommitsTable({
  loadData,
  gitCustodianData,
  isLoading,
  vulnerableCommits,
  tableFilterModel,
  setTableFilterModel,
}) {
  const fields = GitCustodianFilterMetadata.fields;
  const toastContext = useContext(DialogToastContext);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const setDataFunction = (issue, newValue) => {
    const issueId = issue?.issueId;
    const index = selectedIssues.findIndex(
      (selectedIssue) => selectedIssue.issueId === issueId,
    );

    if (newValue === false && index !== -1) {
      selectedIssues.splice(index, 1);
      setSelectedIssues([...selectedIssues]);
    } else if (newValue === true && index === -1) {
      selectedIssues.push(issue);
      setSelectedIssues([...selectedIssues]);
    }
  };

  const showVulnerabilityDetails = (row) => {
    toastContext.showOverlayPanel(
      <GitCustodianVulnerabilityDetailsOverlay vulnerabilityData={row} />,
    );
  };

  const columns = useMemo(
    () => [
      getGitCustodianExternalLinkIconOrCheckboxColumnDefinition(
        selectedIssues,
        setDataFunction,
        getField(fields, "jiraTicket"),
      ),
      getTableDateTimeColumn(getField(fields, "commitDate")),
      getTableDateTimeColumn(getField(fields, "lastScannedOn")),
      getTableTextColumn(getField(fields, "repository")),
      getTableTextColumn(getField(fields, "author")),
      getPathDefinition(getField(fields, "path"), "force-text-wrap"),
      getGitCustodianExternalLinkIconColumnDefinition(
        getField(fields, "lineNumber"),
      ),
      getGitCustodianOriginColumn(getField(fields, "service")),
      getDurationInDaysHours(getField(fields, "exposedHours")),
      getTableTextColumn(getField(fields, "type")),
      getTableTextColumn(getField(fields, "status")),
      getTableInfoIconColumn(showVulnerabilityDetails),
    ],
    [selectedIssues],
  );

  const createNewJiraTicket = () => {
    toastContext.showOverlayPanel(
      <GitCustodianCreateJiraTicketOverlay
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
      />,
    );
  };

  const handleTabClick = (activeTab) => (e) => {
    e.preventDefault();
    const newFilterModel = { ...tableFilterModel };
    //     "Commit Removed"
    //     "False Positive"
    //     "Resolved"
    //     "Open"
    switch (activeTab) {
      case "open":
        newFilterModel.setData("status", ["Open"]);
        setTableFilterModel({ ...newFilterModel });
        break;
      case "falsePositives":
        newFilterModel.setData("status", ["False Positive"]);
        setTableFilterModel({ ...newFilterModel });
        break;
      case "resolved":
        newFilterModel.setData("status", ["Resolved"]);
        setTableFilterModel({ ...newFilterModel });
        break;
      case "commitRemoved":
        newFilterModel.setData("status", ["Commit Removed"]);
        setTableFilterModel({ ...newFilterModel });
        break;
      default:
        newFilterModel.setData("status", []);
        setTableFilterModel({ ...newFilterModel });
        break;
    }
    loadData(newFilterModel);
    setActiveTab(activeTab);
  };

  const getDetailedTableContainer = () => {
    return (
      <DetailTabPanelContainer
        detailView={getTable()}
        tabContainer={getTabContainer()}
      />
    );
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"All"}
          tabName={"all"}
          handleTabClick={handleTabClick}
          icon={faFileAlt}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Open"}
          tabName={"open"}
          handleTabClick={handleTabClick}
          icon={faFileAlt}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"False Positives"}
          tabName={"falsePositives"}
          handleTabClick={handleTabClick}
          icon={faFileAlt}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Resolved"}
          tabName={"resolved"}
          handleTabClick={handleTabClick}
          icon={faFileAlt}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Commit Removed"}
          tabName={"commitRemoved"}
          handleTabClick={handleTabClick}
          icon={faFileAlt}
        />
      </CustomTabContainer>
    );
  };

  const getTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={vulnerableCommits}
        loadData={loadData}
        paginationDto={tableFilterModel}
        setPaginationDto={setTableFilterModel}
      />
    );
  };

  const getExportButton = () => {
    return (
      <ExportGitCustodianVulnerabilitiesButton
        className={"ml-2"}
        gitCustodianData={gitCustodianData}
        data={vulnerableCommits}
        isLoading={isLoading}
      />
    );
  };

  const getInlineFilters = () => {
    return (
      <UpdateGitCustodianVulnerabilityStatusButton
        className={"mx-2"}
        selectedIssues={selectedIssues}
        setSelectedIssues={setSelectedIssues}
        disabled={!(selectedIssues.length > 0)}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      isLoading={isLoading}
      title={"Vulnerable Commits"}
      addRecordFunction={createNewJiraTicket}
      type={"Jira Ticket"}
      body={getDetailedTableContainer()}
      metadata={gitCustodianData}
      filterDto={tableFilterModel}
      setFilterDto={setTableFilterModel}
      supportSearch={false}
      className={"px-2 pb-2"}
      disableNewRecordButton={selectedIssues?.length === 0} // TODO: Remove this
      exportButton={getExportButton()}
      inlineFilters={getInlineFilters()}
      loadData={loadData}
      activeFilterDisplayer={false}
    />
  );
}

GitCustodianVulnerableCommitsTable.propTypes = {
  gitCustodianData: PropTypes.object,
  vulnerableCommits: PropTypes.array,
  loadData: PropTypes.func,
  isLoading: PropTypes.bool,
  tableFilterModel: PropTypes.object,
  setTableFilterModel: PropTypes.func,
};

export default GitCustodianVulnerableCommitsTable;
