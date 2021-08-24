import React from 'react';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import colors from '../../styles/colors';

export const Radio = ({isSelected, item}: any) => {
  return (
    <RadioForm
      formHorizontal={true}
      animation={true}
      initial={0}
      onPress={() => {}}
    >
      <RadioButton>
        <RadioButtonInput
          obj={item}
          index={1}
          isSelected={isSelected}
          onPress={() => {}}
          buttonInnerColor={colors.purple}
          buttonOuterColor={colors.purple}
          buttonSize={10}
          buttonOuterSize={20}
          buttonStyle={{}}
          buttonWrapStyle={{marginLeft: 10}}
        />
      </RadioButton>
    </RadioForm>
  );
};