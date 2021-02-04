import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../workflows.css";
import PipelineItem from "./PipelineItem";
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
import LdapOwnerFilter from "components/common/filters/pipelines/LdapOwnerFilter";
import Model from "core/data_model/model";
import TagFilter from "components/common/filters/tags/TagFilter";
import DtoTopPagination from "components/common/pagination/DtoTopPagination";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import FilterBar from "components/common/filters/FilterBar";

function PipelinesView({ currentTab, setActiveTab }) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pipelineFilterDto, setPipelineFilterDto] = useState(undefined);

  // Executed every time currentTab changes
  useEffect(() => {
    getCookie();
  }, [currentTab]);

  const getCookie = async () => {
    setLoading(true);
    let newPipelineFilterDto = new Model({ ...pipelineFilterMetadata.newObjectFields }, pipelineFilterMetadata, false);
    try {
      let storedSortOption = cookieHelpers.getCookie("pipelines-v2", "sortOption");
      let storedPageSize = cookieHelpers.getCookie("pipelines-v2", "pageSize");
      let storedViewType = cookieHelpers.getCookie("pipelines-v2", "viewType");

      if (storedSortOption != null) {
        newPipelineFilterDto.setData("sortOption", JSON.parse(storedSortOption));
      }

      if (storedPageSize != null) {
        newPipelineFilterDto.setData("pageSize", JSON.parse(storedPageSize));
      }

      if (storedViewType != null) {
        newPipelineFilterDto.setData("viewType", JSON.parse(storedViewType));
      }
    } catch (error) {
      cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterDto.getData("sortOption")));
      cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterDto.getData("pageSize")));
      cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterDto.getData("viewType")));
      console.error("Error loading cookie. Setting to default");
      console.error(error);
    } finally {
      await loadData(newPipelineFilterDto);
    }
  };

  const saveCookies = (newPipelineFilterDto) => {
    cookieHelpers.setCookie("pipelines-v2", "sortOption", JSON.stringify(newPipelineFilterDto.getData("sortOption")));
    cookieHelpers.setCookie("pipelines-v2", "pageSize", JSON.stringify(newPipelineFilterDto.getData("pageSize")));
    cookieHelpers.setCookie("pipelines-v2", "viewType", JSON.stringify(newPipelineFilterDto.getData("viewType")));
  };

  const loadData = async (newPipelineFilterDto = pipelineFilterDto) => {
    setLoading(true);

    try {
      setData(undefined);
      saveCookies(newPipelineFilterDto);

      const response = await pipelineActions.getPipelines(newPipelineFilterDto, currentTab, getAccessToken);
      setData(response?.data);

      let newFilterDto = newPipelineFilterDto;
      newFilterDto.setData("totalCount", response.data.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
      setPipelineFilterDto({ ...newFilterDto });
    } catch (error) {
      console.error(error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoading(false);
    }
  };

  const getDynamicFilter = () => {
    if (currentTab !== "owner") {
      return (<LdapOwnerFilter filterDto={pipelineFilterDto} setFilterDto={setPipelineFilterDto}/>);
    }
  };

  const getFilterBar = () => {
    return (
      <FilterBar
        loadData={loadData}
        filterDto={pipelineFilterDto}
        setFilterDto={setPipelineFilterDto}
        filters={["status", "type", "search"]}
        saveCookies={saveCookies}
        supportViewToggle={true}
        addRecordFunction={addPipeline}
        supportSearch={true}
      >
        <TagFilter filterDto={pipelineFilterDto} setFilterDto={setPipelineFilterDto}/>
        {getDynamicFilter()}
      </FilterBar>
    );
  };

  const addPipeline = () => {
    setActiveTab("catalog");
  };

  const getView = () => {
    if (pipelineFilterDto.getData("viewType") === "list") {
      return (showList());
    }

    return (
      <div className="px-3">
        <div>
          <DtoTopPagination
            loadData={loadData}
            isLoading={loading}
            paginationDto={pipelineFilterDto}
            setPaginationDto={setPipelineFilterDto}
          />
        </div>
        {showCards()}
        <div>
          <DtoBottomPagination
            loadData={loadData}
            isLoading={loading}
            paginationDto={pipelineFilterDto}
            setPaginationDto={setPipelineFilterDto}
          />
        </div>
      </div>
    );
  };

  const showCards = () => {
    return (
      <Row>
        {data.response.map((item, idx) => (
          <Col key={idx} xl={6} md={12} className="p-2">
            <PipelineItem item={item}/>
          </Col>
        ))}
      </Row>
    );
  };

  const showList = () => {
    return (
      <div className="p-2">
        <PipelinesTable
          isLoading={loading}
          paginationModel={pipelineFilterDto}
          setPaginationModel={setPipelineFilterDto}
          data={data.response}
        />
      </div>
    );
  };

  const getPipelinesBody = () => {
    if (data && data.count === 0) {
      const activeFilters = pipelineFilterDto.getActiveFilters();
      if (activeFilters && activeFilters.length > 0) {
        return (
          <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
            <div className="my-5"><InfoDialog message="No pipelines meeting the filter requirements were found."/></div>
          </div>
        )
      }

      return (
        <div className="px-2 max-content-width" style={{ minWidth: "505px" }}>
          <div className="my-5"><InfoDialog message="No pipelines are available for this view at this time."/></div>
        </div>
      );
    }

    return (getView());
  };

  if (loading) {
    return (<LoadingDialog size="md" message="Loading..."/>);
  }

  if (data && data.count === 0 && currentTab === "owner") {
    const activeFilters = pipelineFilterDto.getActiveFilters();
    if (activeFilters && activeFilters.length > 0) {
      return (
        <div className="px-2 max-content-width mx-auto" style={{ minWidth: "505px" }}>
          <div className="my-5"><InfoDialog message="No pipelines meeting the filter requirements were found."/></div>
        </div>
      )
    }

    return (<><PipelineWelcomeView setActiveTab={setActiveTab}/></>);
  }

  if (!data && !loading) {
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
      <div>
        <div className="mb-2">
          {getFilterBar()}
        </div>
        <div>
          {getPipelinesBody()}
        </div>
      </div>
    </div>
  );
}

PipelinesView.propTypes = {
  currentTab: PropTypes.string,
  setActiveTab: PropTypes.func,
};

export default PipelinesView;
