import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import nfcManager, {NfcEvents} from 'react-native-nfc-manager';
import AndroidPrompt from './AndroidPrompt';

function Game(props) {
  const [start, setStart] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const androidPromptRef = React.useRef();

  React.useEffect(() => {
    let count = 5;

    nfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
      count--;

      // This is being done or the androidPrompt is also made because ios does not give out a pre made screen for ios
      if (Platform.OS === 'android') {
        androidPromptRef.current.setHintText(`${count}...`);
      } else {
        nfcManager.setAlertMessage(`${count}...`);
      }

      if (count <= 0) {
        nfcManager.unregisterTagEvent().catch(() => 0);
        setDuration(new Date().getTime() - start.getTime());
        if (Platform.OS === 'android') {
          androidPromptRef.current.setVisible(false);
        }
      }
      console.warn('Found a tag nearby');
    });
    return () => {
      nfcManager.setEventListener(NfcEvents.DiscoverTag, null);
    };
  }, [start]);

  async function scantag() {
    await nfcManager.registerTagEvent();
    if (Platform.OS === 'android') {
      androidPromptRef.current.setVisible(true);
    }
    setStart(new Date());
    setDuration(0);
  }
  return (
    <View style={styles.wrapper}>
      <Text>NFC Game</Text>
      {duration > 0 && <Text>{duration} ms</Text>}
      <TouchableOpacity style={styles.btn} onPress={scantag}>
        <Text>Start</Text>
      </TouchableOpacity>
      <AndroidPrompt ref={androidPromptRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    margin: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
});

export default Game;
