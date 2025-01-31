import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Loading = () => {
    return (
        // <Overlay
        //     isVisible={true}
        //     //   windowBackgroundColor="rgba(0, 0, 0, 0.5)"
        //     //   overlayBackgroundColor="transparent"
        //     fullScreen
        // >
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#36b8fd" />
            </View>
        // </Overlay>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;
