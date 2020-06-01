/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text, View,
} from 'react-native';
import YouTube from 'react-native-youtube';
import WebView from 'react-native-webview';
import { MERCURE_URL } from './config';
import SocketIOClient from 'socket.io-client/dist/socket.io.js'
import SplashScreen from 'react-native-splash-screen';

const YoutubeVideo = ({ url }) => {
  const [_, setState] = useState({
    isReady: false,
    status: undefined,
    quality: undefined,
  });
  return (
    <YouTube
      videoId={url.split('=')[1] || url}
      play
      fullscreen
      onReady={() => null}
      onChangeState={e => setState({status: e.state})}
      onChangeQuality={e => setState({quality: e.quality})}
      style={{alignSelf: 'stretch', height: 300, margin: 'auto'}}
    />
  )
};

const CommonVideo = ({ url }) => (
  <WebView
    scalesPageToFit={true}
    javaScriptEnabled
    style={{
      backgroundColor: 'black',
    }}
    source={{
      html: `
<html>
  <body style="padding: 0; margin: 0;">
    <iframe 
      src="${ url }" 
      width="100%" 
      height="100%"
      allow="autoplay; fullscreen" 
      style="background-color: black; border: none; margin: 0; padding: 0;">
    
    </iframe>
  </body>
</html>`,
    }}
    automaticallyAdjustContentInsets={false}
  />
);

const App = () => {
  const [url, setUrl] = useState(undefined);
  const [displaySplashscreen, setDisplaySplashscreen] = useState(undefined);
  const [socket] = useState(SocketIOClient(MERCURE_URL));
  socket.on('update', url => {
    setUrl(url);
  });

  useEffect(() => {
    if (undefined !== displaySplashscreen) {
      if (displaySplashscreen) {
        SplashScreen.show();
      } else {
        SplashScreen.hide();
      }
    }
  }, [displaySplashscreen]);

  useEffect(() => {
    if (undefined !== url) {
      if (url) {
        setTimeout(() => setDisplaySplashscreen(false), 4000);
      } else {
        setDisplaySplashscreen(true);
      }
    }
  }, [url]);

  const commonProps = {...{url}};

  return (
    <SafeAreaView style={{flex: 1, margin: 0, padding: 0,}}>
      <View style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'black',
      }}/>
      {
        url ?
          url.includes('youtube.com') ?
            <YoutubeVideo {...commonProps}/> :
            <CommonVideo {...commonProps}/> :
          null
      }
    </SafeAreaView>
  );
};

export default App;
