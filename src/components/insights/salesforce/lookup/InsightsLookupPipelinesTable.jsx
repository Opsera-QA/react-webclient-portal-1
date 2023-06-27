import React, { useContext, useMemo } from "react";
import PropTypes from "prop-types";
import InsightsLookupPipelineOverlay from "./InsightsLookupPipelineOverlay";
import { getField } from "components/common/metadata/metadata-helpers";
import { getTableTextColumn } from "components/common/table/table-column-helpers";
import MakeupTableBase from "components/common/table/makeup/MakeupTableBase";
import { faBug } from "@fortawesome/pro-light-svg-icons";
import FilterContainer from "components/common/table/FilterContainer";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";

const fields = [
  {
    label: "Pipeline",
    id: "pipeline",
  },
  {
    label: "Deploy Count",
    id: "deployments",
  },
  {
    label: "Validations Passed",
    id: "validations_passed",
  },
  {
    label: " Validations Failed",
    id: "validations_failed",
  },
  {
    label: "Unit Tests Passed",
    id: "unit_tests_passed",
  },
  {
    label: "Unit Tests Failed",
    id: "unit_tests_failed",
  },
  {
    label: "Deployed By",
    id: "last_deploy",
  },
];

const initialState = {
  pageIndex: 0,
  sortBy: [
    {
      id: "deploy_count",
      desc: true,
    },
    {
      id: "validations_passed",
      desc: true,
    },
    {
      id: "unit_tests_passed",
      desc: true,
    },
    {
      id: "last_deploy",
      desc: true,
    },
  ],
};

const InsightsLookupPipelinesTable = ({ pipelines, componentName, startDate,endDate }) => {
  const toastContext = useContext(DialogToastContext);

  const onRowSelect = (row) => {
    toastContext.showOverlayPanel(
        <InsightsLookupPipelineOverlay componentName={componentName} pipeline={row?.original?.pipeline} startDate={startDate} endDate={endDate}/>,
    );
  };

  const columns = useMemo(
      () => [
        getTableTextColumn(getField(fields, "pipeline") ,"force-text-wrap"),
        getTableTextColumn(getField(fields, "deployments")),
        getTableTextColumn(getField(fields, "validations_passed")),
        getTableTextColumn(getField(fields, "validations_failed")),
        getTableTextColumn(getField(fields, "unit_tests_passed")),
        getTableTextColumn(getField(fields, "unit_tests_failed")),
        getTableTextColumn(getField(fields, "last_deploy")),
      ],
      [],
  );

  const getTable = () => {
    return (
      <MakeupTableBase
        columns={columns}
        data={pipelines}
        initialState={initialState}
        onRowSelect={onRowSelect}
      />
    );
  };

  return (
    <FilterContainer
      showBorder={false}
      body={getTable()}
      titleIcon={faBug}
      title={`${componentName}: Pipelines`}
    />
  );
};

InsightsLookupPipelinesTable.propTypes = {
  pipelines: PropTypes.array,
  componentName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default InsightsLookupPipelinesTable;