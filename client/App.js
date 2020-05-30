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
  Text,
} from 'react-native';
import YouTube from 'react-native-youtube';
import WebView from 'react-native-webview';
import RNEventSource from 'react-native-event-source';

const YoutubeVideo = ({ url, ...rest }) => {
  const [_, setState] = useState({
    isReady: false,
    status: undefined,
    quality: undefined,
  });
  return (
    <YouTube
      videoId="5qap5aO4i9A"
      play
      fullscreen
      onReady={() => setState({isReady: true})}
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
    source={{
      html: `<iframe src="https://player.vimeo.com/video/423643722" width="100%" height="100%" frameborder="0" allow="autoplay; fullscreen"></iframe>`,
    }}
    automaticallyAdjustContentInsets={false}
  />
);

const App = () => {
  const [url, setUrl] = useState();
  const apiUrl = `${process.env.REACT_APP_API_ENTRYPOINT}/urls`;
  const [eventSource, setEventSource] = useState(new RNEventSource(`https://mercure-streaming.devcv.fr:1337/.well-known/mercure?topic=*`));
  console.log(eventSource);

  useEffect(() => {
    eventSource.addEventListener('message', alert);
    return () => eventSource.close();
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/1`, {
      method: "GET",
      headers: {
        'Accept': 'application/ld+json',
        'Content-Type': 'application/ld+json',
      },
      body: null
    })
      .then(response => response.json())
      .then(data => {
        setUrl(data.url)
      })
      .catch(console.log);
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {
        url ?
          url.includes('youtube.com') ?
            <YoutubeVideo url={url}/> :
            <CommonVideo url={url}/> :
          <Text>Loading</Text>
      }
    </SafeAreaView>
  );
};

export default App;
