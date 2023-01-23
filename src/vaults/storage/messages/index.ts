export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:storage:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:storage:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:storage:${methodName}]: "contractId" not provided`;
};
