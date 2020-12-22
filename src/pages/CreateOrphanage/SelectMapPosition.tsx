import React, { useState } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, {MapEvent, Marker} from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import mapMarker from '../../images/map-marker.png';
import { Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

interface ParamsId{
    id:number;
}

interface imageUrl{
    id:number,
    url:string
}

interface Orphanage{
    id: number,
    name: string,
    latitude:number,
    longitude:number,
    about:string,
    instructions:string,
    opening_hours:string,
    open_on_weekends: boolean,
    images: Array<imageUrl>
}


const SelectMapPosition : React.FC = () => {

    const navigation = useNavigation();

    const [position, setPosition] = useState({latitude:0,longitude:0});

    function handlerSelectMapPosition(event:MapEvent){
        setPosition(event.nativeEvent.coordinate);
    };

    function handleNextStep(){
        navigation.navigate('OrphanageData',{position});
    }
    return (
        <View style={styles.container}>
            <MapView initialRegion={{
                latitude:-6.5205485,
                longitude: -38.4155765,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
            }}
            style={styles.mapStyle}
            onPress={handlerSelectMapPosition}
            >

            {position.latitude !== 0 && (
                <Marker
                icon={mapMarker}
                coordinate = {{
                    latitude:position.latitude,
                    longitude:position.longitude
                }}

                />
            )}

            </MapView>

            {position.latitude !== 0 &&(
                <RectButton style={styles.nextButton} onPress={handleNextStep}>
                    <Text style={styles.nextButtonText}>Próximo</Text>
                        
                 </RectButton>
            )}

        </View>

    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        position: 'relative'

    },
    mapStyle:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    nextButton:{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,

        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 40,
    },
    nextButtonText:{
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF'

    }
})

export default SelectMapPosition;