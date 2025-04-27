"use client"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"
import React, { useRef, useState } from "react"
import "./navbar.css"

export const Navbar = ({ children, className }) => {
  const ref = useRef(null)
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  })

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={`navbar ${className || ""}`}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? React.cloneElement(child, { visible }) : child,
      )}
    </motion.div>
  )
}

export const NavBody = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={`nav-body ${visible ? "nav-body-visible" : ""} ${className || ""}`}
    >
      {children}
    </motion.div>
  )
}

export const NavItems = ({ items, className, onItemClick }) => {
  const [hovered, setHovered] = useState(null)

  return (
    <motion.div onMouseLeave={() => setHovered(null)} className={`nav-items ${className || ""}`}>
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="nav-item"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && <motion.div layoutId="hovered" className="nav-item-hover" />}
          <span className="nav-item-text">{item.name}</span>
        </a>
      ))}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={`mobile-nav ${visible ? "mobile-nav-visible" : ""} ${className || ""}`}
    >
      {children}
    </motion.div>
  )
}

export const MobileNavHeader = ({ children, className }) => {
  return <div className={`mobile-nav-header ${className || ""}`}>{children}</div>
}

export const MobileNavMenu = ({ children, className, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`mobile-nav-menu ${className || ""}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({ isOpen, onClick }) => {
  return isOpen ? (
    <IconX className="mobile-nav-icon" onClick={onClick} />
  ) : (
    <IconMenu2 className="mobile-nav-icon" onClick={onClick} />
  )
}

export const NavbarLogo = () => {
  return (
    <a href="#" className="navbar-logo">
      <img src="https://assets.aceternity.com/logo-dark.png" alt="logo" width={30} height={30} />
      <span className="navbar-logo-text">Startup</span>
    </a>
  )
}

export const NavbarButton = ({ href, as: Tag = "a", children, className, variant = "primary", ...props }) => {
  const getButtonClass = () => {
    let buttonClass = "navbar-button"

    if (variant === "primary") buttonClass += " navbar-button-primary"
    if (variant === "secondary") buttonClass += " navbar-button-secondary"
    if (variant === "dark") buttonClass += " navbar-button-dark"
    if (variant === "gradient") buttonClass += " navbar-button-gradient"

    if (className) buttonClass += ` ${className}`

    return buttonClass
  }

  return (
    <Tag href={href || undefined} className={getButtonClass()} {...props}>
      {children}
    </Tag>
  )
}
