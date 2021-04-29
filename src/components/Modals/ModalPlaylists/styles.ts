import {rgba} from 'polished';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Button = styled(RectButton)`
  margin: 10px 20px;
  background: ${({theme}) => rgba(theme.comment, 0.4)};
  padding: 10px 45px 10px 20px;
  border-radius: 5px;
`;

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PlaylistName = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 20px;
  font-weight: bold;
`;

export const ContainerName = styled.View`
  flex-direction: row;
`;

export const ContainsText = styled.Text`
  background: ${({theme}) => theme.comment};
  color: ${({theme}) => theme.foreground};
  font-size: 10px;
  border-radius: 5px;
  height: 16px;
  padding: 0 4px;
  margin: 0 5px;
`;
