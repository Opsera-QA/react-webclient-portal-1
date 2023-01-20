import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  getTableTextColumn,
  getTableDateTimeColumn,
} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";
import { getField } from "components/common/metadata/metadata-helpers";
import { insightsLookupDetailsMetadata } from "./insightsLookupDetails.metadata";
import FilterContainer from "../../common/table/FilterContainer";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";
import { screenContainerHeights } from "../../common/panels/general/screenContainer.heights";
import ExportInsightsLookupDetailsPanel from "./export/ExportInsightsLookupDetailsPanel";
import ExportInsightsLookupDetailsButton from "./export/ExportInsightsLookupDetailsButton";

function InsightsLookupDetailsTable({
  lookupDetails,
  isLoading,
  paginationModel,
  setPaginationModel,
  loadDataFunction,
  tableHeight,
}) {
  const [showExportPanel, setShowExportPanel] = useState(false);
  const fields = insightsLookupDetailsMetadata.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(
        getField(fields, "pipelineId"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
      getTableTextColumn(
        getField(fields, "pipelineName"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
      getTableTextColumn(
        getField(fields, "jobType"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
      getTableTextColumn(
        getField(fields, "createdByName"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
      getTableDateTimeColumn(
        getField(fields, "startTimestamp"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
      getTableDateTimeColumn(
        getField(fields, "endTimestamp"),
        "no-wrap-inline",
        undefined,
        undefined,
      ),
    ],
    [],
  );

  const getInsightsLookupDetailsTable = () => {
    if (showExportPanel === true) {
      return (
        <ExportInsightsLookupDetailsPanel
          showExportPanel={showExportPanel}
          setShowExportPanel={setShowExportPanel}
          LookupDetailsData={lookupDetails}
        />
      );
    }

    return (
      <VanityTable
        columns={columns}
        loadData={loadDataFunction}
        data={lookupDetails}
        isLoading={isLoading}
        setPaginationModel={setPaginationModel}
        paginationModel={paginationModel}
        tableHeight={screenContainerHeights.SCREEN_CONTAINER_HEIGHT}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadDataFunction}
      isLoading={isLoading}
      titleIcon={faCalendarAlt}
      type={"Lookup Details"}
      title={"Lookup Details"}
      metadata={insightsLookupDetailsMetadata}
      body={getInsightsLookupDetailsTable()}
      className={"mt-3 mx-3"}
      exportButton={
        <ExportInsightsLookupDetailsButton
          className={"ml-2"}
          setShowExportPanel={setShowExportPanel}
          showExportPanel={showExportPanel}
        />
      }
    />
  );
}

InsightsLookupDetailsTable.propTypes = {
  lookupDetails: PropTypes.array,
  isLoading: PropTypes.bool,
  setPaginationModel: PropTypes.func,
  paginationModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  tableHeight: PropTypes.any,
};

export default InsightsLookupDetailsTable;
