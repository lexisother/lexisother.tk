import {differenceInYears, format as formatDate} from "date-fns";
import {StaticImage} from "gatsby-plugin-image";
import React from "react";
import {FiGithub, FiTwitter} from "react-icons/fi";
import Link from "./shared/Link";
import Page from "./shared/Page";
import BuildData from "./shared/SiteBuildData";

export default function HomePage() {
    const myAge = differenceInYears(new Date(), new Date(2005, 12, 29));
    const buildData = BuildData();

    return (
        <Page>
            <figure className="avatar">
                <StaticImage
                    className="avatar-image"
                    src="./images/photo.png"
                    width={128}
                    height={128}
                    placeholder="blurred"
                    alt="Alyxia Sother"
                />
            </figure>

            <hr />

            <div>
                <p>Hi! I'm Alyxia Sother, and I'm a {myAge} y/o hobbyist software developer.</p>
            </div>

            <hr />

            <div className="social-links">
                <Link className="social-link" href="https://github.com/lexisother">
                    <FiGithub className="social-icon" />
                </Link>
                <Link className="social-link" href="https://twitter.com/lexisother">
                    <FiTwitter className="social-icon" />
                </Link>
            </div>
            <footer>
                <br />
                Site built on {formatDate(Date.parse(buildData.buildTime), "PPPP 'at' ppp")}
            </footer>
        </Page>
    );
}
