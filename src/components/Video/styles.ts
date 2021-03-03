import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  margin: 10px 3px;
`;

export const VideoImage = styled.Image`
  width: 100%;
  height: 125px;
  border-radius: 5px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.text};
  padding: 0 8px;
`;
