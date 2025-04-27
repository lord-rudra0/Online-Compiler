import React from "react";

function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <div>
            <footer className="footer">
                <p>&copy; {currentYear} . All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Footer;
