import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "../../status_notifications/loading";
import Form from "react-bootstrap/Form";
import PipelineStepConfigurationButtonContainer
  from "../../buttons/saving/containers/PipelineStepConfigurationButtonContainer";
import DeleteButton from "components/common/buttons/delete/DeleteButton";
import ResetButton from "components/common/buttons/reset/ResetButton";
import DashboardMetricButtonContainer
  from "components/common/panels/detail_panel_container/dashboard_metrics/DashboardMetricButtonContainer";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";

// TODO: After final refactor of pipeline configurations, this component might be irrelevant
function DashboardMetricEditorPanelContainer(
  {
    children,
    isLoading,
    showRequiredFieldsMessage,
    closePanelFunction,
    dashboardModel,
    setKpis,
    handleClose,
    isStrict,
    disableSaveButton,
    showIncompleteDataMessage,
    className,
  }) {
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage !== false) {
      return (
        <div>
          <small className="form-text text-muted text-right mr-2 mt-3"><span className="danger-red">*</span> Required Fields</small>
        </div>
      );
    }
  };

  // TODO: Make separate component
  // const getButtonContainer = () => {
  //   return (
  //     <div className={"d-flex"}>
  //       <DeleteButton
  //         dataObject={metricModel}
  //         deleteRecord={() => setShowDeleteConfirmationPanel(true)}
  //         size={"md"}
  //       />
  //       <ResetButton
  //         className={"ml-2"}
  //         model={metricModel}
  //         resetFunction={() => setShowResetConfirmationPanel(true)}
  //       />
  //     </div>
  //   );
  // };

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <div className={className}>
      <div>{children}</div>
      <DashboardMetricButtonContainer
        dashboardModel={dashboardModel}
        setKpis={setKpis}
        closePanelFunction={closePanelFunction}
      />
      <RequiredFieldsMessage />
    </div>
  );
}


DashboardMetricEditorPanelContainer.propTypes = {
  dashboardModel: PropTypes.object,
  setKpis: PropTypes.func,
  closePanelFunction: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool,
  persistRecord: PropTypes.func,
  handleClose: PropTypes.func,
  isStrict: PropTypes.bool,
  disableSaveButton: PropTypes.bool,
  showIncompleteDataMessage: PropTypes.bool,
  className: PropTypes.string,
};

export default DashboardMetricEditorPanelContainer;