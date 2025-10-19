interface IMobileError {
  status: number,
  json: {
    title: string,
    message: string,
  }
}

export default IMobileError;