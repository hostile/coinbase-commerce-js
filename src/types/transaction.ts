export enum TransactionState {
  New = 'NEW',
  Signed = 'SIGNED',
  Confirming = 'PENDING',
  Completed = 'COMPLETED'
}

export type TimelineElement = {
  status: TransactionState,
  time: string
};
