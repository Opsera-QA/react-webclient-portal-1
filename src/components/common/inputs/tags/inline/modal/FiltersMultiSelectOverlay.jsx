import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faFilter} from "@fortawesome/pro-light-svg-icons/faFilter";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import chartsActions from "components/insights/charts/charts-actions";
import {hierarchyFiltersMetadata} from "components/insights/dashboards/hierarchy-filters-metadata.js";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata.js";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";

function FiltersMultiSelectOverlay({showModal, dataObject, fieldName, saveDataFunction, type}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);
  const [filtersOptions, setFiltersOptions] = useState([]);
  const [filter1Options, setFilter1Options] = useState([]);
  const [filter2Options, setFilter2Options] = useState([]);
  const [filter3Options, setFilter3Options] = useState([]);
  const [filter4Options, setFilter4Options] = useState([]);
  const [filter5Options, setFilter5Options] = useState([]);
  const [filter6Options, setFilter6Options] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [hierarchyFiltersDto, setHierarchyFiltersDto] = useState(
    new Model({ ...hierarchyFiltersMetadata.newObjectFields }, hierarchyFiltersMetadata, false)
  );
  const [dashboardFiltersDto, setDashboardFiltersDto] = useState(
    new Model({ ...dashboardFiltersMetadata.newObjectFields }, dashboardFiltersMetadata, false)
  );
  const featureFlaggedOrgs = ["org-128"];
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

  useEffect(() => {
    toastContext.removeInlineMessage();
    let temporaryDashboardFilters = {
      tags:  dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "tags")]?.value,
      organizations: dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "organizations")]?.value,
      hierarchyFilters: dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "hierarchyFilters")]?.value,
      date: dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "date")]?.value
    };
    setHierarchyFiltersDto(new Model(dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "hierarchyFilters")]?.value, hierarchyFiltersMetadata, false));
    setDashboardFiltersDto(new Model(temporaryDashboardFilters, dashboardFiltersMetadata, false));
    setTemporaryDataObject(new Model({...dataObject?.getPersistData()}, dataObject?.getMetaData(), false));
  }, [showModal]);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getFilters(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        setErrorMessage("Could not load filters.");
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getFilters = async (cancelSource = cancelTokenSource) => {
    const response = await chartsActions.parseConfigurationAndGetChartMetrics(getAccessToken, cancelSource, "getAllActionsFilterOptions");
    let filters = response?.data?.data[0];
    filters = filters.reduce((acc, cur) => {
      acc[cur["type"]] = [...acc[cur["type"]] || [], cur.value];
      return acc;
    }, {});
    if (isMounted?.current === true) {
      setFilter1Options(filters["SVP"]);
      setFilter2Options(filters["VP2"]);
      setFilter3Options(filters["VP1"]);
      setFilter4Options(filters["Director"]);
      setFilter5Options(filters["Application"]);
      setFilter6Options(filters["Action"]);
    }
  };

  const handleSave = async () => {
    dashboardFiltersDto.setData("hierarchyFilters", hierarchyFiltersDto?.data);
    const response = await saveDataFunction(dashboardFiltersDto);
    closePanel();
    return response;
  };
  
  const getFiltersInput = () => {
    return (
      <div>
      <OrganizationMultiSelectInput
        dataObject={dashboardFiltersDto}
        setDataObject={setDashboardFiltersDto}
        fieldName={"organizations"}
      />
      <TagMultiSelectInput
        dataObject={dashboardFiltersDto}
        setDataObject={setDashboardFiltersDto}
        fieldName={"tags"}
      />
     <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter1"}
        selectOptions={filter1Options}
      />
      <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter2"}
        selectOptions={filter2Options}
      />
      <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter3"}
        selectOptions={filter3Options}
      />
      <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter4"}
        selectOptions={filter4Options}
      />
      <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter5"}
        selectOptions={filter5Options}
      />
      <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter6"}
        selectOptions={filter6Options}
      />
      </div>
    );
  };

  const getButtonContainer = () => {
    return (
      <div className={"p-3 bg-white"}>
        <SaveButtonContainer>
          <CancelButton
            cancelFunction={closePanel}
            size={"md"}
            className={"mr-2"}
          />
          <LenientSaveButton
            recordDto={temporaryDataObject}
            updateRecord={handleSave}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (temporaryDataObject == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faFilter}
      titleText={`Edit Filters`}
      showCloseButton={false}
      showPanel={true}
      buttonContainer={getButtonContainer()}
    >
      <div className="m-3">
        {toastContext.getInlineBanner()}
        <div className="p-3">
          {getFiltersInput()}
        </div>
      </div>
    </CenterOverlayContainer>
  );
}

FiltersMultiSelectOverlay.propTypes = {
  showModal: PropTypes.bool,
  saveDataFunction: PropTypes.func,
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  type: PropTypes.string,
  user: PropTypes.object
};

export default FiltersMultiSelectOverlay;


