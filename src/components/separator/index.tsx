import { ColorValue, View } from "react-native";
import { s } from "./styles";


export function Separator({color}:{color: ColorValue}){
    return <View style={[s.container, {backgroundColor: color}]}/>
}