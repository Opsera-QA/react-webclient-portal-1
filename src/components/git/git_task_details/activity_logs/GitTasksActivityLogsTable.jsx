import React, { useMemo, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import { AuthContext } from "contexts/AuthContext";
import {
  getTableBooleanIconColumn,
  getTableDateTimeColumn, getTableInfoIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import gitTasksActivityLogMetadata
  from "components/git/git_task_details/activity_logs/git-tasks-activity-log-metadata";
import gitTaskActions from "components/git/git-task-actions";
import Model from "core/data_model/model";
import gitTasksActivityLogFilterMetadata
  from "components/git/git_task_details/activity_logs/git-tasks-activity-log-filter-metadata";
import StatusFilter from "components/common/filters/status/StatusFilter";
import FilterContainer from "components/common/table/FilterContainer";
import {faTable} from "@fortawesome/pro-light-svg-icons";
import GitTaskActivityDetailViewer from "./GitTaskActivityDetailViewer";

function GitTasksActivityLogsTable({ gitTasksData, allLogs }) {
  let fields = gitTasksActivityLogMetadata.fields;
  const { getAccessToken } = useContext(AuthContext);
  const [logData, setLogData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [gitTasksActivityFilterDto, setGitTasksActivityFilterDto] = useState(new Model({...gitTasksActivityLogFilterMetadata.newObjectFields}, gitTasksActivityLogFilterMetadata, false));

  useEffect(() => {
    loadData();
  }, []);

  const showActivityLog = (row) => {
    console.log(row);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(fields.find(field => { return field.id === "name";})),
      getTableTextColumn(fields.find(field => { return field.id === "type";})),
      // getTableTextColumn(fields.find(field => { return field.id === "message"})),
      {...getTableTextColumn(fields.find(field => { return field.id === "message";})), class: "force-text-wrap"},
      getTableTextColumn(fields.find(field => { return field.id === "log_type";})),
      getTableBooleanIconColumn(fields.find(field => { return field.id === "status";})),
      getTableDateTimeColumn(fields.find(field => { return field.id === "createdAt";})),
      getTableInfoIconColumn(showActivityLog),
    ],
    [],
  );

  const onRowSelect = (rowData) => {
    setModalData(rowData.original);
    setShowModal(true);
  };

  const loadData = async (filterDto = gitTasksActivityFilterDto) => {
    try {
      let gitTasksLogResponse;

      setIsLoading(true);

      if(allLogs) {
        gitTasksLogResponse = await gitTaskActions.getAllGitTasksActivityLogs(filterDto, getAccessToken);
      } else {
        gitTasksLogResponse = await gitTaskActions.getGitTaskActivityLogs(gitTasksData, filterDto, getAccessToken);
      }
      
      if (gitTasksLogResponse?.data) {
        setLogData(gitTasksLogResponse.data.data);

        let newFilterDto = filterDto;
        newFilterDto.setData("totalCount", gitTasksLogResponse.data.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setGitTasksActivityFilterDto({...newFilterDto});
      }
    } catch (error) {
      console.log(error.message);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getDropdownFilters = () => {
    return (
      <>
        <StatusFilter filterDto={gitTasksActivityFilterDto} setFilterDto={setGitTasksActivityFilterDto} className={"mb-2"} />
      </>
    );
  };

  const getGitTasksActivityLogsTable = () => {
    return (
      <CustomTable
        className={"no-table-border"}
        columns={columns}
        data={logData}
        isLoading={isLoading}
        onRowSelect={onRowSelect}
        paginationDto={gitTasksActivityFilterDto}
        setPaginationDto={setGitTasksActivityFilterDto}
        loadData={loadData}
      />
    );
  };

  return (
    <div className="px-2 pb-2">
      <FilterContainer
        loadData={loadData}
        isLoading={isLoading}
        body={getGitTasksActivityLogsTable()}
        filterDto={gitTasksActivityFilterDto}
        setFilterDto={setGitTasksActivityFilterDto}
        supportSearch={true}
        // dropdownFilters={getDropdownFilters()}
        titleIcon={faTable}
        title={"Git Tasks Activity Logs"}
      />
      {/* <ModalActivityLogsDialog size={"lg"} header={"Git Tasks Activity Log"} jsonData={modalData} show={showModal} setParentVisibility={setShowModal} /> */}
      <GitTaskActivityDetailViewer
        gitTaskActivityData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

GitTasksActivityLogsTable.propTypes = {
  gitTasksData: PropTypes.object,
  allLogs : PropTypes.bool,
};

export default GitTasksActivityLogsTable;
