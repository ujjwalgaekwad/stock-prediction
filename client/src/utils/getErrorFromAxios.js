const getErrorFromAxios = (err) => {
  if (err !== null && typeof err === "object" && "response" in err) {
    const axiosError = err;

    if (axiosError.response !== undefined && "data" in axiosError.response) {
      const responseData = axiosError.response.data
      return responseData.message;
    }
  }
};

export default getErrorFromAxios;
