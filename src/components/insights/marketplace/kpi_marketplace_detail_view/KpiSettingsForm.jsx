import React, { useState, useContext }  from "react";
import PropTypes from "prop-types";
import { AuthContext } from "contexts/AuthContext";
import EditorPanelContainer from "../../../common/panels/detail_panel_container/EditorPanelContainer";
import DtoTextInput from "../../../common/input/dto_input/dto-text-input";
import DateRangeInput from "../../../common/input/DateRangeInput";
import DtoTagManagerFilterInput from "../../../common/input/dto_input/dto-tag-manager-filter-input";
import LenientSaveButton from "../../../common/buttons/saving/LenientSaveButton";
import CancelButton from "../../../common/buttons/CancelButton";
import kpiConfigurationMetadata from "../kpi-configuration-metadata";
import {kpiDateFilterMetadata, kpiTagsFilterMetadata} from "../kpi-configuration-metadata";
import Model from "../../../../core/data_model/model";
import dashboardsActions from "../../dashboards/dashboards-actions";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";


function KpiSettingsForm({kpiConfiguration, dashboardData, index, setView}) {
    const { getAccessToken } = useContext(AuthContext);
    const [kpiSettings, setKpiSettings] = useState(new Model(kpiConfiguration, kpiConfigurationMetadata, false));
    const [kpiDateFilter, setKpiDateFilter] = useState(new Model(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "date")], kpiDateFilterMetadata, false))
    const [kpiTagsFilter, setKpiTagsFilter] = useState(new Model(kpiConfiguration.filters[kpiConfiguration.filters.findIndex((obj) => obj.type === "tags")], kpiTagsFilterMetadata, false))

    const getKpiFilters = (filter) => {
        switch (filter.type) {
            case "date":
                return (
                    <div>
                        <DateRangeInput dataObject={kpiDateFilter} setDataObject={setKpiDateFilter} fieldName={"value"} />
                    </div>
                );
            case "tags":
                return (
                    <div>
                        <DtoTagManagerFilterInput type={"kpi_filter"} fieldName={"value"} setDataObject={setKpiTagsFilter} dataObject={kpiTagsFilter} disabled={true}/>
                    </div>
                );
        }
    }
      
    const saveKpiSettings = async () => {
        let newKpiSettings = kpiSettings;
        if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")]) {
            newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "date")].value = kpiDateFilter.getData("value");
        }
        if (newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")]) {
            newKpiSettings.getData("filters")[newKpiSettings.getData("filters").findIndex((obj) => obj.type === "tags")].value = kpiTagsFilter.getData("value");
        }
        setKpiSettings({ ...newKpiSettings });
        dashboardData.getData("configuration")[index] = kpiSettings.data;
        setView("chart");
        return await dashboardsActions.update(dashboardData, getAccessToken);
    }

    const cancelKpiSettings = async () => {
        setKpiSettings(dashboardData.getData("configuration")[index]);
        setView("chart");
    }

    const deleteKpi = async () => {
        dashboardData.getData("configuration").splice(index, 1);
        setView("chart");
        return await dashboardsActions.update(dashboardData, getAccessToken);
    }
    
    return (
        <EditorPanelContainer isLoading={false} showRequiredFieldsMessage={false}>
        <DtoTextInput fieldName={"kpi_name"} dataObject={kpiSettings} setDataObject={setKpiSettings}/>
        {kpiSettings.getData("filters").map((filter, index) => 
            <div className="form-group m-2" key={index}> 
            {getKpiFilters(filter)}  
            </div>
        )}
        <SaveButtonContainer>
        <ActionBarDeleteButton2
              relocationPath={`/insights/dashboards/${dashboardData.getData("_id")}`}
              dataObject={dashboardData}
              handleDelete={deleteKpi}
            />
        <LenientSaveButton
            recordDto={kpiSettings}
            updateRecord={saveKpiSettings}
        />
        <CancelButton
            size="md"
            cancelFunction={cancelKpiSettings}/>
        </SaveButtonContainer>
        </EditorPanelContainer>
        )
}

KpiSettingsForm.propTypes = {
    kpiConfiguration: PropTypes.object,
    dashboardData: PropTypes.object,
    index: PropTypes.number,
    setView: PropTypes.func
}

export default KpiSettingsForm;

