import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import InfoDialog from "components/common/status_notifications/info";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
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

function ConsolidatedUserToolAccessReport({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolFilterModel, setToolFilterModel] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
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

    let newFilterModel = new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false);
    loadData(newFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const loadData = async (newFilterModel = toolFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser) {
        let newToolFilterDto = newFilterModel;
        newToolFilterDto.setData("pageSize", 25);
        setToolFilterModel(newToolFilterDto);

        const response = await toolsActions.getToolAccessWithEmail(getAccessToken, cancelSource, toolFilterModel, selectedUser?.emailAddress);
        const tools = response?.data?.data;

        console.log("tools[0]: " + JSON.stringify(tools[0]));

        if (Array.isArray(tools)) {
          setTools(tools);

          let newFilterDto = toolFilterModel;
          newFilterDto.setData("totalCount", response?.data?.count);
          newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
          setToolFilterModel({...newFilterDto});
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

  const getView = () => {
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

  const getToolsBody = () => {
    if (tools && tools.length === 0 && !isLoading) {
      const activeFilters = toolFilterModel?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" >
            <div className="my-5"><InfoDialog message="No tools meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" >
          <div className="my-5"><InfoDialog message="No tools are available for this view at this time."/></div>
        </div>
      );
    }

    return (getView());
  };

  if (!selectedUser) {
    return null;
  }

  return (
    <FilterContainer
      style={{minWidth: "505px"}}
      loadData={loadData}
      filterDto={toolFilterModel}
      setFilterDto={setToolFilterModel}
      supportSearch={true}
      supportViewToggle={true}
      isLoading={isLoading}
      metadata={toolMetadata}
      type={"Tools"}
      body={getToolsBody()}
      titleIcon={faTools}
      title={"Tools"}
    />
  );
}

ConsolidatedUserToolAccessReport.propTypes = {
  selectedUser: PropTypes.object,
};

export default ConsolidatedUserToolAccessReport;
