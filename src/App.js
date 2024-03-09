import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import nfcManager from 'react-native-nfc-manager';
import Game from './Game';
import AndroidPrompt from './AndroidPrompt';

function App(props) {
  const [hasNfc, setHasNfc] = React.useState(null);

  React.useEffect(() => {
    async function checkNfc() {
      //   return (
      //     <View style={styles.wrapper}>
      //       <Text>Yo I am here</Text>
      //     </View>
      //   );
      const supported = await nfcManager.isSupported();
      if (supported) {
        await nfcManager.start();
      }
      setHasNfc(supported);
    }
    checkNfc();
  }, []);

  if (hasNfc === null) {
    return null;
  } else if (!hasNfc) {
    return (
      <View style={styles.wrapper}>
        <Text>Your device does nott Support NFc!!!!</Text>
        <AndroidPrompt />
      </View>
    );
  }

  return <Game />;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
