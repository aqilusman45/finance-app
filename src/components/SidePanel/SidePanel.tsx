import React from 'react';
import { IAttribute } from '../../lib/attributes';
import "./SidePanel.css";

const SidePanel = ({ show, setShow, attribute }: {
    show: boolean;
    attribute?: IAttribute;
    setShow: (show: boolean) => void;
}) => {

    if (!attribute) return null

    const handleNav = () => {
        setShow(!show)
    }

    return (
        <div style={{
            width: show ? "100%" : "0%"
        }} className="sidenav">
            <button className="closebtn" onClick={handleNav}>&times;</button>
        </div>
    )
}

export default SidePanel;
