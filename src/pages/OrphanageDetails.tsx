import MapView, {Marker} from 'react-native-maps';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Linking} from  'react-native';
import mapMarker from '../images/map-marker.png';
import {Feather, FontAwesome} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';

import api from '../services/api';
import AppLoading from 'expo-app-loading';

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

const OrphanageDetails: React.FC = () => {

    const route = useRoute();
    const paramsId = route.params as ParamsId;

    const [orphanage, setOrphanage] = useState<Orphanage>();

    useEffect(()=>{
        api.get(`orphanages/${paramsId.id}`).then(response=>{
            setOrphanage(response.data);
        });
    },[paramsId]);

    if(!orphanage){
        return <AppLoading/>
    }

    function handleOpenGoogleMapsRoute(){
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`);
    }

    return(
        <ScrollView style={styles.container}>
            
            <View style={styles.imagensContainer}>
                <ScrollView horizontal pagingEnabled>
                    {orphanage.images.map(image=>{
                        return (
                            <Image key={image.url} source={{uri:image.url}} style={styles.image}/>
                        )
                    })}
                </ScrollView>
            </View>
            <View>
                <View style={styles.detailOrphanageContainer}>
                    <Text style={styles.title}>{orphanage.name}</Text>
                    <Text style={styles.description}>{orphanage.about}</Text>
                </View>
                <View style={styles.mapContainer}>
                    <MapView
                        initialRegion={{
                        latitude:orphanage.latitude,
                        longitude:orphanage.longitude,
                        latitudeDelta:0.008,
                         longitudeDelta:0.008,
                    }}
                    zoomEnabled={false}
                    pitchEnabled={false}
                    scrollEnabled={false}
                    rotateEnabled={false}
                    style={styles.mapStyle}
                    >
                        <Marker 
                        icon={mapMarker} 
                        coordinate = {
                        {
                                latitude:-6.5190522,
                                longitude:-38.4057993

                            }               
                        }/>
                    </MapView>
                        <TouchableOpacity style={styles.routesContainer} onPress={handleOpenGoogleMapsRoute}>
                            <Text style={styles.routesText}> Ver rotas no google maps</Text>
                        </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.separator}>
                <Text style={styles.title}>Instruções para visitar</Text>
                <Text style={styles.description}>{orphanage.instructions}</Text>
                <View style={styles.scheduleContainer}>
                    <View style={[styles.scheduleItem,styles.scheduleItemBlue]}>
                        <Feather name="clock" size={40} color="#2ab5d1"/>
                        <Text style={[styles.scheduleItemText,styles.scheduleItemTextBlue]}>
                            Segunda a sexta as:{orphanage.opening_hours}
                            </Text>

                    </View>

                   {orphanage.open_on_weekends?(
                        <View style={[styles.scheduleItem,styles.scheduleItemGreen]}>
                        <Feather name="clock" size={40} color="#2ab5d1"/>
                        <Text style={[styles.scheduleItemText,styles.scheduleItemTextGreen]}>Atendemos no final de semana</Text>

                    </View>
                   ):(
                        <View style={[styles.scheduleItem,styles.scheduleItemRed]}>
                        <Feather name="clock" size={40} color="#ff669d"/>
                        <Text style={[styles.scheduleItemText,styles.scheduleItemTextRed]}>Atendemos no final de semana</Text>

                </View>
                   )}

                </View>

            </View>
            <RectButton style={styles.contactButton} onPress={()=>{}}>
                <FontAwesome name="whatsapp" size={20} color="#fff"/>
                <Text style={styles.contactButtonText}>Entrar em contato</Text>

            </RectButton>
           
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 12

    },
    imagensContainer:{
        height: 240,

    },
    image:{
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover'

    },
    title:{
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold'

    },
    detailOrphanageContainer:{
        padding: 24,


    },
    description:{
        fontFamily: 'Nunito_600SemiBold'

    },
    mapContainer:{
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#E6F7FB'

    },
    mapStyle:{
        width: '100%',
        height: 150

    },
    routesText:{
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'

    },
    routesContainer:{
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#B3DAE2'

    },
    separator:{
        height:0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40,

    },
    scheduleContainer:{
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    scheduleItem:{
        width: '48%',
        height:'100%',
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,

    },
    scheduleItemBlue:{
        backgroundColor: '#E6F7FB',
        borderColor: '#B3DAE2',
    },
    scheduleItemGreen:{
        color: '#fef6f9',    
        borderColor: '#ffbcd4',
    },

    scheduleItemRed:{
        color: '#EDF7FB',    
        borderColor: '#A1E9C5',
    },

    scheduleItemText:{
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20

    },
    
    scheduleItemTextBlue:{
        color: '#5C8599'
    },
    scheduleItemTextGreen:{
        color: '#37C77F'
    },

    scheduleItemTextRed:{
        color: '#ff669d'
    },

    contactButton:{
        backgroundColor: '#3CDC8C',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 240,
        marginBottom: 40

       

    },
    contactButtonText:{
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16
        

    }
})
export default OrphanageDetails;