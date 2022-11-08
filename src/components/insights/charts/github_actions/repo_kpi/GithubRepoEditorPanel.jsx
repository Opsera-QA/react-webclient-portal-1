import React, {useEffect, useState, useRef, useContext} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import MetricTagFilterInput from "components/common/inputs/metric/filters/tags/MetricTagFilterInput";
import MetricDateRangeFilterInput from "components/common/inputs/metric/filters/date/MetricDateRangeFilterInput";
import modelHelpers from "components/common/model/modelHelpers";
import {githubActionsWorkflowMetadata} from "components/insights/charts/github_actions/workflows/githubActionsWorkflow.metadata";
import MultiSelectInputBase from "components/common/inputs/multi_select/MultiSelectInputBase";
import {hierarchyFiltersMetadata} from "components/insights/dashboards/hierarchy-filters-metadata.js";
import chartsActions from "components/insights/charts/charts-actions";
function GithubRepoEditorPanel(
    {
        metricModel,
        unpackedFilterData,
        metricFilterModel,
        setMetricFilterModel,
    }) {

    const { getAccessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [filter1Options, setFilter1Options] = useState([]);
    const [filter2Options, setFilter2Options] = useState([]);
    const [filter3Options, setFilter3Options] = useState([]);
    const [filter4Options, setFilter4Options] = useState([]);
    const [filter5Options, setFilter5Options] = useState([]);
    const [filter6Options, setFilter6Options] = useState([]);
    const [filter7Options, setFilter7Options] = useState([]);
    const [filter8Options, setFilter8Options] = useState([]);
    const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
    const isMounted = useRef(false);
    const [hierarchyFiltersDto, setHierarchyFiltersDto] = useState(
        new Model({ ...hierarchyFiltersMetadata.newObjectFields }, hierarchyFiltersMetadata, false)
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
            newUnpackedFilterData.hierarchyFilters = hierarchyFiltersDto?.data;
            setMetricFilterModel(modelHelpers.parseObjectIntoModel(unpackedFilterData, githubActionsWorkflowMetadata));
        }

    }, [unpackedFilterData, hierarchyFiltersDto]);

    const getFilters = async (cancelSource = cancelTokenSource) => {
        setHierarchyFiltersDto(new Model(metricModel.getData("filters")[metricModel.getData("filters").findIndex((obj) => obj.type === "hierarchyFilters")]?.value, hierarchyFiltersMetadata, false));
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
            setFilter7Options(filters["Repository"]);
            setFilter8Options(filters["Branch"]);
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
            {/* <MultiSelectInputBase
        dataObject={hierarchyFiltersDto}
        setDataObject={setHierarchyFiltersDto}
        fieldName={"filter6"}
        selectOptions={filter6Options}
      /> */}
            <MultiSelectInputBase
                dataObject={hierarchyFiltersDto}
                setDataObject={setHierarchyFiltersDto}
                fieldName={"filter7"}
                selectOptions={filter7Options}
            />
            <MultiSelectInputBase
                dataObject={hierarchyFiltersDto}
                setDataObject={setHierarchyFiltersDto}
                fieldName={"filter8"}
                selectOptions={filter8Options}
            />
        </div>
    );
}

GithubRepoEditorPanel.propTypes = {
    metricModel: PropTypes.object,
    unpackedFilterData: PropTypes.object,
    metricFilterModel: PropTypes.object,
    setMetricFilterModel: PropTypes.func,
};

export default GithubRepoEditorPanel;
