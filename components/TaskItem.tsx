import { Task } from "@/interface/Task";
import Checkbox from "expo-checkbox";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

interface TaskItemProps{
    task:Task;
    onToggle: (id:string)=>void;
    onDelete:(id:string)=>void;
}

const TaskItem:React.FC<TaskItemProps> =({task , onToggle , onDelete})=>(
    <View style={styles.conatiner}>
        <Checkbox value={task.completed} onValueChange={()=>onToggle(task.id)}/>
            <View style={styles.textContainer}>
                <Text style={[styles.title ,task.completed && styles.completed]} numberOfLines={1}>
                  {task.title}
                </Text>
                {task.description && <Text style={styles.description}>
                     {task.description}
                    </Text>}
            </View>
            <TouchableOpacity onPress={()=> onDelete(task.id)}>
                 <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    conatiner:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:"#eee"
    },
    textContainer:{
        flex:1,
        marginLeft:10
    },
    title:{
        fontSize:15
    },
    description:{
        fontSize:12,
        color:"#666"
    },
    completed:{
        textDecorationLine:'line-through',
        color:'#666'
    },
    delete:{
        fontSize:20
    }
})

export default TaskItem;