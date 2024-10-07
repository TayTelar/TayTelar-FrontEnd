import "../../../assets/customer/sass/components/_topbar.scss"

const TopBar = () => {
    return (
        <div className="topbar">
            <div className="topbar_container">
                <div className="topbar_container_section">
                    <div className="topbar_container_section_left">
                        <p>
                            <i className="fa-solid fa-phone fa-sm"></i>+91 7349368311
                        </p>
                        <p className="email">
                            <i className="fa-solid fa-envelope"></i>
                            <a href="mailto: info@seabed2crest.com">info@seabed2crest.com</a>
                        </p>

                    </div>
                    <div className="topbar_container_section_right">
                        <div className="social_media">
                            <a
                                href="https://www.facebook.com/profile.php?id=61553225352683"
                                target="_blank"
                            >
                                <i className="fa-brands fa-facebook fa-md"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/nandu-bus-2755622aa/"
                                target="_blank"
                            >
                                <i className="fa-brands fa-linkedin fa-md"></i>
                            </a>
                            <a href="https://twitter.com/NanduBus" target="_blank">
                                <i className="fa-brands fa-x-twitter fa-md"></i>
                            </a>
                            <a href="https://www.instagram.com/nandu_bus/" target="_blank">
                                <i className="fa-brands fa-instagram fa-md"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TopBar