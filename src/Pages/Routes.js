import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import AdicionarEvento from './AdicionarEnvento';
import VizualizarAgenda from './VizualizarEventos';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
       <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
         <Stack.Screen options={{headerShown: false}} name="AdicionarEvento" component={AdicionarEvento} />
         <Stack.Screen options={{headerShown: false}} name="VizualizarAgenda" component={VizualizarAgenda} />
       </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;