import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom"
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <Fragment>
      <header></header>
        <LeftSidebar/>
        <main>
          <Outlet/>
        </main>

    </Fragment>
  )
}

export default MainLayout
