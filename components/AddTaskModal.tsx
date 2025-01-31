import { useState } from "react";
import { Button, Text, TextInput } from "react-native";
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
           <View style={styles.mnodalContainer}>
              <Text style={styles.title}>Add new Task</Text>

              <TextInput 
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput 
                style={[styles.input , styles.multiline]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
              />
             <View style={styles.buttonContainer}>
                  <Button title="Cancel" onPress={onClose} />
                  <Button title="Add Task" onPress={handleSubmit} />
             </View>
           </View>
        </Modal>
    )
}

const styles= StyleSheet.create({
    mnodalContainer:{
        flex:1,
        padding:20,
        justifyContent:'center',

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