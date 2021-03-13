import React, {useContext, useState} from 'react';
import type VideoType from '../../interfaces/VideoType';

import {FlatList} from 'react-native';
import {ThemeContext} from 'styled-components';
import {Jiro} from 'react-native-textinput-effects';
import axios from 'axios';

import {ContainerInput, LoadingIndicator, Title} from './styles';

import Video from '../../components/Video';
import GlobalContainer from '../../components/GlobalContainer';

const Search: React.FC = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<VideoType[]>([]);

  const handleQuery = async () => {
    if (query.length === 0) return;

    setLoading(true);

    try {
      const {
        data,
      }: {
        data: VideoType[];
      } = await axios.get(
        `https://sm-p3-play-api.vercel.app/api/videos/search?q=${query}`,
      );
      setVideos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <GlobalContainer>
      {videos.length === 0 && <Title>Pesquise por uma música.</Title>}
      <ContainerInput>
        <Jiro
          label={'Pesquise sua música'}
          borderColor={theme.secundaryBackground}
          inputPadding={16}
          onChangeText={setQuery}
          onSubmitEditing={handleQuery}
          value={query}
          inputStyle={{color: 'white'}}
        />
      </ContainerInput>
      {loading ? (
        <LoadingIndicator color={theme.fifthText} size="large" />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(video) => video.videoId}
          renderItem={({item}) => (
            <Video video={item} navigation={navigation} />
          )}
          numColumns={2}
        />
      )}
    </GlobalContainer>
  );
};

export default Search;
