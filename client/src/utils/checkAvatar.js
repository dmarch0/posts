import axios from "axios";

const checkAvatar = async avatar => {
  try {
    console.log("checking");
    const response = await axios.get(`${avatar}`);
    return true;
  } catch (error) {
    console.log("catched");
    return false;
  }
};

export default checkAvatar;
