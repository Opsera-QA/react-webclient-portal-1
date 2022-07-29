import React, {useContext} from "react";
import PropTypes from "prop-types";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import IconBase from "components/common/icons/IconBase";
import {DialogToastContext} from "contexts/DialogToastContext";
import { faFilter } from "@fortawesome/pro-light-svg-icons";
import GitCustodianFiltersMultiSelectOverlay from "./GitCustodianFiltersMultiSelectOverlay";

function EditGitCustodianFiltersIcon({ gitCustodianFilterModel, setGitCustodianFilterModel, loadData, className, options }) {

  const toastContext = useContext(DialogToastContext);

  const updateGitCustodianFilters = async (newDataModel) => {
    setGitCustodianFilterModel({...newDataModel});
    await loadData(newDataModel);
  };

  const showEditor = () => {
    toastContext.showOverlayPanel(
      <GitCustodianFiltersMultiSelectOverlay
        filterModel={gitCustodianFilterModel}
        setFilterModel={setGitCustodianFilterModel}
        saveDataFunction={updateGitCustodianFilters}
        showModal={true}
      />
    );
  };

  return (
    <div className={className}>
      <TooltipWrapper innerText={"Edit Git Custodian Filters"}>
        <IconBase
          onClickFunction={() => {showEditor();}}
          icon={faFilter}
          className={"pointer"}
        />
      </TooltipWrapper>
    </div>
  );
}

EditGitCustodianFiltersIcon.propTypes = {
  gitCustodianFilterModel: PropTypes.object,
  setGitCustodianFilterModel: PropTypes.func,
  loadData: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array,
};

export default EditGitCustodianFiltersIcon;
