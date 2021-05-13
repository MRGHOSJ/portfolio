import React from 'react'
import $ from "jquery"

const Sidebar = (props) => {

    const handleSidebarClicked = (category) => {
        props.chosenCategory(category)
        $("#"+props.activeCategory).removeClass("active")
        $("#"+category).addClass("active")
    }

    return(
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <a className="sidebar-brand d-flex align-items-center justify-content-center pointer" id="landingPage" onClick={(e)=>handleSidebarClicked(e.target.id)}>
                <div className="sidebar-brand-text mx-3" id="landingPage">Dashboard</div>
            </a>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseInterface">
                    <span>Interface</span>
                </a>
            </div>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="home">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseTwo" id="home">
                    <i className="material-icons icon" id="home">home</i>
                    <span id="home">Home</span>
                </a>
            </li>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="about">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseUtilities" id="about">
                    <i className="material-icons icon" id="about">person</i>
                    <span id="about">About me</span>
                </a>
            </li>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="gallery">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseTwo" id="gallery">
                    <i className="material-icons icon" id="gallery">photo_camera</i>
                    <span id="gallery">Gallery</span>
                </a>
            </li>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="contact">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseUtilities" id="contact">
                    <i className="material-icons icon" id="contact">contact_support</i>
                    <span id="contact">Contact</span>
                </a>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseInterface">
                    <span>User Interface</span>
                </a>
            </div>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="settings">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapsePages" id="settings">
                    <i className="material-icons icon" id="settings">settings</i>
                    <span id="settings">Settings</span>
                </a>
            </li>

            <hr className="sidebar-divider"/>

            <div className="sidebar-heading">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapseInterface">
                    <span>Users Requests</span>
                </a>
            </div>

            <li className="nav-item pointer" onClick={(e)=>handleSidebarClicked(e.target.id)} id="request">
                <a className="nav-link collapsed"
                    aria-expanded="true" aria-controls="collapsePages" id="request">
                    <i className="material-icons icon" id="request">help</i>
                    <span id="request">Requests</span>
                </a>
            </li>

        </ul>
    )
}

export default Sidebar