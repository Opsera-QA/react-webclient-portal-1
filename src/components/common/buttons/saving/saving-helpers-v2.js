// This needs to be tested
export async function persistNewRecordAndViewDetails(
  model,
  toastContext,
  showSuccessToasts,
  history,
  isIncomplete,
) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    true,
    isIncomplete,
  );

  if (response?.data != null && model.getDetailViewLink != null && history != null) {
    const newModel = model.getNewInstance(response?.data);
    const link = newModel.getDetailViewLink();

    toastContext.clearOverlayPanel();
    if (link != null) {
      history.push(link);
    }
  }

  return response;
}

export async function persistNewRecordAndClose(
  model,
  toastContext,
  showSuccessToasts,
  handleClose,
  isIncomplete,
) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    true,
    isIncomplete,
  );

  if (response != null && response !== false && handleClose) {
    toastContext.clearOverlayPanel();
    handleClose();
  }

  return response;
}

export async function persistNewRecordAndAddAnother(
  model,
  toastContext,
  showSuccessToasts,
  setModel,
  isIncomplete,
) {
  const response = await persistNewRecord(
    model,
    toastContext,
    showSuccessToasts,
    true,
      isIncomplete
    );

  if (response != null && response !== false && setModel) {
    let newModel = model.getNewInstance();
    await setModel({ ...newModel });
  }
}

export async function persistNewRecord(
  model,
  toastContext,
  showSuccessToasts,
  showErrorToastsInline = true,
  isIncomplete,
  ) {
  try {
    let isModelValid = model.isModelValid();
    if (!isModelValid && !model.isLenient()) {
      let errors = model.getErrors();
      console.error(JSON.stringify(errors));

      if (showErrorToastsInline) {
        toastContext.showInlineFormValidationError(errors && errors.length > 0 ? errors[0] : undefined);
      } else {
        toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      }
      return false;
    }

    let response = await model.createModel();

    if (showSuccessToasts) {
      if (isIncomplete === true || (model.isLenient() === true && !isModelValid)) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(model.getType());
      } else {
        toastContext.showCreateSuccessResultDialog(model.getType());
      }
    }
    return response;
  } catch (error) {
    console.error(error);

    if (showErrorToastsInline) {
      toastContext.showInlineCreateFailureResultDialog(model.getType(), error);
    } else {
      toastContext.showCreateFailureResultDialog(model.getType(), error);
    }

    return false;
  }
}

export async function persistUpdatedRecord(model, toastContext, showSuccessToasts = true, isIncomplete) {
  try {
    let isModelValid = model.isModelValid();
    if (!isModelValid && !model.isLenient()) {
      let errors = model.getErrors();
      console.error(JSON.stringify(errors));
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await model.saveModel();

    if (showSuccessToasts) {
      if (isIncomplete === true || (model.isLenient() === true && !isModelValid)) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(model.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(model.getType());
      }
    }
    model.clearChangeMap();
    return response;
  } catch (error) {
    console.error(error);
    toastContext.showUpdateFailureResultDialog(model.getType(), error);
    return false;
  }
}
