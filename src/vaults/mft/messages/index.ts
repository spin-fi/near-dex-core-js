export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:mft:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:mft:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:mft:${methodName}]: "contractId" not provided`;
};
