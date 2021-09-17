export function getBaseTreeItem(id, label, children = []) {
  return (
    {
      id: id,
      items: children,
      value: label,
      icon: {
        "folder": "fal fa-tasks opsera-primary",
        "openFolder": "fal fa-tasks opsera-yellow",
        "file": "fal fa-tasks opsera-primary"
      }
    }
  );
}