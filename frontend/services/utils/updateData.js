const updateData = async (axiosInsatance, url , body) => {
    let error = null;
    let response = null;
    try {
      error = null;
      const { data } = await axiosInsatance.put(url , body);
      response = data;
    } catch (e) {
      error = {message : e.message , statsCode : e.response?.status};
    }
  
    return [response, error];
  };
  
  export default updateData;