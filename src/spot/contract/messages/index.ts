export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:spot:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:spot:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:spot:${methodName}]: "contractId" not provided`;
};
