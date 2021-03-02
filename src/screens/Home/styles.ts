import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  background: ${({theme}) => theme.background};
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 32px;
  font-weight: bold;
`;
