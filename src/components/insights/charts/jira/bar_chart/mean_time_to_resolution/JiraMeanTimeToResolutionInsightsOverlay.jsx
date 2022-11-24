import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
    getTableDateTimeColumn,
    getTableTextColumn
} from "../../../../../common/table/table-column-helpers";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import CustomTable from "../../../../../common/table/CustomTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";
import {jiraMeanTimeToResolutionMetadata} from "./jiraMeanTimeToResolution.metadata";

function JiraMeanTimeToResolutionInsightsOverlay({ data, closePanel }) {
  const fields = jiraMeanTimeToResolutionMetadata.ticketFields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "issueProjectName")),
      getTableTextColumn(getField(fields, "issueKey")),
      getTableDateTimeColumn(getField(fields, "issueCreated")),
      getTableTextColumn(getField(fields, "issuePriorityName")),
      getTableDateTimeColumn(getField(fields, "issueResolutionDate")),
      getTableTextColumn(getField(fields, "issueResolutionTime")),
      getTableTextColumn(getField(fields, "issueServiceComponent")),
      getTableTextColumn(getField(fields, "issueTeamName")),
      getTableTextColumn(getField(fields, "issueStatusName")),
    ],
    [],
  );
  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Jira Mean Time To Resolution Tickets`}
      showToasts={true}
    >
      <CustomTable
        nextGeneration={true}
        columns={columns}
        data={data}
      />
    </FullScreenCenterOverlayContainer>
  );
}

JiraMeanTimeToResolutionInsightsOverlay.propTypes = {
  data: PropTypes.array,
  closePanel: PropTypes.func,
};

export default JiraMeanTimeToResolutionInsightsOverlay;
