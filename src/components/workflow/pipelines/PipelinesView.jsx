import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import InfoDialog from "components/common/status_notifications/info";
import PipelineWelcomeView from "./PipelineWelcomeView";
import pipelineFilterMetadata from "./pipeline_details/workflow/pipeline-filter-metadata";
import PipelinesTable from "./pipeline_details/PipelinesTable";
import InformationDialog from "components/common/status_notifications/info";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import cookieHelpers from "core/cookies/cookie-helpers";
import pipelineActions from "components/workflow/pipeline-actions";
import LdapOwnerFilter from "components/common/filters/ldap/owner/LdapOwnerFilter";
import Model from "core/data_model/model";
import TagFilter from "components/common/filters/tags/tag/TagFilter";
import PipelineCardView from "components/workflow/pipelines/PipelineCardView";
import FilterContainer from "components/common/table/FilterContainer";
import {faDraftingCompass} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import pipelineSummaryMetadata
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/pipeline-summary-metadata";

function PipelinesView({ currentTab, setActiveTab }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pipelineFilterDto, setPipelineFilterDto] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    getCookie(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [currentTab]);


  const getCookie = async (cancelSource = cancelTokenSource) => {
    setIsLoading(true);
    let newPipelineFilterDto = new Model({ ...pipelineFilterMetadata.newObjectFields }, pipelineFilterMetadata, false);
    try {
      let storedSortOption = cookieHelpers.getCookie("pipelines-v2", "sortOption");
      let storedPageSize = cookieHelpers.getCookie("pipelines-v2", "pageSize");
      let storedViewType = cookieHelpers.getCookie("pipelines-v2", "viewType");

      if (isMounted?.current === true && storedSortOption != null) {
        newPipelineFilterDto.setData("sortOption", JSON.parse(storedSortOption));
      }

      if (isMounted?.current === true && storedPageSize != null) {
        newPipelineFilterDto.setData("pageSize", JSON.parse(storedPageSize));
      }

      if (isMounted?.current === true && storedViewType != null) {
        newPipelineFilterDto.setData("viewType", JSON.parse(storedViewType));
      }
    } catch (error) {
      if (isMounted?.current === true) {
        cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterDto.getData("sortOption")));
        cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterDto.getData("pageSize")));
        cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterDto.getData("viewType")));
        console.error("Error loading cookie. Setting to default");
        console.error(error);
      }
    } finally {
      if (isMounted?.current === true) {
        await loadData(newPipelineFilterDto, cancelSource);
      }
    }
  };

  const saveCookies = (newPipelineFilterDto) => {
    cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterDto.getData("sortOption")));
    cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterDto.getData("pageSize")));
    cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterDto.getData("viewType")));
  };

  const loadData = async (newPipelineFilterDto = pipelineFilterDto, cancelSource = cancelTokenSource) => {
    try {
      if (isMounted?.current === true) {
        setIsLoading(true);
        setData([]);
        saveCookies(newPipelineFilterDto);
      }

      const response = await pipelineActions.getPipelinesV2(getAccessToken, cancelSource, newPipelineFilterDto, currentTab);

      if (isMounted?.current === true && response?.data) {
        setData(response?.data);
        let newFilterDto = newPipelineFilterDto;
        newFilterDto.setData("totalCount", response.data.count);
        newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setPipelineFilterDto({...newFilterDto});
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

  const getDynamicFilter = () => {
    if (currentTab !== "owner") {
      return (<LdapOwnerFilter filterDto={pipelineFilterDto} setFilterDto={setPipelineFilterDto} className={"mt-2"}/>);
    }
  };

  const getDropdownFilters = () => {
    return (
      <>
        <TagFilter filterDto={pipelineFilterDto} setFilterDto={setPipelineFilterDto}/>
        {getDynamicFilter()}
      </>
    );
  };

  const addPipeline = () => {
    setActiveTab("catalog");
  };

  const getView = () => {
    if (isLoading) {
      return (<LoadingDialog size="md" message="Loading pipelines..."/>);
    }

    if (pipelineFilterDto?.getData("viewType") === "list") {
      return (showList());
    }

    return (
      <PipelineCardView
        isLoading={isLoading}
        loadData={loadData}
        data={data?.response}
        pipelineFilterDto={pipelineFilterDto}
        setPipelineFilterDto={setPipelineFilterDto}
      />
    );
  };

  const showList = () => {
    return (
        <PipelinesTable
          isLoading={isLoading}
          paginationModel={pipelineFilterDto}
          setPaginationModel={setPipelineFilterDto}
          data={data?.response}
          loadData={loadData}
        />
    );
  };

  const getPipelinesBody = () => {
    if (data && data.count === 0) {
      const activeFilters = pipelineFilterDto?.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
            <div className="my-5"><InfoDialog message="No pipelines meeting the filter requirements were found."/></div>
          </div>
        );
      }

      return (
        <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
          <div className="my-5"><InfoDialog message="No pipelines are available for this view at this time."/></div>
        </div>
      );
    }

    return (getView());
  };

  if (data && data.count === 0 && currentTab === "owner" && (pipelineFilterDto?.getActiveFilters() == null || pipelineFilterDto?.getActiveFilters()?.length === 0) ) {
    return (<><PipelineWelcomeView setActiveTab={setActiveTab}/></>);
  }

  if (!data && !isLoading) {
    return (
      <div className="px-2 max-content-width" style={{minWidth: "505px"}}>
        <div className="my-5">
          <InformationDialog message="Could not load pipelines."/>
        </div>
      </div>
    );
  }

  return (
    <div style={{minWidth: "505px"}}>
      <FilterContainer
        loadData={loadData}
        filterDto={pipelineFilterDto}
        setFilterDto={setPipelineFilterDto}
        addRecordFunction={addPipeline}
        supportSearch={true}
        saveCookies={saveCookies}
        supportViewToggle={true}
        isLoading={isLoading}
        metadata={pipelineSummaryMetadata}
        type={"Pipeline"}
        body={getPipelinesBody()}
        dropdownFilters={getDropdownFilters()}
        titleIcon={faDraftingCompass}
        title={"Pipelines"}
      />
    </div>
  );
}

PipelinesView.propTypes = {
  currentTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default PipelinesView;
