import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import chartsActions from "../../charts/charts-actions";
import { GitCustodianFilterMetadata } from "components/insights/gitCustodian/table/gitCustodianFilter.metadata";
import useComponentStateReference from "hooks/useComponentStateReference";
import modelHelpers from "components/common/model/modelHelpers";
import GitCustodianVulnerableCommitsTable
  from "components/insights/gitCustodian/table/GitCustodianVulnerableCommitsTable";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function GitCustodianVulnerableCommits({ gitCustodianData, gitCustodianFilterModel, setGitCustodianFilterModel }) {
  const [isLoading, setIsLoading] = useState(false);
  const [vulnerableCommits, setVulnerableCommits] = useState([]);
  const [tableFilterModel, setTableFilterModel] = useState(modelHelpers.parseObjectIntoModel(undefined, GitCustodianFilterMetadata));
  const {
    cancelTokenSource,
    isMounted,
    getAccessToken,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, [gitCustodianData]);

  const loadData = async (filterModel = tableFilterModel) => {
    try {
      setVulnerableCommits([]);
      setIsLoading(true);
      // TODO: This API should be sending back the data like this and not nested so deep
      //  {
      //    data: [],
      //    count: []
      //  }
      const response = await chartsActions.getGitCustodianTableData(
        getAccessToken,
        cancelTokenSource,
        gitCustodianFilterModel,
        tableFilterModel
      );
      const count = response?.data?.data?.count;
      const vulnerableCommits = response?.data?.data?.data;

      if (isMounted?.current === true && Array.isArray(vulnerableCommits)) {
        setVulnerableCommits(vulnerableCommits);
        filterModel.setData("totalCount", count);
        filterModel.setData("activeFilters", filterModel?.getActiveFilters());
        setTableFilterModel({...filterModel});
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };
  return (
    <GitCustodianVulnerableCommitsTable
      isLoading={isLoading}
      gitCustodianData={gitCustodianData}
      loadData={loadData}
      vulnerableCommits={vulnerableCommits}
      tableFilterModel={tableFilterModel}
      setTableFilterModel={setTableFilterModel}
    />
  );
}

GitCustodianVulnerableCommits.propTypes = {
  gitCustodianData: PropTypes.object,
  gitCustodianFilterModel: PropTypes.object,
  setGitCustodianFilterModel: PropTypes.func
};

export default GitCustodianVulnerableCommits;