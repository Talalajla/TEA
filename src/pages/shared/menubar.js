import React, { useRef, useState } from 'react'
import { AiOutlinePlusCircle, AiOutlineRollback } from 'react-icons/ai';
import { IoMdMoon } from "react-icons/io"
import { BiCurrentLocation } from 'react-icons/bi';
import { BsCloudSun } from "react-icons/bs";
import { HiMenuAlt4 } from 'react-icons/hi';
import { RiSettings4Fill } from 'react-icons/ri';
import { MdPhotoLibrary } from 'react-icons/md';
import { useClickAway } from 'react-use';
import { MenuMoreWeatherInfo, MenuRow } from '../../styles/home/main';
import { Link } from 'react-router-dom';
import { FaKeyboard } from 'react-icons/fa';

const MenuBar = (props) => {

    const [openMenu, setOpenMenu] = useState(false);
    const menubarRef = useRef('');

    useClickAway(
        menubarRef,
        () => setOpenMenu(false), ['mouseup']
    );

    return (
        <div ref={menubarRef} onClick={() => setOpenMenu(!openMenu)} style={{ position: 'relative', display: 'flex' }}>
            <HiMenuAlt4 style={{filter: 'drop-shadow(0 0 1px rgb(0 0 0))'}} />
            <MenuMoreWeatherInfo show={openMenu} nopadd className='paddItems'>
                {props.page === "landing" &&
                <>
                <MenuRow onClick={props.addModal}>
                    <AiOutlinePlusCircle />
                    <span>Add new card</span>
                </MenuRow>
                <MenuRow onClick={props.changeCity}>
                    <BiCurrentLocation />
                    <span>Change current city</span>
                </MenuRow>
                <MenuRow as={Link} to="/weather">
                    <BsCloudSun />
                    <span>Weather for next days</span>
                </MenuRow>
                <MenuRow onClick={props.showShortcuts}>
                    <FaKeyboard />
                    <span>Shortcuts</span>
                </MenuRow>
                </>
                }
                <MenuRow onClick={props.changeBackground}>
                    <MdPhotoLibrary />
                    <span>Change background</span>
                </MenuRow>
                {props.page === "landing" && 
                <>
                <MenuRow onClick={props.configModal}>
                    <RiSettings4Fill />
                    <span>Settings</span>
                </MenuRow>
                </>
                }
                <MenuRow onClick={props.toggleDM}>
                    <IoMdMoon />
                    <span>Toggle Darkmode</span>
                </MenuRow>
                {props.page !== "landing" &&
                <>
                <MenuRow as={Link} to="/">
                    <AiOutlineRollback />
                    
                    <span>Back to start</span>
                </MenuRow>
                </>
                }
            </MenuMoreWeatherInfo>
        </div>
    );
}

export default MenuBar;