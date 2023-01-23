export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:oft:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:oft:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:oft:${methodName}]: "contractId" not provided`;
};
