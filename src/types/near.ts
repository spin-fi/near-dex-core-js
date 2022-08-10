/**
 * @category spin
 */
export interface CoreNear {
  view: (contractId: string, methodName: string, args?: unknown) => Promise<any>;
  balance: (accountId: string) => Promise<{
    total: string;
    stateStaked: string;
    staked: string;
    available: string;
  }>;
}
