import React from 'react';
import {Link} from 'react-router-dom';
import logo from './../../uiPictures/logo-web.svg';
import styles from './SideBar.module.scss';


import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

export const SideBar = () => {

    const [currentPage, setCurrentPage] = React.useState();

    const capitalize = (s) => { 
        var replaced = s.replace(/(-.)/g, x=> ' ' + x[1]);
        return replaced.charAt(0).toUpperCase() + replaced.slice(1);
    }

    function pressButton(id){document.getElementById(id)?.setAttribute("class", styles.buttonPressed)}

    function unpressButton(id){document.getElementById(id)?.setAttribute("class", styles.button)}

    return (
    <Sidebar style={{ height: "100vh", width: "400px", backgroundColor : "rgb(180,180,180)", borderTop: "solid black 2px"}}>
        <Menu>
            <div className={styles.button}>
            <MenuItem>
            <div className={styles.logoBox}>
                <img className={styles.imageLogo} src={logo} alt="Not found" />
                <div className={styles.textLogo}>Admin panel</div>
            </div>
            </MenuItem>
            </div>
            {["edit-images", "edit-series-descriptions", "edit-journal", "edit-pages-descriptions"]
            .map((page)=> {return (
                <div id={page} className={styles.button} onClick={() => {pressButton(page); unpressButton(currentPage); setCurrentPage(page)}}>
                <MenuItem>
                    <Link to={`/${page}`}>
                        <div className={styles.sideBarLink}>{capitalize(page)}</div>
                    </Link>
                </MenuItem>
                </div>)})}
        </Menu>
        </Sidebar>
    );
};