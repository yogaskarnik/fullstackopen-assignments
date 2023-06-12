import axios from "axios";

const basURL = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(basURL);
  return request.then((response) => response.data);
};

export default { getAll };
