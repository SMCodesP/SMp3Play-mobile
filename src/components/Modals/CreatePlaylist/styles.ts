import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  margin: 5%;
`;

export const Title = styled.Text`
  align-self: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({theme}) => theme.purple};
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 5px;
  color: ${({theme}) => theme.purple};
`;

export const ContainerVideos = styled.View`
  /* background: red; */
  justify-content: space-between;
`;

export const ContainerButton = styled.View`
  padding: 10px 10%;
`;

export const ButtonConfirm = styled(RectButton)`
  background: ${({theme}) => theme.purple};
  padding: 10px 15px;
  border-radius: 10px;
  width: 100%;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 18px;
  font-weight: bold;
`;

export const VideoContainer = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
`;

export const Artwork = styled.ImageBackground`
  width: 300px;
  height: 168px;
  margin: 0 2.5px;
  align-self: center;
`;

export const Button = styled(RectButton)`
  flex: 1;
`;

export const TrackTitle = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 14px;
  font-weight: bold;
`;
