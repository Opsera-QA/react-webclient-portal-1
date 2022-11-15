import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import {getTableDateColumn, getTableTextColumn} from "../../../../../common/table/table-column-helpers";
import { getField } from "../../../../../common/metadata/metadata-helpers";
import { jiraChangeFailureRateMetadata } from "./jiraChangeFailureRate.metadata";
import CustomTable from "../../../../../common/table/CustomTable";
import FullScreenCenterOverlayContainer from "components/common/overlays/center/FullScreenCenterOverlayContainer";

function JiraChangeFailureRateInsightsOverlay({ data, closePanel }) {
  const fields = jiraChangeFailureRateMetadata.commitFields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "ticket")),
      getTableTextColumn(getField(fields, "status")),
      getTableTextColumn(getField(fields, "resolution")),
      getTableDateColumn(getField(fields, "createdAt")),
      getTableTextColumn(getField(fields, "priority")),
      getTableTextColumn(getField(fields, "serviceComponent")),      
      getTableTextColumn(getField(fields, "teamName")),
    ],
    [],
  );
  return (
    <FullScreenCenterOverlayContainer
      closePanel={closePanel}
      titleText={`Jira Change Failure Tickets`}
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

JiraChangeFailureRateInsightsOverlay.propTypes = {
  data: PropTypes.array,
  closePanel: PropTypes.func,
};

export default JiraChangeFailureRateInsightsOverlay;
