import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 85px;
  background: ${({theme}) => theme.background};
  border-top-width: 1px;
  border-top-color: ${({theme}) => theme.secundaryBackground};
  padding: 0 15px;
  flex-direction: row;
`;

export const ContainerOptions = styled.View`
  flex: 1;
  justify-content: space-around;
  margin-top: 7px;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.text};
  font-size: 16px;
  font-weight: bold;
`;

export const Authorname = styled.Text`
  color: ${({theme}) => theme.text};
  opacity: 0.7;
  font-size: 11px;
`;

export const Artwork = styled.Image`
  width: 75px;
  height: 75px;
  align-self: center;
  border-radius: 5px;
  opacity: 0.75;
  margin-right: 5px;
`;

export const ProgessContainer = styled.View`
  height: 1px;
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
`;
export const ProgessBackground = styled.View`
  background: grey;
`;
export const ProgessSneek = styled.View`
  background: ${({theme}) => theme.fifthText};
`;
