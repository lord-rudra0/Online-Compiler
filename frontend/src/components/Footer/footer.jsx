import React from "react";
import "./Footer.css"
function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div className="footer">
            <footer>
                <p>&copy; {currentYear} . All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;
