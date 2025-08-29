import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import RNFS from 'react-native-fs';
import Icon from '../component/global/Icon';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sendStyles} from '../styles/sendStyles';
import CustomText from '../component/global/CustomText';
import {Colors} from '../utils/Constants';
import {connectionStyles} from '../styles/connectionStyles';
import {formatFileSize} from '../utils/libraryHelpers';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {goBack} from '../utils/NavigationUtil';

const ReceivedFileScreen: FC = () => {
  const [receivedFiles, setReceivedFiles] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getFileFromDirectory = async () => {
    setIsLoading(true);
    const platformPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/`
        : `${RNFS.DocumentDirectoryPath}/`;

    try {
      const exists = await RNFS.exists(platformPath);
      if (!exists) {
        setReceivedFiles([]);
        setIsLoading(false);
        return;
      }

      const files = await RNFS.readDir(platformPath);
      const formattedFiles = files.map(file => ({
        id: file.name,
        name: file.name,
        size: file.size,
        uri: file.path,
        mimeType: file.name.split('.').pop() || 'unknown',
      }));
      setReceivedFiles(formattedFiles);
    } catch (error) {
      console.log('Error fetching files', error);
      setReceivedFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFileFromDirectory();
  }, []);

  const renderThumbnail = (mimeType: string) => {
    switch (mimeType) {
      case 'mp3':
        return (
          <Icon
            name="musical-notes"
            size={16}
            color="blue"
            iconFamily="Ionicons"
          />
        );
      case 'mp4':
        return (
          <Icon name="videocam" size={16} color="green" iconFamily="Ionicons" />
        );
      case 'pdf':
        return (
          <Icon name="document" size={16} color="red" iconFamily="Ionicons" />
        );
      case 'jpg':
        return (
          <Icon name="image" size={16} color="orange" iconFamily="Ionicons" />
        );
      default:
        return (
          <Icon name="folder" size={16} color="gray" iconFamily="Ionicons" />
        );
    }
  };

  const renderItem = ({item}: any) => (
    <View style={connectionStyles.fileItem}>
      <View style={connectionStyles.fileInfoContainer}>
        {renderThumbnail(item?.mimeType)}
        <View style={connectionStyles.fileDetails}>
          <CustomText numberOfLines={1} fontFamily="Okra-Bold" fontSize={10}>
            {item?.name}
          </CustomText>
          <CustomText numberOfLines={1} fontFamily="Okra-Medium" fontSize={8}>
            {item?.mimeType} - {formatFileSize(item?.size)}
          </CustomText>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          const normalizedPath =
            Platform.OS === 'android' ? item.uri : `file://${item.uri}`;

          if (Platform.OS === 'ios') {
            ReactNativeBlobUtil.ios
              .openDocument(normalizedPath)
              .then(() => {
                console.log('Document opened successfully');
              })
              .catch(error => {
                console.log('Error opening document on iOS', error);
              });
          } else {
            ReactNativeBlobUtil.android
              .actionViewIntent(normalizedPath, '*/*')
              .then(() => {
                console.log('Document opened successfully');
              })
              .catch(error => {
                console.log('Error opening document on Android', error);
              });
          }
        }}
        style={connectionStyles.openButton}>
        <CustomText
          numberOfLines={1}
          color="#fff"
          fontFamily="Okra-Bold"
          fontSize={9}>
          Open
        </CustomText>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={['#FFFFFF', '#CDDAEE', '#8DBAFF']}
      start={{x: 0, y: 1}}
      end={{x: 0, y: 0}}
      style={sendStyles.container}>
      <SafeAreaView />

      <View style={sendStyles.mainContainer}>
        <CustomText
          fontFamily="Okra-Bold"
          fontSize={15}
          color="#fff"
          style={{textAlign: 'center', margin: 10}}>
          All Received Files
        </CustomText>

        {isLoading ? (
          <ActivityIndicator size={'small'} color={Colors.primary} />
        ) : receivedFiles.length > 0 ? (
          <View style={{flex: 1}}>
            <FlatList
              data={receivedFiles}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={connectionStyles.fileList}
            />
          </View>
        ) : (
          <View style={connectionStyles.noDataContainer}>
            <CustomText
              numberOfLines={1}
              fontFamily="Okra-Medium"
              fontSize={11}>
              No Files Found
            </CustomText>
          </View>
        )}
        <TouchableOpacity style={sendStyles.backButton} onPress={goBack}>
          <Icon
            name="arrow-back"
            size={16}
            color="#000"
            iconFamily="Ionicons"
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default ReceivedFileScreen;

const styles = StyleSheet.create({});
