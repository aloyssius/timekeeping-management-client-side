import logo from '../assets/img/Blue Minimal Real Estate Free Logo.png'
import logoCollapse from '../assets/img/Blue Minimal Real Estate Free Logo child.png'
import { Link } from 'react-router-dom'

export const Logo = () => {

  return (
    <img src={logo} style={{ width: "130px", /* marginTop: "25px", */ marginLeft: "15px" }} />
  )

}

export const LogoMobile = () => {

  return (
    <Link to='/'>
      <img src={logo} style={{ width: "255px" }} />
    </Link>
  )

}

export const LogoCollapse = () => {

  return (
    // <Link to='/'>
    <img src={logoCollapse} style={{ width: "50px"/* , marginTop: "25px"  */ }} />
    // </Link>
  )

}
