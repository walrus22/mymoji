import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/"/>}> Home </MenuItem>
          {/* <MenuItem component={<Link to="/search"/>}> Search </MenuItem> */}
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default LeftSidebar
