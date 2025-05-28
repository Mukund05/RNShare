import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {optionStyles} from '../../styles/optionsStyles';
import Icon from '../global/Icon';
import {Colors} from '../../utils/Constants';
import CustomText from '../global/CustomText';

interface OptionProps {
  isHome?: boolean;
  onMediaPickedUp?: (media: any) => void;
  onFilePickedUp?: (file: any) => void;
}

const Option: FC<OptionProps> = ({isHome, onMediaPickedUp, onFilePickedUp}) => {
  return (
    <View style={optionStyles.container}>
      <TouchableOpacity style={optionStyles.subContainer} onPress={() => {}}>
        <Icon
          name="images"
          size={20}
          color={Colors.primary}
          iconFamily="Ionicons"
        />
        <CustomText
          fontFamily="Okra-Medium"
          style={{marginTop: 4, textAlign: 'center'}}>
          Photo
        </CustomText>
      </TouchableOpacity>

      <TouchableOpacity style={optionStyles.subContainer} onPress={() => {}}>
        <Icon
          name="musical-notes-sharp"
          size={20}
          color={Colors.primary}
          iconFamily="Ionicons"
        />
        <CustomText
          fontFamily="Okra-Medium"
          style={{marginTop: 4, textAlign: 'center'}}>
          Audio
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={optionStyles.subContainer} onPress={() => {}}>
        <Icon
          name="folder-open"
          size={20}
          color={Colors.primary}
          iconFamily="Ionicons"
        />
        <CustomText
          fontFamily="Okra-Medium"
          style={{marginTop: 4, textAlign: 'center'}}>
          Files
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity style={optionStyles.subContainer} onPress={() => {}}>
        <Icon
          name="contacts"
          size={20}
          color={Colors.primary}
          iconFamily="MaterialCommunityIcons"
        />
        <CustomText
          fontFamily="Okra-Medium"
          style={{marginTop: 4, textAlign: 'center'}}>
          Contacts
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default Option;

const styles = StyleSheet.create({});
