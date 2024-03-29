import React from "react";
import Helmet from "react-helmet";
import {getAbsoluteUrl} from "../infra/utils";
import "../styles/main.css";
import Link from "./Link";
import useSiteMetadata from "./useSiteMetadata";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string[];
    imageUrl?: string;
    rssUrl?: string;
}

function Meta({title, description, keywords, imageUrl, rssUrl}: MetaProps): JSX.Element {
    const siteMetadata = useSiteMetadata();

    const defaults = {
        title: "Alyxia Sother",
        description: "Alyxia Sother (@lexisother) is a software developer."
    };

    const actual = {
        title: title ? `${title} | ${defaults.title}` : defaults.title,
        description: description || defaults.description,
        keywords: keywords?.join(", "),
        imageUrl: imageUrl && getAbsoluteUrl(siteMetadata.siteUrl, imageUrl),
        rssUrl: rssUrl && getAbsoluteUrl(siteMetadata.siteUrl, rssUrl)
    };

    return (
        <Helmet>
            <html lang="en" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{actual.title}</title>

            <meta name="description" content={actual.description} />
            {actual.keywords && <meta name="keywords" content={actual.keywords} />}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={actual.title} />
            <meta property="og:description" content={actual.description} />
            {actual.imageUrl && <meta property="og:image" content={actual.imageUrl} />}

            <meta name="twitter:title" content={actual.title} />
            <meta name="twitter:site" content="@lexisother" />
            <meta name="twitter:creator" content="@lexisother" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:description" content={actual.description} />
            {actual.imageUrl && <meta name="twitter:image" content={actual.imageUrl} />}

            {actual.rssUrl && <link rel="alternate" type="application/rss+xml" title="RSS Feed" href={actual.rssUrl} />}
        </Helmet>
    );
}

function Navigation(): JSX.Element {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link className="navbar-logo-link" href="/">
                    Alyxia Sother
                </Link>
            </div>

            <div className="navbar-links">
                <Link className="navbar-link" activeClassName="navbar-link--active" activeExact href="/">
                    Home
                </Link>

                <Link className="navbar-link" activeClassName="navbar-link--active" activeExact href="/about">
                    About
                </Link>

                <Link className="navbar-link" activeClassName="navbar-link--active" href="/projects">
                    Projects
                </Link>

                <Link className="navbar-link" activeClassName="navbar-link--active" href="/blog">
                    Blog
                </Link>
            </div>
        </nav>
    );
}

interface PageProps extends MetaProps {
    children: React.ReactNode;
}

export default function Page({children, ...props}: PageProps): JSX.Element {
    return (
        <div className="page-container">
            <Meta {...props} />
            <Navigation />

            <main>{children}</main>
        </div>
    );
}
