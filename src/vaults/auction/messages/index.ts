export const nearErrorMessage = (methodName: string) => {
  return `[core:contract:auction:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:contract:auction:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:contract:auction:${methodName}]: "contractId" not provided`;
};
