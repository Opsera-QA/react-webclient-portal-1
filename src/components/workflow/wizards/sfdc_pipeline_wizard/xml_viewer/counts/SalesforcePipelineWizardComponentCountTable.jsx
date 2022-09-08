import React, { useMemo }  from 'react';
import PropTypes from "prop-types";
import {
  getTableTextColumn
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import VanityTable from "components/common/table/VanityTable";
import {getField} from "components/common/metadata/metadata-helpers";
import {faTally} from "@fortawesome/pro-light-svg-icons";

const SalesforcePipelineWizardComponentCountTable = ({ loadData, componentCounts, isLoading }) => {
  const fields = sfdcTableConstants.fields;

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "componentType")),
      getTableTextColumn(getField(fields, "componentCount")),
    ],
    [],
  );

  const getComponentCountsTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={componentCounts}
        isLoading={isLoading}
        loadData={loadData}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Component Counts"}
      titleIcon={faTally}
      body={getComponentCountsTable()}
      showBorder={false}
    />
  );
};

SalesforcePipelineWizardComponentCountTable.propTypes = {
  isLoading: PropTypes.bool,
  componentCounts: PropTypes.arrayOf(PropTypes.object),
  loadData: PropTypes.func,
};

export default SalesforcePipelineWizardComponentCountTable;