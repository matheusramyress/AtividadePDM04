import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import MapView, {Marker,Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {useFocusEffect,useNavigation} from '@react-navigation/native';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';

import mapMarker from '../images/map-marker.png'
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import api from '../services/api';

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

const OrphanageMaps : React.FC = ()=>{

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    //Sempre que o ususario sair e voltar a tela ele é disparado
    useFocusEffect(()=>{
        api.get('orphanages').then(response=>{
            setOrphanages(response.data);
        });
    });

    const navigation = useNavigation();

    function handlerNavigateToOrphanageDetails(id:number){
        navigation.navigate('OrphanageDetails',{id});
    } 

    function handlerNavigateToCreateOrphanage (){
        navigation.navigate('SelectMapPosition');
    } 

    return( 
        <View style={styles.container}>
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion = {
                {
                    latitude:-6.923517454197994,
                    longitude:-38.966719623245254,
                    latitudeDelta:0.008,
                    longitudeDelta:0.008
                }
            }
            >
            {orphanages.map(orphanage =>
                <Marker
                key={orphanage.id} 
                icon={mapMarker}
                coordinate = {
                    {
                        latitude:orphanage.latitude,
                        longitude:orphanage.longitude
                    }
                }
                calloutAnchor={{x:0.5,y:-0.2}}
                >
                <Callout 
                    style={styles.callOutContainer}
                    tooltip={true}
                    onPress={()=>handlerNavigateToOrphanageDetails(orphanage.id)}
                >
                    <View>
                        <Text style={styles.callOutText}>{orphanage.name}</Text>
                    </View>
                </Callout>
                </Marker>
            )}
            </MapView>
            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length} orfanatos</Text>
                <RectButton 
                style={styles.createOrphanageButton}
                onPress={handlerNavigateToCreateOrphanage}
                >
                    <Feather name="plus" size={20} color="#fff"/>
                </RectButton>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    map:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    callOutContainer:{
        width:168,
        height:46,
        paddingHorizontal:16,
        backgroundColor:'rgba(255,255,255,0.8)',
        borderRadius:16,
        justifyContent:'center'
    },
    callOutText:{
        color:'#000000',
        fontSize:14,
        fontFamily:'Nunito_700Bold'
    },
    footer:{
        position:'absolute',
        left:24,
        right:24,
        bottom:32,

        backgroundColor:'#fff',
        borderRadius:28,
        height:46,
        paddingLeft:24,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        elevation:3


    },
    footerText:{
        color:'#8fa7b3',
        fontFamily:'Nunito_700Bold'
    },
    createOrphanageButton:{
        width:56,
        height:56,
        backgroundColor:'#15c3d6',
        borderRadius:28,

        justifyContent:'center',
        alignItems:'center',
    }
});
export default OrphanageMaps;