import styled from 'styled-components/native';

export const ContainerInput = styled.View`
  width: 100%;
  padding: 5px 15px 15px 15px;
`;

export const InputSearch = styled.TextInput`
  background: ${({theme}) => theme.secundaryBackground};
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;

  border-bottom-right-radius: 5px;
  border-top-left-radius: 5px;
  margin: 15px;
  padding: 8px 20px;
  color: ${({theme}) => theme.text};

  &:focus {
    border-bottom: 2px solid red;
  }
`;

export const LoadingIndicator = styled.ActivityIndicator`
  margin-top: 25px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.text};
  font-weight: bold;
  margin: 0 20px;
  margin-top: 10px;
  font-size: 32px;
`;
