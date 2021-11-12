import React, {useMemo, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NewJenkinsJobOverlay from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/NewJenkinsJobOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getTableBooleanIconColumn,
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import JenkinsJobMetadata from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/jenkins-job-metadata";
import FilterContainer from "components/common/table/FilterContainer";
import {faAbacus} from "@fortawesome/pro-light-svg-icons";
import {getColumnHeader, getColumnId} from "components/common/table/column_definitions/model-table-column-definitions";

export const getJenkinsJobTypeColumn = (field, className) => {
  let header = getColumnHeader(field);

  return {
    header: header,
    id: getColumnId(field),
    width: 200,
    template: function (value) {
      return value[0];
    },
    class: className
  };
};

export const getJobTypeColumn = (field, className) => {
  return {
    Header: "Type",
    accessor: "type",
    Cell: function formatCell(row) {
      const valueArray = row?.value;
      return Array.isArray(valueArray) && valueArray.length > 0 ? valueArray[0] : "";
    },
    className: className
  };
};

function JenkinsJobsTable({ toolData, loadData, onRowSelect, isLoading }) {
  const fields = JenkinsJobMetadata.fields;
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);

  useEffect(()=>{
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  },[]);

  const createJenkinsJob = () => {
    toastContext.showOverlayPanel(
      <NewJenkinsJobOverlay
        toolData={toolData}
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "_id")),
      getTableTextColumn(getField(fields, "description")),
      getJobTypeColumn(getField(fields, "type")),
      getTableBooleanIconColumn(getField(fields, "active"))
    ],
    []
  );

  const getJenkinsJobsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={[...toolData.getData("jobs")]}
        onRowSelect={onRowSelect}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      // loadData={loadData}
      addRecordFunction={createJenkinsJob}
      body={getJenkinsJobsTable()}
      isLoading={isLoading}
      metadata={JenkinsJobMetadata}
      titleIcon={faAbacus}
      title={"Jobs"}
    />
  );
}

JenkinsJobsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool
};

export default JenkinsJobsTable;