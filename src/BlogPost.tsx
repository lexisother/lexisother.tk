import {format as formatDate, formatDuration} from "date-fns";
import {graphql} from "gatsby";
import {GatsbyImage, getSrc} from "gatsby-plugin-image";
import "prismjs/themes/prism-tomorrow.css";
import React from "react";
import {FiCalendar, FiClock, FiTag} from "react-icons/fi";
import Link from "./shared/Link";
import Page from "./shared/Page";

export const query = graphql`
    query($slug: String!, $coverImagePath: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            frontmatter {
                title
                date
                tags
            }
            fields {
                slug
            }
            timeToRead
            excerpt(pruneLength: 280)
            html
        }
        cover: file(relativePath: {eq: $coverImagePath}) {
            childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 1024, quality: 100, placeholder: BLURRED)
            }
        }
        coverFallback: file(relativePath: {eq: "blog-cover-fallback.png"}) {
            childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 1024, quality: 100, placeholder: BLURRED)
            }
        }
    }
`;

interface BlogPostPageProps {
    data: {
        markdownRemark: GatsbyTypes.MarkdownRemark;
        cover?: GatsbyTypes.File;
        coverFallback: GatsbyTypes.File;
    };
}

export default function BlogPostPage({data}: BlogPostPageProps): JSX.Element {
    const blogPost = {
        id: data.markdownRemark.fields?.slug!,
        title: data.markdownRemark.frontmatter?.title!,
        date: new Date(data.markdownRemark.frontmatter?.date!),
        tags: data.markdownRemark.frontmatter?.tags?.map((tag) => tag!)!,
        timeToRead: data.markdownRemark.timeToRead!,
        excerpt: data.markdownRemark.excerpt!,
        html: data.markdownRemark.html!
    };

    const coverImage = data.cover?.childImageSharp;
    const coverImageFallback = data.coverFallback.childImageSharp!;

    return (
        <Page
            title={blogPost.title}
            description={blogPost.excerpt}
            keywords={blogPost.tags}
            imageUrl={getSrc(coverImage?.gatsbyImageData || coverImageFallback.gatsbyImageData)}
            rssUrl="/blog/rss.xml"
        >
            <div className="section-header">{blogPost.title}</div>

            <div className="section-info">
                <div className="label">
                    <FiCalendar strokeWidth={1} />
                    <div>{formatDate(blogPost.date, "dd MMM yyyy")}</div>
                </div>

                <div className="label">
                    <FiClock strokeWidth={1} />
                    <div>{formatDuration({minutes: blogPost.timeToRead})} to read</div>
                </div>

                <div className="label">
                    <FiTag strokeWidth={1} />
                    <div>{blogPost.tags.join(", ")}</div>
                </div>
            </div>

            {coverImage?.gatsbyImageData && (
                <figure className="section-cover">
                    <GatsbyImage image={coverImage.gatsbyImageData} alt={blogPost.title} />
                </figure>
            )}

            <article dangerouslySetInnerHTML={{__html: blogPost.html}} />

            <hr />

            <div className="section-postlude">
                Want to know when I post a new article? Follow me on{" "}
                <Link href="https://twitter.com/lexisother">Twitter</Link> or subscribe to the{" "}
                <Link href="/blog/rss.xml">RSS Feed</Link>~ ✨
            </div>

            <hr />
        </Page>
    );
}
