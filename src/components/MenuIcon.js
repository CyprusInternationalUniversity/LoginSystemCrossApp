import React from 'react';
import { Icon } from 'native-base';
import Colors from '../constants/Colors';

const MenuIcon = () => {
	return (
		<Icon 
      name="menu"
      type="Feather"
      size={30}
      style={{
        color: Colors.tabIconSelected
      }}
    />
	)
}

export default MenuIcon;