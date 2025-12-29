export type Result<T> =
    | {
          success: true
          data: T
      }
    | {
          success: false
          errors: Array<{ path: string; message: string }>
      }

export type Action<I, O> = (input: I) => Promise<Result<O>>
