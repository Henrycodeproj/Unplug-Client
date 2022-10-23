import Switch from '@mui/material/Switch';
import { useState } from 'react';


export const LeftSideSettingsMenu = () => {

    const [checked, setChecked] = useState(false);  
    const [accessiblity, setAccessibility] = useState(false); 

    const handleChange = (event) => {
      setChecked(event.target.checked);
    };
    const handleAccessibilityChange = (event) => {
      setAccessibility(event.target.checked);
    };   

    return (
      <div className='left_menu_options'>
        <div style = {{display:"flex", alignItems:"center", gap:"5%"}}>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          label="Gilad Gray"
          color="secondary"
        />
        <h4 style = {{color:"white"}}>Dark Mode</h4>
        </div>
        <div style = {{display:"flex", alignItems:"center", gap:"5%"}}>
        <Switch
          checked={accessiblity}
          onChange={handleAccessibilityChange}
          inputProps={{ 'aria-label': 'controlled' }}
          label="Gilad Gray"
          color="secondary"
        />
        <h4 style = {{color:"white"}}>Accessibility</h4>
        </div>
      </div>
    )
}
