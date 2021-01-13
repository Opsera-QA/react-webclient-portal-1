import React from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import RequiredFieldsMessage from "components/common/fields/editor/RequiredFieldsMessage";
import LoadingDialog from "components/common/status_notifications/loading";

function EditorPanelContainer({ children, isLoading, showRequiredFieldsMessage }) {
  const getRequiredFieldsMessage = () => {
    if (showRequiredFieldsMessage) {
      return (<RequiredFieldsMessage />);
    }
  }

  if (isLoading) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <Form className="scroll-y h-100">
      <div className="p-3">
        <div>{children}</div>
        {getRequiredFieldsMessage()}
      </div>
    </Form>
  );
}


EditorPanelContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
  showRequiredFieldsMessage: PropTypes.bool
};

EditorPanelContainer.defaultProps = {
  showRequiredFieldsMessage: true
}

export default EditorPanelContainer;