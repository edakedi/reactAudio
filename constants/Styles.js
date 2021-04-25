import { StyleSheet, Dimensions } from 'react-native';

import {
    nightBlue, skyBlue, paleBlue, white,
    offWhite, dark, grey
} from '../constants/Colors';

export var screenHeight = Dimensions.get('window').height;
export var screenWidth = Dimensions.get('window').width;
export var cardHeight = screenHeight / 5;
export var cardWidth = screenWidth / 3.2;
export var screenPadding = 10;
export var aspectRation = screenHeight / screenWidth;


export const customStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: offWhite,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    containerFloat: {
        flex: 1,
        padding: 20,
    },
    headerRow: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    headerRowBack: {
        marginBottom: 22,
        flexDirection: 'row',
    },
    subHeaderRow: {
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    trackCount: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textColor: {
        color: offWhite
    },
    backBtn: {
        color: nightBlue
    },
    header: {
        fontSize: 26,
        fontWeight: '500',
        alignItems: 'flex-end',
    },
    headerBlue: {
        fontSize: 28,
        fontWeight: '500',
        color: offWhite
    },
    textBlue: {
        fontSize: 28,
        fontWeight: '400',
        color: dark
    },
    textDark: { fontSize: 22, fontWeight: '600' },
    subHeaderBlue: {
        fontSize: 22,
        fontWeight: '500',
        color: dark
    },
    inputLabels: {
        fontSize: 18,
        fontWeight: '400',
        color: offWhite
    },
    inputText: {
        fontSize: 22,
        color: offWhite,
        borderBottomColor: offWhite,
    },
    subHeader: {
        fontSize: 14,
        fontWeight: '400'
    },
    mainBackGround: {
        backgroundColor: '#3D3B60',
    },
    cardShadow: {
        shadowRadius: 2,
        shadowOpacity: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: .5 },
    },
    absCapsule: {
        flex: 1,
        margin: 10,
        bottom: 10,
        marginBottom: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    subscribeButton: {
        flex: 1,
        height: 52,
        borderRadius: 90,
        width: screenWidth - 18,
        backgroundColor: 'white',
        shadowRadius: 1,
        shadowOpacity: .2,
        shadowColor: '#000',
        shadowOffset: { width: .1, height: .5 },
        paddingHorizontal: 10,
    },
    subscribeMainView: {
        padding: 5,
        flexDirection: 'row'
    },
    button: {
        paddingVertical: 12,
        marginTop: 20,
        borderRadius: 20,
        borderColor: offWhite,
        borderWidth: .9,
        overflow: 'hidden',
        alignItems: 'center'
    },
    buttonHeader: {
        fontSize: 12,
        color: 'grey',
        fontWeight: '300'
    },
    buttonText: {
        color: offWhite,
        fontSize: 18
    },
    buttonTitle: {
        color: 'black',
        fontSize: 15,
        fontWeight: '300'
    },
    marginBottom10: {
        marginBottom: 10
    },
    marginBottom15: {
        marginBottom: 15
    },
    marginTop40: {
        marginTop: 40
    },
    marginBottom20: {
        marginBottom: 20,
    },
    // for flex
    flexOne: {
        flex: 1
    },
    flexTwo: {
        flex: 2
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row'
    },
    flexCol: {
        flex: 1,
        flexDirection: 'column'
    },
    // badge
    badgeView: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    sessionTitle: {
        fontSize: 22,
        fontWeight: '300'
    },
    capsuleIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
    },
    inputContainerStyle: { borderBottomColor: offWhite, },
    bgColor: { backgroundColor: offWhite, },
    flexEnd: { flex: 1, alignItems: 'flex-end' },
    divider: { backgroundColor: '#9E9E9E', marginVertical: 20 },

    //
    imageContainer: {
        flex: 0.5,
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlsContainer: {
        flex: 0.45,
        justifyContent: 'flex-start',
    },
    albumImage: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        borderRadius: 40,
    },
    progressBar: {
        height: 20,
        paddingBottom: 90,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 14,
    },
});