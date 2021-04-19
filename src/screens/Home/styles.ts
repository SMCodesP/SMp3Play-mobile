import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Title = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 32px;
  font-weight: bold;
  margin: 5px 20px;
`;

export const EmptyText = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 20px;
  font-weight: bold;
  margin-left: 35px;
`;

export const Button = styled(RectButton)`
  flex: 1;
`;

export const Artwork = styled.ImageBackground`
  width: 300px;
  height: 168px;
  margin: 0 2.5px;
`;

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  justify-content: flex-end;
  padding: 10px;
`;

export const TrackTitle = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 14px;
  font-weight: bold;
`;

export const ContainerCreatePlaylist = styled.View`
  background: ${({theme}) => theme.comment};
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-top-left-radius: 25px;
`;

export const ButtonCreatePlaylist = styled.TouchableOpacity`
  width: 60%;
  border-radius: 25px;
  align-self: center;
  border-radius: 5px;
  border-top-left-radius: 25px;
`;

export const TextCreatePlaylist = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 72px;
  font-weight: bold;
  text-align: center;
`;

export const ContainerPlaylist = styled.View`
  background: red;
  margin: 10px 0;
  position: relative;
`;

export const ShadowPlaylist = styled(RectButton)`
  width: 100%;
  height: 200px;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 15px;
`;

export const ListPlaylist = styled.FlatList`
  width: 100%;
  height: 200px;
  position: absolute;
  border-radius: 10px;
`;

export const PlaylistItemImage = styled.Image`
  width: 50%;
  height: 100px;
`;

export const PlaylistFooter = styled.View``;

export const PlaylistFooterName = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 28px;
  font-weight: bold;
`;
