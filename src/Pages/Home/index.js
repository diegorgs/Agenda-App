import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";

//import DateTimePicker from '@react-native-community/datetimepicker';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.divTop}>
                <Text style={styles.textTitle}>Agenda</Text>
            </View>
            <View style={styles.divMain}>
                <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('AdicionarEvento')}>
                    <Ionicons name="add" size={74} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#fff', textAlign: 'center' }}>Adicionar Eventos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnMenu} onPress={() => navigation.navigate('VizualizarAgenda')}>
                    <AntDesign name="calendar" size={76} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#fff', textAlign: 'center' }}>Vizualizar Agenda</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.divFinanças}>
                <Text style={styles.textTitle}>Financeiro</Text>
            </View>
            <View style={styles.divMain2}>
                <TouchableOpacity style={styles.btnFinancas}>
                    <MaterialCommunityIcons name="finance" size={74} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#fff', textAlign: 'center' }}> Adicionar Finanças</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnFinancas}>
                    <Entypo name="credit" size={74} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: '#fff', textAlign: 'center' }}>Vizualizar Finanças</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    divTop: {
        paddingTop: 50,
        height: 100,

    },
    textTitle: {
        marginStart: 20,
        fontSize: 30,
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Roboto'
    },
    divMain: {
        width: '100%',
        height: 220,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 30

    },
    divMain2: {
        width: '100%',
        height: 260,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    btnMenu: {
        width: '40%',
        height: 150,
        backgroundColor: '#7715E8',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        elevation: 6
    },
    btnFinancas: {
        width: '40%',
        height: 150,
        backgroundColor: '#BAA207',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        elevation: 6
    },
    divFinanças: {
        paddingBottom: 30,
    },
})