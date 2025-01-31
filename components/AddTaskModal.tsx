import { useState } from "react";
import { Button, SafeAreaView, Text, TextInput,Platform } from "react-native";
import { Modal, StyleSheet, View } from "react-native";

interface AddTaskModalProps{
    visible:boolean;
    onClose:()=>void;
    onSubmit:(title:string, description:string)=>void;
}

const AddTaskModal:React.FC<AddTaskModalProps> =({visible , onClose , onSubmit})=>{
    const [title , setTitle]=useState('');
    const [description , setDescription]=useState('');

    const handleSubmit =()=>{
        if(!title.trim()) return ;
        onSubmit(title , description);
        setTitle('');
        setDescription('')
        onClose();
    }
    return (
        <Modal visible={visible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.title}>Add new Task</Text>

            <TextInput
                style={[styles.input, Platform.OS === 'ios' && styles.iosInput]}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[
                    styles.input,
                    styles.multiline,
                    Platform.OS === 'ios' && styles.iosInput
                ]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            
            <View style={styles.buttonContainer}>
                <Button title="Cancel" onPress={onClose} color="#666" />
                <Button title="Add Task" onPress={handleSubmit} />
            </View>
        </SafeAreaView>
    </Modal>
    )
}

const styles= StyleSheet.create({
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    iosInput: {
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12
    },
    title:{
        fontSize:20,
        marginBottom:20,
        textAlign:"center"
    },
    input:{
        borderWidth:1,
        borderColor:"#ddd",
        padding:10,
        marginBottom:10,
        borderRadius:5
    },
    multiline:{
        height:100,
        textAlignVertical:'top',
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    }
})
export default AddTaskModal