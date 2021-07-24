import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import colors from '../styles/colors';

// import { Container } from './styles';

export const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[...Array(20).keys()]}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={() => (
          <View style={styles.containerItem}>
            <Image style={styles.imageItem} source={{ uri: 'https://picsum.photos/300/200' }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1
  },
  containerItem: {
    width: '46%',
    margin: '2%'
  },
  imageItem: {
    width: '100%',
    height: 150
  }
})
