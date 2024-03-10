import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';

function AndroidPrompt(props, ref) {
  const [_visisble, _setVisible] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [hintText, setHintText] = React.useState('');
  // const animValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (ref) {
      ref.current = {
        // setVisible: _setVisible,
        setVisible,
        setHintText,
      };
      // console.log(+' ++++++++++++++++++++');
    }
  }, [ref]);

  // React.useEffect(() => {
  //   if (_visisble) {
  //     setVisible(true);
  //     Animated.timing(animValue, {
  //       duration: 300,
  //       toValue: 1,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     Animated.timing(animValue, {
  //       duration: 300,
  //       toValue: 0,
  //       useNativeDriver: true,
  //     }).start(() => {
  //       setVisible(false);
  //       setHintText('');
  //     });
  //   }
  // }, [_visisble, animValue]);

  // const backdropAnimStyle = {
  //   opacity: animValue,
  // };

  // const promptAnimStyle = {
  //   transform: [
  //     {
  //       translateY: animValue.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: [500, 0],
  //       }),
  //     },
  //   ],
  // };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.content}>
        <View style={[styles.backdrop, StyleSheet.absoluteFill]}>
          <View style={styles.prompt}>
            <Animated.View style={styles.prompt}>
              <Text style={[styles.hint, styles.color]}>
                {hintText || 'Hello NFC!!!'}
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setVisible(false);
                }}>
                <Text style={styles.text}>CANCEL</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    position: 'absolute',
  },
  prompt: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    width: Dimensions.get('window').width - 2 * 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
  },
  btn: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    padding: 5,
  },
  text: {
    color: 'black',
  },
});

export default React.forwardRef(AndroidPrompt);
