import styled from "styled-components";

const MainWrapper = styled.div`
  font-family: sans-serif;
  margin: 0 auto;
  padding: 0 15px;
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
