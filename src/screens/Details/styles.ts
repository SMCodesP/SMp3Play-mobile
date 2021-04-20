import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

// padding-left: 10px;
// padding-right: 10px;
// padding: 10px 15px;

export const ContainerImage = styled.View`
  height: 300px;
  background: #000000aa;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
  background: ${({theme}) => theme.background};
  border-bottom-width: 2px;
  border-bottom-color: ${({theme}) => theme.comment};
  padding: 10px 5px;
  opacity: 0.95;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.foreground};
  font-size: 22px;
  margin-left: 5px;
`;

export const ContainerAuthor = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  padding: 0 45px 0 25px;
`;

export const AuthorName = styled.Text`
  font-size: 24px;
  color: ${({theme}) => theme.foreground};
  font-weight: bold;
`;

export const ContainerBody = styled.View`
  margin: 50px 10px;
`;

export const YTButton = styled.View`
  height: 40px;
  background-color: ${({theme}) => theme.comment};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const ButtonAdd = styled(RectButton)`
  background: ${({theme}) => theme.comment};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const ContainerButton = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 15px 0;
  align-items: center;
  justify-content: center;
`;
