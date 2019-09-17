import axios from "axios";

const checkAvatar = async avatar => {
  try {
    const response = await axios.get(`${avatar}`);
    return true;
  } catch (error) {
    return false;
  }
};

export default checkAvatar;
