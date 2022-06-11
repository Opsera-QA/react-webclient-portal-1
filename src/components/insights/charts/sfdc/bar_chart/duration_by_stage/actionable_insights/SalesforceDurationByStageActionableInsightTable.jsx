import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import FilterContainer from "components/common/table/FilterContainer";
import SonarPipelineTableMetadata from "./salesforce-duration-by-stage-metadata";
import {
  getTableTextColumn,
  getTableTextColumnWithoutField,
  getTableDurationTextColumn,
} from "components/common/table/table-column-helpers";
import { getField } from "components/common/metadata/metadata-helpers";
import CustomTable from "components/common/table/CustomTable";
import { faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import BlueprintLogOverlay from "components/blueprint/BlueprintLogOverlay";

// TODO: Convert to cards
function SalesforceDurationByStageActionableInsightTable({
                                                           data,
                                                           isLoading,
                                                           loadData,
                                                           filterModel,
                                                           setFilterModel,
                                                           title,
                                                         }) {
  const toastContext = useContext(DialogToastContext);
  const fields = SonarPipelineTableMetadata.fields;
  const tableTitle = "Pipeline Deployments Report";
  const noDataMessage = "Pipeline report is currently unavailable at this time";

  const columns = useMemo(
      () => [
        getTableTextColumn(getField(fields, "name"), "name"),
        getTableTextColumn(getField(fields, "total"), "total"),
        getTableTextColumn(getField(fields, "total_success"), "total_success"),
        getTableTextColumn(getField(fields, "total_failed"), "total_failed"),
        getTableDurationTextColumn(getField(fields, "duration"), "duration"),
        getTableDurationTextColumn(getField(fields, "time_to_resolve"), "time_to_resolve"),
        //getTableTextColumnWithoutField("Actions", "_blueprint", "text-center"),
      ],
      []
  );

  // const onRowSelect = (rowData) => {
  //   toastContext.showOverlayPanel(
  //     <BlueprintLogOverlay
  //       pipelineId={rowData?.original?.latest_run[0]?._id?.pipelineId}
  //       runCount={rowData?.original?.latest_run[0]?._id?.run}
  //     />
  //   );
  // };

  const getTable = () => {
    return (
        <CustomTable
            isLoading={isLoading}
            loadData={loadData}
            columns={columns}
            data={data}
            noDataMessage={noDataMessage}
            paginationDto={filterModel}
            setPaginationDto={setFilterModel}
            //onRowSelect={onRowSelect}
        />
    );
  };

  return (
      <FilterContainer
          isLoading={isLoading}
          title={tableTitle}
          titleIcon={faDraftingCompass}
          body={getTable()}
          className={"px-2 pb-2"}
          loadData={loadData}
          setFilterDto={setFilterModel}
          filterDto={filterModel}
      />
  );
}

SalesforceDurationByStageActionableInsightTable.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  title: PropTypes.string,
};

export default SalesforceDurationByStageActionableInsightTable;
