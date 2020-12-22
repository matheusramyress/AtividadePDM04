import React, { useState } from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import { RectButton, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import {Feather} from '@expo/vector-icons'
import { Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { useRoute, useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

interface Positions{
    latitude:number;
    longitude:number;
}
interface ParamsPositions{
    position:Positions;
}


const OrphanageData : React.FC = () => {

    const route = useRoute();
    const navigation = useNavigation();
    
    const paramsPosition = route.params as ParamsPositions;

    const[name, setName] = useState('');
    const[about, setAbout] = useState('');
    const[instructions, setInstructions] = useState('');
    const[openingHours, setOpeningHours] = useState('');
    const[openOnWeekends, setOpenOnWeekends] = useState(true);
    const[imagesURI, setImagesURI] = useState<string[]>([]);

    
    async function handleCreateOrphanage(){

        const {latitude, longitude} = paramsPosition.position;
       
        const data = new FormData();

        data.append("name",name);
        data.append("about",about);
        data.append("latitude",String(latitude));
        data.append("longitude",String(longitude));
        data.append("instructions",instructions);
        data.append("opening_hours", openingHours);
        data.append("open_on_weekends",String(openOnWeekends));
        
        imagesURI.forEach((imageURI, index) =>{
            data.append('images',{
                name:`image_${index}.jpg`,
                type:'imag/jpg',
                uri:imageURI
            }as any);
        });

        await api.post("orphanages",data);
        navigation.navigate("OrphanagesMap");

    }

    async function handleSelectImages(){
    
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
    
        if(status != 'granted'){
            alert('Precisamos de acesso as suas fotos...');
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            quality:1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });
    
        if(result.cancelled){
            return;
        }
    
        const  {uri} = result;
        setImagesURI([...imagesURI, uri]);
    
    }

    return(
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Dados</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput 
            style={styles.input}
            value={name}
            onChangeText={text=>setName(text)}/>

            <Text style={styles.label}>Sobre</Text>
            <TextInput 
            multiline 
            style={[styles.input,{height:110}]}
            value={about}
            onChangeText={text=>setAbout(text)}/>
            

            <Text style={styles.label}>Numero de Whatsapp</Text>
            <TextInput style={styles.input}/>
           

            <Text style={styles.label}>Fotos</Text>
            {imagesURI.map(imgURI =>{
                return(
                    <Image key={imgURI} 
                    source={{uri:imgURI}} 
                    style={styles.uploadImage}/>
                );
            })}
            <TouchableOpacity style={styles.imagensIput} onPress={handleSelectImages}>
                <Feather name="plus" size={24} color="#15b6d6"/>
            </TouchableOpacity>

            <Text style={styles.title}>Visitação</Text>
            <Text style={styles.label}>About</Text>
            <TextInput multiline style={[styles.input,{height:110}]}/>

            <Text style={styles.label}>Instruções</Text>
            <TextInput 
            multiline 
            style={[styles.input,{height:110}]}
            value={instructions}
            onChangeText={setInstructions}/>

            <Text style={styles.label}>Horário de visitas</Text>
            <TextInput 
            style={styles.input}
            value={openingHours}
            onChangeText={setOpeningHours}/>

            <View style={styles.switchContainer}>
                <Text style={styles.label}>Atende no final de semana?</Text>
                <Switch
                   thumbColor="fff"
                   trackColor={{false:'#ccc', true:'#39cc83'}}
                   value={openOnWeekends}
                   onValueChange={setOpenOnWeekends}
                />
            </View>
            <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
                <Text>Cadastrar</Text>
            </RectButton>
           

        </ScrollView>

    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 8
        

    },
    title:{
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: "#D3E2E6"

    },
    label:{
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8,

    },
    input:{
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#D3E2E6',
        borderRadius: 20,
        height: 56,
        paddingVertical:18,
        paddingHorizontal:24,
        marginBottom:8,
        textAlignVertical:"top"

    },
    imagensIput:{
        backgroundColor: 'rgb(255,255,255)',
        borderStyle: 'dashed',
        borderColor: "#96D2F0",
        borderWidth: 1.4,
        borderRadius: 20,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,

    },

    uploadImage:{
        width:64,
        height:64,
        borderRightWidth:20,

    },

    switchContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },
    nextButton:{
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32,

    },
})

export default OrphanageData;