import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import {DialogToastContext} from "contexts/DialogToastContext";
import CancelButton from "components/common/buttons/CancelButton";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faCalendarAlt, faSave} from "@fortawesome/pro-light-svg-icons";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import LenientSaveButton from "components/common/buttons/saving/LenientSaveButton";
import {dashboardFiltersMetadata} from "components/insights/dashboards/dashboard-metadata.js";
import DateRangeInput from "../../../date/DateRangeInput";
import ConfirmationOverlay from "../../../../overlays/center/ConfirmationOverlay";
import IconBase from "../../../../icons/IconBase";
import {Button} from "react-bootstrap";

function FiltersDateSelectOverlay({showModal, dataModel, saveDataFunction, type}) {
  const toastContext = useContext(DialogToastContext);
  const [temporaryDataObject, setTemporaryDataObject] = useState(undefined);
  const [showEditDateConfirmModal, setShowEditDateConfirmModal] = useState(false);
  const [dashboardFiltersDto, setDashboardFiltersDto] = useState(
    new Model({ ...dashboardFiltersMetadata.newObjectFields }, dashboardFiltersMetadata, false)
  );

  useEffect(() => {
    toastContext.removeInlineMessage();
    let temporaryDashboardFilters = {
      date: dataModel.getData("filters")[dataModel.getData("filters").findIndex((obj) => obj.type === "date")]?.value
    };
    setDashboardFiltersDto(new Model(temporaryDashboardFilters, dashboardFiltersMetadata, false));
    setTemporaryDataObject(new Model({...dataModel?.getPersistData()}, dataModel?.getMetaData(), false));
  }, [showModal]);


  const handleSave = async () => {
    const response = await saveDataFunction(dashboardFiltersDto);
    setShowEditDateConfirmModal(false);
    closePanel();
    return response;
  };
  
  const getFiltersInput = () => {
    return (
      <div>
        <DateRangeInput
          fieldName={'date'}
          setDataObject={setDashboardFiltersDto}
          dataObject={dashboardFiltersDto}
        />
      </div>
    );
  };

  const getConfirmButtonContainer = () => {
    return (
        <div className={"p-3 bg-white"}>
          <SaveButtonContainer>
            <LenientSaveButton
              recordDto={temporaryDataObject}
              updateRecord={handleSave}
              customLabel={"Yes"}
              className={"mr-2"}
            />
            <CancelButton
              cancelFunction={()=> { setShowEditDateConfirmModal(false); } }
              size={"md"}
              buttonText={"No"}
            />
          </SaveButtonContainer>
        </div>
    );
  };

  const getButtonContainer = () => {
    return (
      <div className={"p-3 bg-white"}>
        <SaveButtonContainer>
          <Button
            className={"mr-2"}
            variant ="primary"
            onClick={()=> { setShowEditDateConfirmModal(true); } }
          >
            <span><IconBase icon={faSave} fixedWidth className="mr-2"/>Save</span>
          </Button>
          <CancelButton
            cancelFunction={closePanel}
            size={"md"}
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

  const showEditDateWarning = () => {
    if(!showEditDateConfirmModal) {
      return null;
    }
    return (
      <ConfirmationOverlay
        closePanel={() => setShowEditDateConfirmModal(false)}
        buttonContainer={getConfirmButtonContainer()}
        titleText={`Confirm Update date in all KPIs`}
        titleIcon={faCalendarAlt}
        height={"100px"}
      >
        <div className={"m-2"}>
          <div className={"d-flex"}>
            <div className={"d-flex"}>
              <div className={"my-auto"}>
                <IconBase icon={faCalendarAlt} iconSize={"2x"} />
              </div>
            </div>
            <div className={"flex-fill ml-4"}>
              <div>
                <div>Warning! This would update all the date range in all KPIs in this Dashboard</div>
                <div>Do you still want to proceed?</div>
              </div>
            </div>
          </div>
        </div>
      </ConfirmationOverlay>
    );
  };

  return (
    <>
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faCalendarAlt}
      titleText={`Update All KPI Date Filters`}
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
      {showEditDateWarning()}
    </>
  );
}

FiltersDateSelectOverlay.propTypes = {
  showModal: PropTypes.bool,
  saveDataFunction: PropTypes.func,
  dataModel: PropTypes.object,
  type: PropTypes.string,
  user: PropTypes.object
};

export default FiltersDateSelectOverlay;


