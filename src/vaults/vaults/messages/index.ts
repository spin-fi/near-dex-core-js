export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:vaults:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:vaults:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:vaults:${methodName}]: "contractId" not provided`;
};
