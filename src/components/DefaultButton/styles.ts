import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Button = styled(RectButton)`
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;
