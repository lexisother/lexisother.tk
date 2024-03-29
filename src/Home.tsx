import {Octokit} from "@octokit/rest";
import {differenceInYears, format as formatDate} from "date-fns";
import {StaticImage} from "gatsby-plugin-image";
import React, {useEffect, useState} from "react";
import {FiGithub, FiTwitter} from "react-icons/fi";
import Link from "./shared/Link";
import Page from "./shared/Page";
import getBuildData from "./shared/SiteBuildData";

export default function HomePage(): JSX.Element {
    const myAge = differenceInYears(new Date(), new Date(2005, 12, 29));
    const buildData = getBuildData();

    const [bio, setBio] = useState();
    useEffect(() => {
        const github = new Octokit();
        github
            .request("GET /users/{username}", {
                username: "lexisother"
            })
            .then((user) => {
                user.data.bio = `"${user.data.bio}"`;
                setBio(user.data.bio);
            });
    });

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
                <p className="quote">
                    <i>{bio}</i>
                </p>
            </figure>

            <hr />

            <div>
                <p>
                    Hi! I'm Alyxia, known online as Lexi. I'm a {myAge} y/o hobbyist software developer based in the
                    Netherlands.
                </p>

                <p>
                    Most of my work is in TypeScript, though I've been picking up PHP. I'm mostly interested in Discord
                    bot development / client modifications, and web applications.
                </p>

                <p>
                    Although my work isn't all that professional, aside from software development, I'm also into
                    composing music, playing the piano and the guitar.
                </p>
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
