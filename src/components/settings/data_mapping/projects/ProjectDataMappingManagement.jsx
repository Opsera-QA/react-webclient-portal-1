import React, { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import axios from "axios";
import ProjectDataMappingsTable from "components/settings/data_mapping/projects/ProjectDataMappingsTable";
import {projectDataMappingActions} from "components/settings/data_mapping/projects/projectDataMapping.actions";
import Model from "../../../../core/data_model/model";
import tagFilterMetadata from "components/settings/tags/tag-filter-metadata";

function ProjectDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [projectDataMappingMetadata, setProjectDataMappingMetadata] = useState(undefined);
  const [projectDataMappings, setProjectDataMappings] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [toolListModel, setToolListModel] = useState(undefined);
  const authContext = useContext(AuthContext);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({...tagFilterMetadata.newObjectFields}, tagFilterMetadata, false));
  const [projectDataMappingModel, setProjectDataMappingModel] = useState(undefined);

  console.log("chapman tagfilter", toolFilterDto);
  console.log("chapman setfilter", setToolFilterDto);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getProjectDataMappings(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const getProjectDataMappings = async (cancelSource = cancelTokenSource, filterDto = toolFilterDto) => {
    try {
      const response = await projectDataMappingActions.getProjectDataMappingsV2(getAccessToken, cancelSource);
      const mappings = response?.data?.data;

      if (isMounted?.current === true && Array.isArray(mappings)) {
        setProjectDataMappingMetadata({...response?.data?.metadata});
        setProjectDataMappings(mappings);
        filterDto.setData("activeFilters", filterDto?.getActiveFilters());
        setToolFilterDto({...filterDto});
      }
    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
  };

  console.log("vampire tagfilter", toolFilterDto);
  console.log("vampire setfilter", setToolFilterDto);

  return (
    <div className={"mt-2"}>
      <ProjectDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        projectDataMappings={projectDataMappings}
        isMounted={isMounted}
        projectDataMappingMetadata={projectDataMappingMetadata}
        toolFilterDto={toolFilterDto}
        setToolFilterDto={setToolFilterDto}
      />
    </div>
  );
}

export default ProjectDataMappingManagement;
