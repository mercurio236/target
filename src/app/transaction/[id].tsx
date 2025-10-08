import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";


export default function Transaction(){
    const params = useLocalSearchParams<{ id: string }>()
    return(
        <View></View>
    )
}