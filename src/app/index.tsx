import { Text, View } from "react-native";
import { HomeHeader } from "../components/home-header";

export default function Index(){
    return(
        <View style={{flex:1}}>
            <HomeHeader data={{total:'R$ 2.680,00'}}/>
        </View>
    )
}