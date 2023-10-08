// @ts-nocheck
import styled from 'styled-components';

export default styled.div`
  width: 100%;
  display: flex;
  align-items: ${(props) =>
    props['align-items'] ? props['align-items'] : 'center'};
  justify-content: ${(props) =>
    props['justify-content'] ? props['justify-content'] : 'center'};
`;
