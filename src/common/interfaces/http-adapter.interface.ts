export interface HttpAdapter {
  get<T>(url): Promise<T>;
}
