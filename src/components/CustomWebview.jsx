import React, { useEffect, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { BackHandler, Button, Platform, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoginCredentials } from '../../redux/reducers/common_reducer';

const CustomWebview = ({ remote_url }) => {
    const [loading, setLoading] = useState(false);
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);
    const [url, setUrl] = useState(remote_url);
    const [error, setError] = useState(false);

    const webviewRef = useRef(null);

    useEffect(() => {
        setUrl(() => remote_url);
    }, [remote_url, error]);

    const HandleBackPressed = () => {
        if (webviewRef.current) {
            console.log("webviewref", JSON.stringify(webviewRef.current))
            webviewRef.current.goBack();
            return true;
        }
        return false;
    }

    backButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goBack()
    }

    frontButtonHandler = () => {
        if (webviewRef.current) webviewRef.current.goForward()
    }

    useEffect(() => {
        if (Platform.OS === 'android') {
            BackHandler.addEventListener('hardwareBackPress', HandleBackPressed);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', HandleBackPressed);
            }
        }
    }, []);

    const handleWebViewError = () => {
        setError(true);
    };
    const handleReload = () => {
        setError(false);
    };

    const CheckUrl = (callback) =>{
        console.log("From Webview", callback);
    }
    return (<>
        {error ? 
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>You are offline !</Text>
                <Text style={styles.errorSubText}>Please connect to internet and retry.</Text>
                <Button title="Retry" onPress={handleReload}/>
            </View> :
            <WebView
                scalesPageToFit={false}
                onLoadStart={(loading) => setLoading(true)}
                onLoadEnd={(loading) => setLoading(false)}
                source={{ uri:  url}}
                showsVerticalScrollIndicator={false}
                injectedJavaScript={INJECTED_JAVASCRIPT}
                onMessage={(err) => { console.log(err)}}
                onError={handleWebViewError}
                ref={webviewRef}
                onNavigationStateChange={navState => {
                    setCanGoBack(navState.canGoBack);
                    setCanGoForward(navState.canGoForward);
                    CheckUrl(navState?.url);
                    setUrl(navState?.url);
                    }
                }
            />
        }
    </>);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    errorContainer: {
      flex: 1,
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    errorSubText: {
        fontSize: 12,
        color: 'black',
      },
  });

export default CustomWebview;