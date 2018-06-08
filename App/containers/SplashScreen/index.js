import React,{Component} from 'react'
import {View,Text,StatusBar,Animated} from 'react-native'
import { white } from 'ansi-colors';

export default class SplashScreen extends Component{

    
    componentDidMount=()=>{

        Animated.timing(this.state.opacity,{
            toValue:1,
            duration:1000
            
        }).start()


        Animated.timing(this.state.opacity2,{
            toValue:1,
            duration:1000,
            delay :1000
        }).start()
        setTimeout(()=>{
            this.props.navigation.navigate('drawer')
        }, 4000)
    }

    state={
        opacity:new Animated.Value(0),

        opacity2:new Animated.Value(0),
    
    }



    render(){
        return(
            <View style={{flex:1,backgroundColor:'orange'}}>
            <StatusBar hidden={true} />
            <Animated.View style={{flex:1,opacity:this.state.opacity,alignItems:'center',justifyContent:'center',backgroundColor:'orange'}}>
                <Text style={{fontFamily:'SAM',fontSize:60,color:'brown'}} onLayout={(e)=>{
                    
                }}>GITANSH</Text>
                <Animated.View  style={{flex:1,position:'absolute',opacity:this.state.opacity2,alignItems:'center',justifyContent:'center',backgroundColor:'orange'}}>
                <Text style={{fontFamily:'SAM',fontSize:60,color:'green'}}>GITANSH</Text>
            </Animated.View>
            </Animated.View>
           
                </View>
        )
    }
}