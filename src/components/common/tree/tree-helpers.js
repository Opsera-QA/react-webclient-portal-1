export function getBaseTreeItem(id, label, children = [], fontAwesomeIconClassName = "fa-book") {
  return (
    {
      id: id,
      items: children,
      value: label,
      icon: {
        folder: `fal ${fontAwesomeIconClassName} opsera-primary`,
        openFolder: `fal ${fontAwesomeIconClassName} opsera-yellow`,
        file: `fal ${fontAwesomeIconClassName} opsera-primary`,
      }
    }
  );
}