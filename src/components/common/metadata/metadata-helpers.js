export function getField(fields, fieldName) {
  return fields.find(field => { return field.id === fieldName});
}