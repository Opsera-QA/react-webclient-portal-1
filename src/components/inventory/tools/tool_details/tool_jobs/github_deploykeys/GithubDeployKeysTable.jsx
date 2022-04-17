import React, {useContext, useMemo} from "react";
import PropTypes from "prop-types";
import githubDeployKeyMetadata from "./github-deploykeys-metadata";
import {getField} from "components/common/metadata/metadata-helpers";
import FilterContainer from "components/common/table/FilterContainer";
import {faBrowser} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import GithubDeployKeyOverlay
  from "components/inventory/tools/tool_details/tool_jobs/github_deploykeys/GithubDeployKeyOverlay";
import {getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import VanityTable from "components/common/table/VanityTable";

function GithubDeployKeysTable({ toolData, githubDeployKeys, loadData, onRowSelect, isLoading }) {
  const toastContext = useContext(DialogToastContext);
  let fields = githubDeployKeyMetadata.fields;

  const createDeployKey = () => {
    toastContext.showOverlayPanel(<GithubDeployKeyOverlay toolData={toolData} loadData={loadData} />);
  };

  const columns = useMemo(
    () => [
      getTableTextColumn(getField(fields, "name")),
      getTableTextColumn(getField(fields, "sshUrl")),
    ],
    []
  );

  const getTable = () => {
    return (
      <VanityTable
        columns={columns}
        data={githubDeployKeys}
        onRowSelect={onRowSelect}
        isLoading={isLoading}
      />
    );
  };

  return (
    <FilterContainer
      loadData={loadData}
      isLoading={isLoading}
      title={"Github Deploy Keys"}
      type={"Github Deploy Key"}
      titleIcon={faBrowser}
      addRecordFunction={toolData?.data?.configuration ? createDeployKey : undefined}
      body={getTable()}
      showBorder={false}
    />
  );
}

GithubDeployKeysTable.propTypes = {
  toolData: PropTypes.object,
  loadData: PropTypes.func,
  onRowSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  githubDeployKeys: PropTypes.array
};

export default GithubDeployKeysTable;
