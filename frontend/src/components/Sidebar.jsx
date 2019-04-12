import React from 'react'

// import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import Button from 'react-bootstrap/Button'


const Sidebar = () => (
    // <div className="col-xl-2 col-md-3 col-12 SideNav">
    <div>
        <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/home">Active</Nav.Link>
            <Nav.Link eventKey="link-1">Link</Nav.Link>
            <Nav.Link eventKey="link-2">Link</Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
                Disabled
            </Nav.Link>
        </Nav>
    </div>
);

// const Sidebar = () => (
//     <div>
//         <nav id="sidebar">
//             <div class="sidebar-header">
//                 <h3>Collapsible Sidebar</h3>
//             </div>

//             <ul class="list-unstyled components">
//                 <li class="active"><a href="#">Home</a></li>
//                 <li><a href="#">About</a></li>
//                 <li>
//                     <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false">Pages</a>
//                     <ul class="collapse list-unstyled" id="homeSubmenu">
//                         <li><a href="#">Page</a></li>
//                         <li><a href="#">Page</a></li>
//                         <li><a href="#">Page</a></li>
//                     </ul>
//                     <li><a href="#">Portfolio</a></li>
//                     <li><a href="#">Contact</a></li>
//                 </li>
//             </ul>
//         </nav>

//         <div id="content">
//             <button type="button" id="sidebarCollapse" class="navbar-btn">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </button>
//         </div>

//     </div>
// );


export default Sidebar