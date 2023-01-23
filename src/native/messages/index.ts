export const nearErrorMessage = (methodName: string) => {
  return `[core:native:${methodName}]: "near" not provided`;
};

export const selectorErrorMessage = (methodName: string) => {
  return `[core:native:${methodName}]: "selector" not provided`;
};

export const contractIdErrorMessage = (methodName: string) => {
  return `[core:native:${methodName}]: "contractId" not provided`;
};

export const providerErrorMessage = (methodName: string) => {
  return `[core:native:${methodName}]: "provider" not provided`;
};

export const accountIdErrorMessage = (methodName: string) => {
  return `[core:native:${methodName}]: "accountId" not provided`;
};
