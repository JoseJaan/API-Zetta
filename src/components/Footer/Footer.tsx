import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">
            &copy; {currentYear} Zetta Lab - Books API. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;