import { View, Text, StyleSheet, Button, FlatList ,Animated, SafeAreaView ,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Task } from '@/interface/Task'
import TaskItem from '@/components/TaskItem';
import { loadTask, saveTask } from '@/utils/storage';
import AddTaskModal from '@/components/AddTaskModal';
import { Picker } from '@react-native-picker/picker';


export default function  index () {
    const [task , setTask]=useState<Task[]>([]);

    const [modalVisible, setModalVisible]=useState(false);

    const [ filter , setFilter]=useState<'all' | 'completed' | 'pending'>('all');

const fadeAnim = useState( new Animated.Value(0))[0];

    useEffect(()=>{
      const initialize = async()=>{
          const savedTask = await loadTask();
          setTask(savedTask);
      }
      initialize();

    },[]);

    useEffect(()=>{
     saveTask(task)
    }, [task]);

    const addTask = (title:string , description:string)=>{
        setTask(prev=>[
            ...prev,
            {
                id:Date.now().toString(),
                title,
                description,
                completed:false
            }
        ])

        fadeAnim.setValue(0);
        Animated.timing(fadeAnim,{
            toValue:1,
            duration:500,
            useNativeDriver:true,
        }).start();
    }

    const toggleTask =(id:string)=>{
        setTask(prev=>prev.map(task=> task.id === id ? {...task , completed:!task.completed}:task))
    }

    const deleteTask =(id:string)=>{
        setTask(prev=>prev.filter(task=>task.id !== id))
    }


    const filteredTask = task.filter(task=>{
       if(filter === "completed") return task.completed;
       if(filter === "pending") return !task.completed;
       return true;
    })
  return (
<SafeAreaView style={styles.container}>
            <Button title='Add Task' onPress={() => setModalVisible(true)} />
            
            <Picker
                style={[
                    styles.picker,
                    Platform.OS === 'ios' && styles.iosPicker
                ]}
                selectedValue={filter}
                onValueChange={(value) => setFilter(value)}
            >
                <Picker.Item label='All' value="all" />
                <Picker.Item label='Completed' value="completed" />
                <Picker.Item label='Pending' value="pending" />
            </Picker>

            <FlatList
                data={filteredTask}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
                    </Animated.View>
                )}
                contentContainerStyle={styles.list}
            />
            
            <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} onSubmit={addTask} />
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 20 : 50,
        paddingHorizontal: 20
    },
    list:{
        paddingBottom:20
    },
    title:{
        fontSize:23,
        color:"black"
    },
    picker:{
marginVertical:10,
backgroundColor:'#f0f0f0',
borderRadius:6
    },
    iosPicker: {
        backgroundColor: 'white',
        marginVertical: 15,
        transform: [{ scale: 0.9 }]
    }
})