import React, { memo } from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface CardVideoProps extends TVideo {
	navigation: any;
}

const CardVideo: React.FC<CardVideoProps> = ({ navigation, ...video }) => {
	return (
		<TouchableOpacity
			style={{ flex: 1 }}
			onPress={() => {
				navigation.navigate('Details', {
					video,
				});
			}}
		>
			<ImageBackground style={styles.thumbnail} imageStyle={{ borderRadius: 10 }} source={{ uri: video.thumbnail }}>
				<View style={styles.container}>
					<Text style={styles.title}>{video.title.substring(0, 50).trim() + (video.title.length > 50 ? '...' : '')}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	)
}

export default memo(CardVideo)

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: 'rgba(0, 0, 0, .5)',
	  justifyContent: 'flex-end',
		borderRadius: 10,
	},
	thumbnail: {
		flex: 1,
		borderRadius: 10,
		marginHorizontal: 2,
		marginVertical: 3,
	},
	title: {
		fontSize: 12,
		color: colors.foreground,
		fontFamily: fonts.complement,
		padding: 8,
	}
});
