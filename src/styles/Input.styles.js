import styled from 'styled-components';

export const Input = styled.input`
  background-color: ${props => props.value ? props.theme.mediumGray : (props.gray ? props.theme.mediumGray : props.theme.blueHover)};
  border-radius: 3px;
  border: none;
  box-shadow: none;
  box-sizing: border-box;
  color: ${props => props.theme.primaryFont};
  float: left;
  font-size: 13px;
  height: 32px;
  line-height: 19px;
  margin: 0;
  outline: none;
  padding-left: 8px;
  padding-right: 30px;
  transition: width 0.15s;
  width: 100%;
  cursor: pointer;
  
  ::-webkit-input-placeholder { 
    color: ${props => props.darkFont ? props.theme.primaryFont : 'white'};
  }

  :-ms-input-placeholder {
    color: ${props => props.darkFont ? props.theme.primaryFont : 'white'};
  }

  ::placeholder {
    color: ${props => props.darkFont ? props.theme.primaryFont : 'white'};
  }

  &:focus {
    cursor: unset;
    background-color:  ${props => props.theme.focusGray};
    color: ${props => props.theme.primaryFont};
    ::-webkit-input-placeholder { 
      color: ${props => props.theme.lightFont};;
    }

    :-ms-input-placeholder {
      color: ${props => props.theme.lightFont};;
    }

    ::placeholder {
      color: ${props => props.theme.lightFont};;
    }
  }

`;
export const InputContainer = styled.div`
  position: relative;
  width: ${props => props.width || '80%'};
`;

export const IconWrapper = styled.span`
  position: absolute;
  right: 7px;
  top: 7px;
`;
