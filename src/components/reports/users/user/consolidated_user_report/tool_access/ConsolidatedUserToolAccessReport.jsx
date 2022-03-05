import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import toolMetadata from "components/inventory/tools/tool-metadata";
import ConsolidatedUserReportToolAccessTable
  from "components/reports/users/user/consolidated_user_report/tool_access/ConsolidatedUserReportToolAccessTable";
import genericFilterMetadata from "components/common/filters/generic-filter-metadata";

function ConsolidatedUserToolAccessReport({ userEmailAddress }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolFilterModel, setToolFilterModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setTools([]);

    let newFilterModel = new Model({ ...genericFilterMetadata.newObjectFields }, genericFilterMetadata, false);
    loadData(newFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [userEmailAddress]);

  const loadData = async (newFilterModel = toolFilterModel, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true && userEmailAddress) {
        setIsLoading(true);
        const response = await toolsActions.getToolAccessWithEmail(getAccessToken, cancelSource, newFilterModel, userEmailAddress);
        const tools = response?.data?.data;

        if (Array.isArray(tools)) {
          setTools(tools);
          newFilterModel.setData("totalCount", response?.data?.count);
          newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
          setToolFilterModel({...newFilterModel});
        }
      }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getToolAccessTable = () => {
    return (
      <ConsolidatedUserReportToolAccessTable
        isLoading={isLoading}
        paginationModel={toolFilterModel}
        setPaginationModel={setToolFilterModel}
        data={tools}
        loadData={loadData}
      />
    );
  };

  if (!userEmailAddress) {
    return null;
  }

  return (
    <FilterContainer
      style={{minWidth: "505px"}}
      loadData={loadData}
      filterDto={toolFilterModel}
      setFilterDto={setToolFilterModel}
      supportSearch={true}
      isLoading={isLoading}
      metadata={toolMetadata}
      type={"Tools"}
      body={getToolAccessTable()}
      titleIcon={faTools}
      title={"Tools"}
    />
  );
}

ConsolidatedUserToolAccessReport.propTypes = {
  userEmailAddress: PropTypes.string,
};

export default ConsolidatedUserToolAccessReport;
