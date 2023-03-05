import { ProSidebarProvider } from 'react-pro-sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const LeftSidebar = () => {
  return (
    <div style={({height: "100%"})}>
        {/* <nav>
          <img width="200" alt="icon" src={home_2} />
          <Link to="/"><h2>Home</h2></Link>
          <Link to="/one"><h2>Stand</h2></Link>
          <Link to="/two"><h2>Sit</h2></Link>
        </nav> */}

      <Sidebar>
        <Menu>
          <SubMenu label="Charts">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu>
          <MenuItem> Documentation </MenuItem>
          <MenuItem> Calendar </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}

export default LeftSidebar
