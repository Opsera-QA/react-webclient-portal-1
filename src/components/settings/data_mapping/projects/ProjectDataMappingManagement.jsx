import React, {useState, useEffect, useContext, useRef} from "react";
import {DialogToastContext} from "contexts/DialogToastContext";
import ProjectDataMappingsTable from "components/settings/data_mapping/projects/ProjectDataMappingsTable";
import Model from "../../../../core/data_model/model";
import projectMappingMetadata from "components/settings/data_mapping/projects/projectDataMappingFilter.metadata.js";
import useAnalyticsProjectDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/projects/useAnalyticsProjectDataMappingActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function ProjectDataMappingManagement() {
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [projectDataMappings, setProjectDataMappings] = useState([]);
  const isMounted = useRef(false);
  const [projectDataMappingFilterModel, setProjectDataMappingFilterModel] = useState(new Model({...projectMappingMetadata.newObjectFields}, projectMappingMetadata, false));
  const analyticsProjectDataMappingActions = useAnalyticsProjectDataMappingActions();

  useEffect(() => {
    isMounted.current = true;

    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getProjectDataMappings();
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getProjectDataMappings = async (filterDto = projectDataMappingFilterModel) => {
    const response = await analyticsProjectDataMappingActions.getProjectDataMappings(filterDto);
    const mappings = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && Array.isArray(mappings)) {
      setProjectDataMappings(mappings);
      filterDto.setData("activeFilters", filterDto?.getActiveFilters());
      setProjectDataMappingFilterModel({...filterDto});
    }
  };


  return (
    <div className={"mt-2"}>
      <ProjectDataMappingsTable
        loadData={loadData}
        isLoading={isLoading}
        projectDataMappings={projectDataMappings}
        isMounted={isMounted}
        toolFilterDto={projectDataMappingFilterModel}
        setToolFilterDto={setProjectDataMappingFilterModel}
      />
    </div>
  );
}

export default ProjectDataMappingManagement;