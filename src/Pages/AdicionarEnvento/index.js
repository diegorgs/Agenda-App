import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AdicionarEvento({ navigation }) {

    //inputs
    const [descEvento, setDescEvento] = useState(null)



    //DATA PICKER
    const [date, setDate] = useState(new Date);
    const [time, setTime] = useState(new Date);
    const [mode, setMode] = useState('date');
    const [mode2, setMode2] = useState('time');
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [dataF, setDataF] = useState(null);
    const [timeF, setTimeF] = useState(null);
    const [datacomp, setDataComp] = useState(null);

    //RECEBENDO OS DADOS NO BANCO
    const [diaBD, setDiaBD] = useState(null);
    const [mesBD, setMesBD] = useState(null);
    const [anoBD, setAnoBD] = useState(null);

    async function inserirAgenda(desc, data) {
        if (anoBD && mesBD && diaBD && descEvento) {
            fetch('http://10.0.2.2:3000/api/agendacad', {
                method: "POST",
                body: `desc=${desc}&data=${data}`,
                headers: { "Content-type": "application/x-www-form-urlencoded" }
            })
                .then(response => response.json())
                .then(json => console.log(json));

            alert("Lembrete agendado!")
            navigation.navigate("VizualizarAgenda")


        } else {
            alert("Preencha todos os dados!!!")
        }

    }


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        FormatarData(currentDate)
        setShow2(true);

    };

    const onChange2 = (event, selectedDate) => {
        const currentDate2 = selectedDate;
        setShow2(false);
        FormatarTime(currentDate2);
    };


    function FormatarData(currentDate) {
        let dia = currentDate.getDate() > 9 ? currentDate.getDate() : "0" + currentDate.getDate();
        let mes = (currentDate.getMonth() + 1) > 9 ? currentDate.getMonth() + 1 : "0" + (currentDate.getMonth() + 1);
        let ano = (currentDate.getFullYear());
        setDataF(dia + "/" + mes + '/' + ano)

        setDiaBD(currentDate.getDate());
        setMesBD(currentDate.getMonth() + 1);
        setAnoBD(currentDate.getFullYear());

    }

    function FormatarTime(currentDate2) {
        let hora = currentDate2.getHours() < 9 ? "0" + currentDate2.getHours() : currentDate2.getHours();
        let minutos = currentDate2.getMinutes() < 9 ? "0" + currentDate2.getMinutes() : currentDate2.getMinutes();
        setTimeF(hora + ':' + minutos)
        FormatDataBanco(hora, minutos)

    }

    function FormatDataBanco(hora, minutos) {

        setDataComp(`${anoBD}-${mesBD}-${diaBD} ${hora}:${minutos}:00`)
        console.log(`${anoBD}-${mesBD}-${diaBD} ${hora}:${minutos}:00`)
        

    }

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };


    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        setShow2(true);
    };


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}
                style={styles.btnAbrirModal}>
                <Ionicons name="arrow-back" size={38} color="black" />
            </TouchableOpacity>
            <Text style={{ fontSize: 28, paddingTop: 60, alignSelf: 'center' }}>Agende um Lembrete</Text>

            <View style={{ paddingTop: 40, flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity style={styles.btnCalendario} onPress={showDatepicker}  >
                    <AntDesign name="calendar" size={70} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: 'white', textAlign: 'center' }}>Calendário</Text>
                </TouchableOpacity>
                <View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )}
                    {show2 && (
                        <DateTimePicker
                            testID="dateTimePicker2"
                            value={time}
                            mode={mode2}
                            is24Hour={true}
                            onChange={onChange2}
                        />
                    )}

                </View>
                <TouchableOpacity style={styles.btnRelogio} onPress={showTimepicker}>
                    <AntDesign name="clockcircleo" size={70} color="white" />
                    <Text style={{ fontWeight: '500', fontSize: 18, color: 'white', textAlign: 'center' }}>Horário</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.btnTimeList}>
                    <Text style={{ color: 'white', fontSize: 25 }}>Dia :  {dataF}</Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>Às :  {timeF}</Text>
                    <TextInput
                        style={styles.inputObs}
                        value={descEvento}
                        onChangeText={setDescEvento}
                        placeholder={'Descrição'}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnInserirLembrete} onPress={() => inserirAgenda(descEvento, datacomp)}>
                    <Text style={{ fontWeight: '500', fontSize: 18, color: 'white', textAlign: 'center' }} >Adicionar +</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textTitle: {
        marginStart: 20,
        fontSize: 30,
        fontWeight: '500',
        color: 'black',
        fontFamily: 'Roboto'
    },

    btnCalendario: {
        width: '45%',
        height: 150,
        backgroundColor: '#BAA207',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        elevation: 6
    },
    btnInserirLembrete: {
        width: '30%',
        height: 60,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 20,



    },
    btnRelogio: {
        width: '45%',
        height: 150,
        backgroundColor: '#18549E',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        elevation: 6,
    },
    btnTimeList: {
        marginVertical: 20,
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginHorizontal: 20,
        backgroundColor: '#505050',
        borderRadius: 20,


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

    // input: {
    //     width: '80%',
    //     height: 60,
    //     fontSize: 26,
    //     borderWidth: 2,
    //     borderRadius: 16,
    //     alignSelf: 'center',
    //     marginTop: 15,
    //     textAlign: 'center'
    // },
    inputObs: {
        width: '100%',
        height: 50,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 16,
        alignSelf: 'center',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: '#fff'
    }
})