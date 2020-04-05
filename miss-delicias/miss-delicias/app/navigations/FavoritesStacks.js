import { createStackNavigator } from 'react-navigation-stack';
import FavoriteScreen from '../screens/Favorites';

const FavoriteScreeStack = createStackNavigator({
    Favorites:{
        screen:FavoriteScreen,
        navigationOptions:()=> ({
            title:"Restaurantes favoritos"
        })
        
    }
}); 

export default FavoriteScreeStack;