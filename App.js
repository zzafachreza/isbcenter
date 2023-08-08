// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar, Dimensions, Image, ActivityIndicator, SafeAreaView, BackHandler, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WebView from 'react-native-webview';

function SplashScreen({ navigation }) {


  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home')
    }, 1200)
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <Image source={require('./logo.png')} style={{
        width: 350,
        resizeMode: 'contain',
        height: 200
      }} />

      {/* <ActivityIndicator size="large" color="#004B97" /> */}
    </View>
  );
}


function HomeScreen({ navigation }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const backAction = () => {
    webViewRef.current.goBack();
    console.log(webViewRef.current)
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return false; // prevent default behavior (exit app)
    }
    return true;
  };




  React.useEffect(() => {


    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const webViewRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true)



  const onNavigationStateChange = (navState) => {
    console.log(navState.canGoBack);


    if (navState.canGoBack) {
      console.log('tidak baisa');


      BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          webViewRef.current.goBack();
          return true;
        }
      )
    } else {
      BackHandler.addEventListener(
        "hardwareBackPress", () => {
          BackHandler.exitApp();
          return true;
        })
    }

  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <WebView
        onNavigationStateChange={onNavigationStateChange.bind(this)}
        onLoad={() => setLoading(false)}
        mixedContentMode='always'
        ref={webViewRef}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        source={{
          uri: 'https://www.isbcenter.com/'
        }}
      />
      {loading && <ActivityIndicator color="#004B97" style={{ position: "absolute", top: windowHeight / 2, left: windowWidth / 2 }} size="large" />}
    </SafeAreaView>
  );

}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#004B97" />
      <Stack.Navigator initialRouteName='Splash'>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="Splash" component={SplashScreen} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;