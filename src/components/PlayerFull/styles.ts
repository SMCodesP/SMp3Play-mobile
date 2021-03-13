import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: ${({theme}) => theme.background};
`;

export const Artwork = styled.Image`
  width: 85%;
  height: 256px;
  margin-top: 7.5%;
  border-radius: 25px;
  align-self: center;
`;

export const ContainerAuthor = styled.View`
  width: 85%;
  align-self: center;
`;

export const Authorname = styled.Text`
  color: ${({theme}) => theme.secundaryText};
  opacity: 0.9;
  font-size: 12px;
  font-weight: bold;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 18px;
  font-weight: bold;
`;

export const Controller = styled.View`
  margin-top: 5%;
  width: 75%;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-around;
`;
