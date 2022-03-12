import React, {useMemo, useContext, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import CustomTable from "components/common/table/CustomTable";
import NewJenkinsJobOverlay from "components/inventory/tools/tool_details/tool_jobs/jenkins/jobs/NewJenkinsJobOverlay";
import { DialogToastContext } from "contexts/DialogToastContext";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faLink} from "@fortawesome/pro-light-svg-icons";
import toolEndpointsMetadata from "components/inventory/tools/details/endpoints/toolEndpoints.metadata";

function ExternalApiIntegratorEndpointsTable({ toolData, loadData, onRowSelect, isLoading, endpoints }) {
  const fields = toolEndpointsMetadata.fields;
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
        loadData={loadData}
        isMounted={isMounted}
      />
    );
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "requestType")),
      getTableTextColumn(getField(fields, "url")),
      getTableTextColumn(getField(fields, "description")),
    ],
    []
  );

  const getJenkinsJobsTable = () => {
    return (
      <CustomTable
        columns={columns}
        data={endpoints}
        onRowSelect={onRowSelect}
        loadData={loadData}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      loadData={loadData}
      addRecordFunction={createJenkinsJob}
      body={getJenkinsJobsTable()}
      isLoading={isLoading}
      metadata={toolEndpointsMetadata}
      titleIcon={faLink}
      title={"Endpoints"}
    />
  );
}

ExternalApiIntegratorEndpointsTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  endpoints: PropTypes.array,
};

export default ExternalApiIntegratorEndpointsTable;