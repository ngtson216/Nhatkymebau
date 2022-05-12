import React from 'react'
import Header from './container/Header/header'
import Footer from './container/Footer'
import GlobalStyles from './container/GlobalStyles'
import WrapperStyles from './container/Wrapper'
import NavBarAdmin from './container/NavBar/navAdmin'
import NavBarCSYT from './container/NavBar/navCSYT'
import NavBarBYT from './container/NavBar/navBYT'
import NavBarUser from './container/NavBar/navUser'
import Form from './container/FormDNDK'
import HeaderWhenLogged from './container/Header/headerWhenLogged'

export default function App() {
  const isLogin = localStorage.getItem('token');
  const roles = localStorage.getItem('roles');
  if (!isLogin) {
    return (
      <GlobalStyles>
        <Header />
        <WrapperStyles>
          <Form />
        </WrapperStyles>
        <Footer />
      </GlobalStyles>
    )
  }
  else {
    // eslint-disable-next-line default-case
    switch (roles) {
      case 'Admin':
        return (
          <GlobalStyles>
            <HeaderWhenLogged/>
            <WrapperStyles>
              <NavBarAdmin />
            </WrapperStyles>
            <Footer />
          </GlobalStyles >
        )
      // eslint-disable-next-line no-duplicate-case
      case 'Boss':
        return (
          <GlobalStyles>
            <HeaderWhenLogged/>
            <WrapperStyles>
              <NavBarBYT />
            </WrapperStyles>
            <Footer />
          </GlobalStyles >
        )
      // eslint-disable-next-line no-duplicate-case
      case 'Mod':
        return (
          <GlobalStyles>
            <HeaderWhenLogged/>
            <WrapperStyles>
              <NavBarCSYT />
            </WrapperStyles>
            <Footer />
          </GlobalStyles >
        )
      // eslint-disable-next-line no-duplicate-case
      case 'User':
        return (
          <GlobalStyles>
            <HeaderWhenLogged/>
            <WrapperStyles>
              <NavBarUser />
            </WrapperStyles>
            <Footer />
          </GlobalStyles >
        )
    }
  }
}

