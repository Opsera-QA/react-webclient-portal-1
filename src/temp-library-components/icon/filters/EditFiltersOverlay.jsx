import React from "react";
import PropTypes from "prop-types";
import CancelButton from "components/common/buttons/CancelButton";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import {faFilter} from "@fortawesome/pro-light-svg-icons/faFilter";
import useComponentStateReference from "hooks/useComponentStateReference";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import StackedFilterRemovalIcon from "components/common/icons/StackedFilterRemovalIcon";
import Model from "core/data_model/model";

export default function EditFiltersOverlay(
  {
    filterModel,
    loadDataFunction,
    filters,
  }) {
  const {
    toastContext,
    isFreeTrial,
  } = useComponentStateReference();

  const resetFilters = () => {
    const sortOption = filterModel?.getData("sortOption");
    const pageSize = filterModel?.getData("pageSize");

    if (filterModel?.getNewInstance) {
      filterModel = filterModel.getNewInstance();
    } else {
      filterModel = new Model({...filterModel.getNewObjectFields()}, filterModel.getMetaData(), false);
    }

    if (sortOption) {
      filterModel.setData("pageSize", pageSize);
    }

    if (pageSize) {
      filterModel.setData("sortOption", sortOption);
    }

    if (loadDataFunction) {
      loadDataFunction(filterModel);
    }
    
    closePanel();
  };

  const loadFilters = async () => {
    filterModel?.setData("currentPage", 1);
    loadDataFunction(filterModel);
    closePanel();
  };

  const getButtonContainer = () => {
    return (
      <div className={"p-3 bg-white"}>
        <ButtonContainerBase>
          <div className="d-flex">
            <div className={"ml-2"}>
              <Button variant={isFreeTrial === true ? "secondary" : "primary"} onClick={() => loadFilters()} className={"w-100"}>
                <span><IconBase icon={faFilter} className={"mr-2"}/>Filter</span>
              </Button>
            </div>
            <div className={"ml-2"}>
              <Button 
                variant={"outline-secondary"}
                onClick={() => resetFilters()}
                className={"w-100"}
                disabled={filterModel?.getData("activeFilters").length === 0}
              >
                <div className={"d-flex no-wrap-inline"}>
                  <span className="mr-2"><StackedFilterRemovalIcon/></span>
                  Remove Filters
                </div>
              </Button>
            </div>
          </div>
          <CancelButton
            cancelFunction={closePanel}
            size={"md"}
            className={"ml-2"}
          />
        </ButtonContainerBase>
      </div>
    );
  };

  const closePanel = () => {
    toastContext.removeInlineMessage();
    toastContext.clearOverlayPanel();
  };

  if (filters == null || filterModel == null || loadDataFunction == null) {
    return null;
  }

  return (
    <CenterOverlayContainer
      closePanel={closePanel}
      titleIcon={faFilter}
      titleText={`Edit Filters`}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-3"}>
        {filters}
      </div>
    </CenterOverlayContainer>
  );
}


EditFiltersOverlay.propTypes = {
  loadDataFunction: PropTypes.func,
  filterModel: PropTypes.object,
  filters: PropTypes.any,
};
