import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import axios from "axios";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faFilter} from "@fortawesome/pro-light-svg-icons/faTags";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import chartsActions from "components/insights/charts/charts-actions";
import {amexFiltersMetadata} from "components/insights/dashboards/amex-filters-metadata.js";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata.js";
import TagMultiSelectInput from "components/common/list_of_values_input/settings/tags/TagMultiSelectInput";
import OrganizationMultiSelectInput from "components/common/list_of_values_input/settings/organizations/OrganizationMultiSelectInput";
import modelHelpers from "components/common/model/modelHelpers";
function FiltersMultiSelectOverlay({showModal, dataObject, fieldName, saveDataFunction, type}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);
  const [filtersOptions, setFiltersOptions] = useState([]);
  const [applicationOptions, setApplicationOptions] = useState([]);
  const [directorOptions, setDirectorOptions] = useState([]);
  const [vp1Options, setVP1Options] = useState([]);
  const [vp2Options, setVP2Options] = useState([]);
  const [svpOptions, setSVPOptions] = useState([]);
  const [actionOptions, setActionOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState("");
  const [amexFiltersDto, setAmexFiltersDto] = useState(
    new Model({ ...amexFiltersMetadata.newObjectFields }, amexFiltersMetadata, false)
  );
  const [dashboardFiltersDto, setDashboardFiltersDto] = useState(
    new Model({ ...dashboardFiltersMetadata.newObjectFields }, dashboardFiltersMetadata, false)
  );
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
      amexFilters: dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "amexFilters")]?.value,
      date: dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "date")]?.value
    };
    setAmexFiltersDto(new Model(dataObject.getData("filters")[dataObject.getData("filters").findIndex((obj) => obj.type === "amexFilters")]?.value, amexFiltersMetadata, false));
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
      setApplicationOptions(filters["Application"]);
      setDirectorOptions(filters["Director"]);
      setVP1Options(filters["VP1"]);
      setVP2Options(filters["VP2"]);
      setSVPOptions(filters["SVP"]);
      setActionOptions(filters["Action"]);
    }
  };

  const handleSave = async () => {
    dashboardFiltersDto.setData("amexFilters", amexFiltersDto?.data);
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
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"svp"}
        selectOptions={svpOptions}
      />
      <MultiSelectInputBase
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"vp2"}
        selectOptions={vp2Options}
      />
      <MultiSelectInputBase
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"vp1"}
        selectOptions={vp1Options}
      />
      <MultiSelectInputBase
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"director"}
        selectOptions={directorOptions}
      />
      <MultiSelectInputBase
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"application"}
        selectOptions={applicationOptions}
      />
      <MultiSelectInputBase
        dataObject={amexFiltersDto}
        setDataObject={setAmexFiltersDto}
        fieldName={"action"}
        selectOptions={actionOptions}
      />
      </div>
    // <div>
    //   {type === "SVP" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"svp"}
    //     selectOptions={svpOptions}
    //   />}
    //   {type === "VP2" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"vp2"}
    //     selectOptions={vp2Options}
    //   />}
    //   {type === "VP1" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"vp1"}
    //     selectOptions={vp1Options}
    //   />}
    //   {type === "Director" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"director"}
    //     selectOptions={directorOptions}
    //   />}
    //   {type === "Application" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"application"}
    //     selectOptions={applicationOptions}
    //   />}
    //   {type === "Action" && <MultiSelectInputBase
    //     dataObject={amexFiltersDto}
    //     setDataObject={setAmexFiltersDto}
    //     fieldName={"action"}
    //     selectOptions={actionOptions}
    //   />}
    //   </div>
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
  type: PropTypes.string
};

export default FiltersMultiSelectOverlay;


