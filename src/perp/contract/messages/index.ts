export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:perp:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:perp:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:perp:${methodName}]: "contractId" not provided`;
};
