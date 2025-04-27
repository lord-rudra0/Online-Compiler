"use client"

import { useState } from "react"
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../ui/resizable-navbar"

export default function NavbarDemo() {
  const navItems = [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="navbar-container">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="navbar-buttons">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span className="mobile-nav-text">{item.name}</span>
              </a>
            ))}
            <div className="mobile-buttons">
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="mobile-button">
                Login
              </NavbarButton>
              <NavbarButton onClick={() => setIsMobileMenuOpen(false)} variant="primary" className="mobile-button">
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div style={{ height: "200vh" }}>
        {/* This empty div is just to enable scrolling for demo purposes */}
        {/* You can replace this with your own content */}
      </div>
    </div>
  )
}
