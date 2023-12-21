const postData = async (axiosInsatance, url) => {
    let error = null;
    let response = null;
    try {
      error = null;
      const { data } = await axiosInsatance.post(url,body);
      response = data;
    } catch (e) {
      error = {message : e.message , statsCode : e.response?.status | 400};
    }
  
    return [response, error];
  };
  
  export default postData;