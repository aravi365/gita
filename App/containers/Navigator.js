import { StackNavigator,DrawerNavigator,TabNavigator,SwitchNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import SecondScreen from './SecondScreen'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import SplashScreen from './SplashScreen'

const Tabs = TabNavigator({
    Tab1:{screen:Tab1},
    Tab2:{screen:Tab2},
    Tab3:{screen:Tab3},

    
})
const HomeStack = StackNavigator({
    HomeScreen:{screen:HomeScreen},
    SecondScreen:{screen:SecondScreen}
},
{
    navigationOptions:{header:null}
}
)
const drawer= DrawerNavigator({
    Home:{screen:HomeStack},
    Tabs
},
{
    navigationOptions:{header:null}
}

)

export default SwitchNavigator({
    SplashScreen:{screen:SplashScreen},
    drawer
},
{
    navigationOptions:{header:null}
})