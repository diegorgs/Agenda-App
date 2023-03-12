import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, FlatList, Button } from 'react-native';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";


export default function VizualizarAgenda({ navigation }) {


    const [listaAgenda, setListaAgenda] = useState([]);



    async function acharVeiculo() {
        let res = await fetch(`http://10.0.2.2:3000/api/agendaexibir`)
        let retorno = await res.json()
        const lista = retorno.result
        setListaAgenda(lista)

    }
    acharVeiculo();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
                style={styles.btnAbrirModal}>
                <Ionicons name="arrow-back" size={38} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 28, paddingTop: 65, alignSelf: 'center' }}>Vizualizar Lembretes</Text>
            <View style={styles.divTopo}>
                <Text style={{ fontSize: 20, color: 'white', marginLeft: 10, marginTop: 10 }}>Buscar:</Text>
            </View>

            <FlatList

                style={{ marginVertical: 20 }}
                showsVerticalScrollIndicator={false}
                data={listaAgenda}
                keyExtractor={(item) => item.id}
                id='f'
                renderItem={({ item }) => {
                    return (
                        <View style={styles.divMain} id={'v' + item.id}>
                            {item.rank == 1 ? <Text id={'t1' + item.id} style={{ color: 'red', fontSize: 25 }}> Mes {item.mes}</Text> : null}
                            <TouchableOpacity
                                id={'to' + item.id}
                                style={styles.btnTimeList}>
                                <Text id={'t2' + item.id} style={{ color: 'white', fontSize: 25 }}>Dia : {item.data} </Text>
                                <Text id={'t3' + item.id} style={{ color: 'white', fontSize: 20 }}>Às : {item.hora}  </Text>
                                <Text id={'t4' + item.id} style={{ color: 'white', fontSize: 20 }}>{item.desc}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />


        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    divTopo: {
        backgroundColor: 'grey',
        marginTop: 30,
        borderRadius: 20,
        marginHorizontal: 20,
        height: 100
    },
    divMain: {
        marginVertical: 10,


    },
    btnProcurar: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        margin: 20,
        borderRadius: 10
    },
    divSelecionarData: {
        height: 50,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignSelf: 'center',


    },
    btnAbrirModal: {
        width: 48,
        height: 48,
        backgroundColor: '#d1d1d1',
        borderRadius: 24,
        position: 'absolute',
        left: 10,
        top: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        height: 40,
        fontSize: 26,
        borderWidth: 2,
        borderRadius: 16,
        alignSelf: 'center',
        textAlign: 'center',
        backgroundColor: 'white'
    },
    btnTimeList: {
        marginVertical: 10,
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#505050',
        borderRadius: 20,


    },


})