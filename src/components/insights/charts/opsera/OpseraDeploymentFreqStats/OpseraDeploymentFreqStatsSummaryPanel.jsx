import React, { useMemo } from "react";
import { useTable } from 'react-table';
import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import SummaryPanelContainer from "components/common/panels/detail_view/SummaryPanelContainer";
import TextFieldBase from "components/common/fields/text/TextFieldBase";
import DateTimeField from "components/common/fields/date/DateTimeField";
import GenericItemField from "components/common/fields/multiple_items/GenericItemField";
import LinkField from "components/common/fields/link/LinkField";
import {
  getChartPipelineStatusColumn,
  getTableDateTimeColumn,
  getTableTextColumn,
} from "../../../../common/table/table-column-helpers";
import { getField } from "../../../../common/metadata/metadata-helpers";
// import DeploymentFrequencyInsightsTableMetadata from "../../../charts/opsera/OpseraDeploymentFreqStats/deployment-frequency-actionable-metadata;


function OpseraDeploymentFreqStatsSummaryPanel({ chartModel, setActiveTab }) {
  // const fields = BuildDetailsMetadata.fields;
  return (
    <SummaryPanelContainer setActiveTab={setActiveTab}>
      {/*const columns = useMemo(*/}
      {/*() => [*/}
      {/*getTableTextColumn(getField(fields, "pipeline_name")),*/}
      {/*getTableTextColumn(getField(fields, "run_count")),*/}
      {/*getTableTextColumn(getField(fields, "owner")),*/}
      {/*getChartPipelineStatusColumn(getField(fields, "status")),*/}
      {/*getTableDateTimeColumn(getField(fields, "timestamp")),*/}
      {/*],*/}
      {/*[]*/}
      {/*);*/}
      
    </SummaryPanelContainer>
  );
}

OpseraDeploymentFreqStatsSummaryPanel.propTypes = {
  chartModel: PropTypes.object,
  setActiveTab: PropTypes.func,
};

export default OpseraDeploymentFreqStatsSummaryPanel;