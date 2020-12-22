import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

import OrphanagesMaps from './pages/OrphanagesMaps';
import OrphanageDetails from './pages/OrphanageDetails';
import OrphanageData from './pages/CreateOrphanage/OrphanageData';
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition';
import Header from './components/Heder';

const {Navigator, Screen} = createStackNavigator();
const Routes : React.FC = ()=>{
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#f2f3f5'}}}>
                <Screen name="OrphanagesMap" component={OrphanagesMaps}/>
                <Screen 
                    name="OrphanageDetails" 
                    component={OrphanageDetails}
                    options={{
                        headerShown:true,
                        header:() => <Header title="Informe os dados" showX={false}/>
                    }}/>
                <Screen 
                    name="SelectMapPosition" 
                    component={SelectMapPosition}
                    options={{
                        headerShown:true,
                        header:() => <Header title="Selecione o mapa"/>
                    }}/>
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown:true,
                        header:() => <Header title="Informe os dados"/>
                    }}/>
                
            </Navigator>
        </NavigationContainer>

    );
}

export default Routes;