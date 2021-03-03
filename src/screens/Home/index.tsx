import React from 'react';
import GlobalContainer from '../../components/GlobalContainer';

import {Title} from './styles';

const Home: React.FC = () => {
  const currentTime = new Date();

  return (
    <GlobalContainer>
      <Title>
        {currentTime.getHours() >= 6 && currentTime.getHours() <= 12
          ? 'Bom dia'
          : currentTime.getHours() > 12 && currentTime.getHours() < 17
          ? 'Boa tarde'
          : 'Boa noite'}
      </Title>
    </GlobalContainer>
  );
};

export default Home;
