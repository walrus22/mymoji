import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const LeftSidebar = () => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div>
      <Sidebar id='sidebar'>
        <Menu>
          <MenuItem
            id='menu-item'
            icon={<MenuOutlinedIcon />}
            onClick={() => {
              collapseSidebar();
            }}
            style={{ textAlign: "center" }}
          >
            {" "}
            <h2></h2>
          </MenuItem>

          <MenuItem id='menu-item' icon={<HomeOutlinedIcon/>} component={<Link to="/"/>}> Home</MenuItem>
          <MenuItem id='menu-item' icon={<SearchOutlinedIcon/>} component={<Link to="/search"/>}> Search </MenuItem>
          <MenuItem id='menu-item' icon={<SettingsOutlinedIcon/>} component={<Link to="/setting"/>}> Setting </MenuItem>
          <MenuItem id='menu-item' icon={<HelpOutlineOutlinedIcon/>} component={<Link to="/test"/>}> Help </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default LeftSidebar
