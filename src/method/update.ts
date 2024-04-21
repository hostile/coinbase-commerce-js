export interface UpdateMethod {
  update(): Promise<this>;
}