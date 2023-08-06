import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language) => {
    i18n.changeLanguage(language)
    // console.log('i18n.changeLanguage: ', i18n.changeLanguage); //to change language
  }

  // console.log('i18n.language: ', i18n.language); //get current language

  return (
    <>
      <NavDropdown title={i18n.language === 'vi' ? 'Vietnamese' : 'English'} id="basic-nav-dropdown2" className='language'>
        {/* <NavDropdown.Item>Log in</NavDropdown.Item> */}
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Vietnamese</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default Language