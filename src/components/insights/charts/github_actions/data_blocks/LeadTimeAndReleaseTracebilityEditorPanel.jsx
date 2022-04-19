import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {leadTimeAndReleaseTraceabilityMetadata} from "./leadTimeAndReleaseTracebility.metadata";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {amexFiltersMetadata} from "components/insights/dashboards/amex-filters-metadata.js";
import chartsActions from "components/insights/charts/charts-actions";
function LeadTimeAndReleaseTracebilityEditorPanel(
  {
    metricModel,
    unpackedFilterData,
    metricFilterModel,
    setMetricFilterModel,
  }) {

  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [applicationOptions, setApplicationOptions] = useState([]);
  const [directorOptions, setDirectorOptions] = useState([]);
  const [vp1Options, setVP1Options] = useState([]);
  const [vp2Options, setVP2Options] = useState([]);
  const [svpOptions, setSVPOptions] = useState([]);
  const [actionOptions, setActionOptions] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const isMounted = useRef(false);
  const [amexFiltersDto, setAmexFiltersDto] = useState(
    new Model({ ...amexFiltersMetadata.newObjectFields }, amexFiltersMetadata, false)
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

  useEffect(() => {
    setMetricFilterModel(undefined);

    if (unpackedFilterData) {
      let newUnpackedFilterData = unpackedFilterData;
      newUnpackedFilterData.amexFilters = amexFiltersDto?.data;
      setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, leadTimeAndReleaseTraceabilityMetadata));
    }

  }, [unpackedFilterData, amexFiltersDto]);

  const getFilters = async (cancelSource = cancelTokenSource) => {
    setAmexFiltersDto(new Model(metricModel.getData("filters")[metricModel.getData("filters").findIndex((obj) => obj.type === "amexFilters")]?.value, amexFiltersMetadata, false));
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

  if (metricFilterModel == null) {
    return null;
  }

  return (
    <div>
      <MetricTagFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
      />
      <MetricDateRangeFilterInput
        metricModel={metricModel}
        metricFilterModel={metricFilterModel}
        setMetricFilterModel={setMetricFilterModel}
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
  );
}

LeadTimeAndReleaseTracebilityEditorPanel.propTypes = {
  metricModel: PropTypes.object,
  unpackedFilterData: PropTypes.object,
  metricFilterModel: PropTypes.object,
  setMetricFilterModel: PropTypes.func,
};

export default LeadTimeAndReleaseTracebilityEditorPanel;
