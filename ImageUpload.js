import React from 'react';
import {View, Text, Platform, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const baseUrl = 'http://devtest-agsift.ap-south-1.elasticbeanstalk.com';
const authToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiaW5zcGVjdG9yIiwidXNlcm5hbWUiOiJ1c2VyLmFncm8iLCJ1c2VyaWQiOiI1ZWNjZDEyMjM2YTkxZDAwMDk2MThhODMiLCJmaXJzdE5hbWUiOiJQcmFzdWsiLCJsYXN0TmFtZSI6IkphaW4ifQ.293wTWB-A4wKGRbiq7j45Waks7AdTRg2VuT9VpQDMmE';
const reportId = '5eea5bbffed21e0017908f69';

class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image_objects_array: [],
        filePath: '',
        selected_Sample: 1,
    };
  }
  chooseFile = name => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    if (name === 'Take_Photo') {
      ImagePicker.launchCamera(options, async response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          let source = response;
          console.log('Response image', response);
          const data = new FormData();
          let image_info = {};
          // image_info['file[0]'] = {
          //   filename: response.fileName,
          //   filesize: response.fileSize,
          // };
          data.append('files', {
            name: 'abc.jpeg',
            //response.fileName,
            type: response.type,
            uri:
              Platform.OS === 'android'
                ? response.uri
                : response.uri.replace('file://', ''),
          });
          console.log('data', data);

          try {
            console.log('start');

            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${authToken}`;
            const result = await axios.post(
              `${baseUrl}/reports/images/${reportId}/potato/1`,
              data,
            );
            console.log('result', result);
            this.setState(
              {
                image_objects_array: [
                  ...this.state.image_objects_array,
                  {
                    imageId: Object.keys(result.data.urls)[0],
                    imageUrl: Object.values(result.data.urls)[0],
                    tags: new Set(),
                  },
                ],
              },
              () => console.log('done'),
            );
          } catch (e) {
            console.log('err', e);
          }
          // You can also display the image using data:
          // let source = { uri: 'data:image/jpeg;base64,' + response.data };
          this.setState({
            filePath: source.uri,
          });
        }
      });
    } else {
      ImagePicker.launchImageLibrary(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          let source = response;
          // this.state.image_objects_array.push(source.uri);
          console.log('Response image', response);
          const data = new FormData();
          let image_info = {};
          // image_info['file[0]'] = {
          //   filename: response.fileName,
          //   filesize: response.fileSize,
          // };
          data.append('files', {
            name: 'abc.jpeg',
            //response.fileName,
            type: response.type,
            uri:
              Platform.OS === 'android'
                ? response.uri
                : response.uri.replace('file://', ''),
          });
          console.log('data', data);

          try {
            console.log('start');

            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${authToken}`;
            const result = await axios.post(
              `${baseUrl}/api/reports/images/${reportId}/potato/1`,
              data,
            );
            console.log('result', result);
            this.setState(
              {
                image_objects_array: [
                  ...this.state.image_objects_array,
                  {
                    imageId: Object.keys(result.data.urls)[0],
                    imageUrl: Object.values(result.data.urls)[0],
                    tags: new Set(),
                  },
                ],
              },
              () => console.log('done'),
            );
          } catch (e) {
            console.log('err', e);
          }

          this.setState({
            filePath: source.uri,
          });
        }
      });
    }
  };
  render() {
    return (
      <View style={{justifyContent:'center', alignItems: 'center', flex: 1}}>
        <Text onPress={() => this.chooseFile()}>Image upload</Text>
        {
          this.state.image_objects_array.map((ele, idx) => (
            <Image key={idx} style={{width:  50, height: 50}} source={{uri: ele.imageUrl}} />
          ))
        }
      </View>
    );
  }
}

export default ImageUpload;
