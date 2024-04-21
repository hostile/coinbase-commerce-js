export interface ListMethod {
  list(): Promise<this[]>;
}