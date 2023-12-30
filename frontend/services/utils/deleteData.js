const deleteData = async (axiosInsatance, url) => {
    let error = null;
    let response = null;
    try {
      error = null;
      const { data } = await axiosInsatance.delete(url);
      response = data;
    } catch (e) {
      error = {message : e.message , statsCode : e.response?.status};
    }
  
    return [response, error];
  };
  
  export default deleteData;