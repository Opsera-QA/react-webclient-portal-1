import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import toolFilterMetadata from "components/inventory/tools/tool-filter-metadata";
import LimitedFieldsTable from "components/reports/users/user/LimitedFieldsTable";
import InformationDialog from "components/common/status_notifications/info";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import toolsActions from "components/inventory/tools/tools-actions";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import {faTools} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import toolMetadata from "components/inventory/tools/tool-metadata";
import accountsActions from "components/admin/accounts/accounts-actions";
import ToolCardView from "components/inventory/tools/ToolCardView";

function ConsolidatedUserReportToolOwnershipTable({ selectedUser }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({ ...toolFilterMetadata.newObjectFields }, toolFilterMetadata, false));
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

    let newFilterDto = toolFilterDto;
    newFilterDto.resetData();
    setToolFilterDto(newFilterDto);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [selectedUser]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);

      if (isMounted?.current === true && selectedUser){
        const userId = await getUserId();
        const owner = {
          value: userId, 
          text: `${selectedUser?.name} (${selectedUser.emailAddress})`
        };

        if (owner?.value) {
          let newToolFilterDto = toolFilterDto;
          newToolFilterDto.setData("viewType", "list");
          newToolFilterDto.setData("owner", owner);
          newToolFilterDto.setData("pageSize", 25);
          setToolFilterDto(newToolFilterDto);

          const response = await toolsActions.getRoleLimitedToolRegistryListV2(getAccessToken, cancelSource, toolFilterDto);

          if (Array.isArray(response?.data?.data)) {
            setTools(response.data.data);

            let newFilterDto = toolFilterDto;
            newFilterDto.setData("totalCount", response.data.count);
            newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      
            setToolFilterDto({...newFilterDto});
          }
        }
    }
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        console.log(error.error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getUserId = async () => {
    const response = await accountsActions.getAccountUsers(getAccessToken);
    const users = response?.data;
    
    if (!users) {
      return undefined;
    }

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.email === selectedUser.emailAddress) {
        return user._id;
      }
    }
  };

  const getView = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading tasks..."/>);
    }

    if (toolFilterDto?.getData("viewType") === "list") {
      return (showList());
    }

    return (
      <ToolCardView
        isLoading={isLoading}
        loadData={loadData}
        data={tools}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
      />
    );
  };

  const showList = () => {
    return (
      <LimitedFieldsTable
        isLoading={isLoading}
        paginationModel={toolFilterDto}
        setPaginationModel={setToolFilterDto}
        data={tools}
        loadData={loadData}
        type={"tool"}
      />
    );
  };

  const getToolsBody = () => {
    if (tools && tools.length === 0 && !isLoading) {
      const activeFilters = toolFilterDto?.getActiveFilters();
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

  if (!tools && !isLoading || !Array.isArray(tools)) {
    return (
      <div className="px-2 max-content-width" >
        <div className="my-5">
          <InformationDialog message="Could not load tools."/>
        </div>
      </div>
    );
  }

  if (!selectedUser) {
    return null;
  }

  return (
      <FilterContainer
        style={{minWidth: "505px"}}
        loadData={loadData}
        filterDto={toolFilterDto}
        setFilterDto={setToolFilterDto}
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

ConsolidatedUserReportToolOwnershipTable.propTypes = {
  selectedUser: PropTypes.object,
};

export default ConsolidatedUserReportToolOwnershipTable;
