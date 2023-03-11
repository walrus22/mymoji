import { Fragment, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import LeftSidebar from './LeftSidebar';



const MainLayout = () => {
  const [scrollend, setScrollend] = useState<boolean>(true);

  const handleScroll = (e:any) => {
    const {scrollHeight, scrollTop, clientHeight} = e.target;
    // const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 100;
    // const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight * 1.3;
    // console.log(typeof e);
    // console.log(e);
    // console.log( e.target.scrollHeight );
    // console.log(  e.target.scrollTop );
    // console.log( e.target.clientHeight);
    console.log(Math.abs(scrollHeight - clientHeight - scrollTop));

    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
      console.log("bottom")
      // console.log(scrollend);
      setScrollend(true)
    } else if (scrollend) {
      // console.log(scrollend);
      setScrollend(false)
    }
  }

  // const childRef = React.createRef();
  // const callChildFunction = () => {
  //   childRef.current!.childFunction();
  // };

  const handleClick = () => {
    console.log("main:"+scrollend)
    setScrollend(!scrollend)
  }


  return (
    <Fragment>
      <main>
        <LeftSidebar/>
        <div id='content-container' onScroll={handleScroll} >
          <div style={{height:'30px'}}>
            <header style={{color:'white'}}>header</header>
            {/* <button style={{color:'black'}} onClick={handleClick} >123</button> */}
          </div>
          <Outlet context={[scrollend, setScrollend]}/>
        </div>
      </main>
      <footer>footer</footer>
    </Fragment>
  )
}

export default MainLayout
