import React from 'react';
import { Icon } from 'native-base';
import Colors from '../constants/Colors';


const TabBarIcon = ({ focused, IconName, IconType }) => {
	return (
		<Icon 
      name={ IconName } 
      type={ IconType } 
      size={26}
      style={{ 
        marginBottom: -3,
        color: focused ? Colors.tabIconSelected : Colors.tabIconDefault
      }}
    />
	)
}

export default TabBarIcon;