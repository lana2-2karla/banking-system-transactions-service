interface IResponseError {
  status: number,
  json: {
    title: string,
    message: string,
  }
}

export default IResponseError;