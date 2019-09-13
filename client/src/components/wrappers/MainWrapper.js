import styled from "styled-components";

import style from "../../config/style";

const MainWrapper = styled.div`
  font-family: ${style.font};
  margin: 0 auto;
  padding: 15px;
  min-height: calc(100vh - 120px);
  @media screen and (min-width: 768px) {
    width: 750px;
  }
  @media screen and (min-width: 992px) {
    width: 970px;
  }
  @media screen and (min-width: 1200px) {
    width: 1170px;
  }
`;

export default MainWrapper;
