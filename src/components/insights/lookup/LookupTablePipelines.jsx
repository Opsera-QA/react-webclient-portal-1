import React, {useMemo} from 'react';
import PropTypes from 'prop-types';

import {getField} from "components/common/metadata/metadata-helpers";
import {getTableTextColumn} from "components/common/table/table-column-helpers";
import MakeupTableBase from 'components/common/table/makeup/MakeupTableBase';

const LookupTablePipelines = ({
  data
}) => {

  const fields = [
    {
      label: "Pipeline",
      id: "pipeline"
    },
    {
      label: "Deploy Count",
      id: "deploy_count",
    },
    {
      label: "Validations Passed",
      id: "validations_passed",
    },
    {
      label: "Failed",
      id: "validations_failed",
    },
    {
      label: "Unit Tests Passed",
      id: "unit_tests_passed",
    },
    {
      label: "Failed",
      id: "unit_tests_failed",
    },
    {
      label: "Deployed",
      id: "last_deploy"
    }
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
      }
    ],
  };
  
  const columns = useMemo(() => [
    getTableTextColumn(getField(fields, "pipeline"), "no-wrap-inline"),
    getTableTextColumn(getField(fields, "deploy_count")),
    getTableTextColumn(getField(fields, "validations_passed")),
    getTableTextColumn(getField(fields, "validations_failed")),
    getTableTextColumn(getField(fields, "unit_tests_passed")),
    getTableTextColumn(getField(fields, "unit_tests_failed")),
    getTableTextColumn(getField(fields, "last_deploy")),
  ], []);

  return (
    <MakeupTableBase
      columns={columns}
      data={data}
      initialState={initialState}
    />
  );
};

LookupTablePipelines.propTypes = {
  data: PropTypes.array
};

export default LookupTablePipelines;
