function Footer() {
    let date = new Date();
    let thisYear = date.getFullYear();
    return (
        <footer className="footer">
            <p className="footer__author">&copy; {thisYear}. Mesto Russia</p>
        </footer>
    );
}

export default Footer;
