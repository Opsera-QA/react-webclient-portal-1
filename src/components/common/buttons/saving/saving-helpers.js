import Model from "core/data_model/model";

export async function persistNewRecordAndViewDetails(recordDto, toastContext, showSuccessToasts, createRecord, lenient, history) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && recordDto.getDetailViewLink != null && history != null) {
    let updatedDto = new Model(response?.data, recordDto.getMetaData(), false);
    let link = updatedDto.getDetailViewLink();

    toastContext.clearOverlayPanel();
    if (link != null) {
      history.push(link);
    }
  }

  return response;
}

export async function persistNewRecordAndClose(recordDto, toastContext, showSuccessToasts, createRecord, lenient, handleClose) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && handleClose) {
    toastContext.clearOverlayPanel();
    handleClose();
  }

  return response;
}

export async function persistNewRecordAndAddAnother(recordDto, toastContext, showSuccessToasts, createRecord, lenient, setRecordDto) {
  let response = await persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, true);

  if (response != null && response !== false && setRecordDto) {
    let newModel = new Model({...recordDto.getNewObjectFields()}, recordDto.getMetaData(), true);
    await setRecordDto(newModel);
  }
}

export async function persistNewRecord(recordDto, toastContext, showSuccessToasts, createRecord, lenient, showErrorToastsInline = true) {
  try {
    let isModelValid = recordDto.isModelValid();
    if (!isModelValid && !lenient) {
      let errors = recordDto.getErrors();
      console.error(JSON.stringify(errors));

      if (showErrorToastsInline) {
        toastContext.showInlineFormValidationError(errors && errors.length > 0 ? errors[0] : undefined);
      }
      else {
        toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      }
      return false;
    }

    let response = await createRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(recordDto.getType());
      } else {
        toastContext.showCreateSuccessResultDialog(recordDto.getType());
      }
    }
    return response;
  } catch (error) {
    console.error(error);

    if (showErrorToastsInline) {
      toastContext.showInlineCreateFailureResultDialog(recordDto.getType(), error);
    }
    else {
      toastContext.showCreateFailureResultDialog(recordDto.getType(), error);
    }

    return false;
  }
}

export async function persistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient, showIncompleteDataMessage) {
  try {
    let isModelValid = recordDto.isModelValid();
    if(!isModelValid && !lenient) {
      let errors = recordDto.getErrors();
      console.error(JSON.stringify(errors));
      toastContext.showFormValidationErrorDialog(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await updateRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid && showIncompleteDataMessage !== false) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(recordDto.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(recordDto.getType());
      }
    }
    recordDto.clearChangeMap();
    return response;
  }
  catch (error) {
    console.error(error);
    toastContext.showUpdateFailureResultDialog(recordDto.getType(), error);
  }
}

export async function modalPersistUpdatedRecord(recordDto, toastContext, showSuccessToasts, updateRecord, lenient, handleClose) {
  try {
    let isModelValid = recordDto.isModelValid();
    if(!isModelValid && !lenient) {
      let errors = recordDto.getErrors();
      console.error(JSON.stringify(errors));
      toastContext.showInlineFormValidationError(errors && errors.length > 0 ? errors[0] : undefined);
      return false;
    }

    let response = await updateRecord();

    if (showSuccessToasts) {
      if (lenient && !isModelValid) {
        toastContext.showSavingIncompleteObjectSuccessResultToast(recordDto.getType());
      } else {
        toastContext.showUpdateSuccessResultDialog(recordDto.getType());
      }
    }
    recordDto.clearChangeMap();
    handleClose();
    return response;
  }
  catch (error) {
    console.error(error);
    toastContext.showInlineUpdateFailureMessage(recordDto.getType(), error);
  }
}

