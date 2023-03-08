import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom"
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <div id='root-container'>
      <main>
        <LeftSidebar/>
        <div id='main-container'>
          <header>header</header>
          <Outlet/>
        </div>
      </main>
      <footer>footer</footer>
    </div>
  )
}

export default MainLayout
