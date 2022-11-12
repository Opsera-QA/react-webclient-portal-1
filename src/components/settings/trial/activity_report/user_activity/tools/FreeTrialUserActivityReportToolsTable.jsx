import React from "react";
import PropTypes from "prop-types";
import FilterContainer, {
} from "components/common/table/FilterContainer";
import { faTools } from "@fortawesome/pro-light-svg-icons";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import FreeTrialWorkspaceRegistryViews from "components/workspace/trial/views/tool/FreeTrialWorkspaceRegistryViews";

export default function FreeTrialUserActivityReportToolsTable(
  {
    tools,
    userData,
    loadData,
    isLoading,
  }) {
  const getTable = () => {
    return (
      <FreeTrialWorkspaceRegistryViews
        isLoading={isLoading}
        loadData={loadData}
        tools={tools}
      />
    );
  };

  const getTableTitle = () => {
    const user = DataParsingHelper.parseObject(userData);

    if (user) {
      return `${userData?.firstName} ${userData?.lastName} (${userData?.email}) Free Trial User Tools`;
    }

    return "Free Trial User Tools";
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      body={getTable()}
      titleIcon={faTools}
      title={getTableTitle()}
      className={"mt-2"}
    />
  );
}

FreeTrialUserActivityReportToolsTable.propTypes = {
  tools: PropTypes.array,
  isLoading: PropTypes.bool,
  loadData: PropTypes.func,
  userData: PropTypes.object,
};
