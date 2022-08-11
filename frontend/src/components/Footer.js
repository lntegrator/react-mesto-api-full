function Footer(){
  const year = new Date().getFullYear()
    return(
        <footer className="footer">
          <p className="footer__copyright">© {year} Support Ukraine</p>
      </footer>
    )
}

export default Footer;