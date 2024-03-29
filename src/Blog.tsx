import React from "react";
import {compareDesc as compareDatesDesc, format as formatDate, formatDuration} from "date-fns";
import {graphql} from "gatsby";
import {FiCalendar, FiClock, FiTag} from "react-icons/fi";
import Link from "./shared/Link";
import Page from "./shared/Page";

export const query = graphql`
    query {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    title
                    date
                    tags
                }
                fields {
                    slug
                }
                timeToRead
            }
        }
    }
`;

interface BlogPageProps {
    data: {allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection};
}

export default function BlogPage({data}: BlogPageProps): JSX.Element {
    const blogPosts = [...data.allMarkdownRemark.nodes]
        .map((node) => ({
            id: node.fields?.slug!,
            title: node.frontmatter?.title!,
            date: new Date(node.frontmatter?.date!),
            tags: node.frontmatter?.tags?.map((tag) => tag!)!,
            timeToRead: node.timeToRead!
        }))
        .sort((a, b) => compareDatesDesc(a.date, b.date));

    const years = [...new Set(blogPosts.map((blogPost) => blogPost.date.getFullYear()))];

    const blogPostsByYear = years
        .sort((a, b) => b - a)
        .map((year) => ({
            year,
            blogPosts: blogPosts.filter((blogPost) => blogPost.date.getFullYear() === year)
        }));

    return (
        <Page title="Blog" rssUrl="/blog/rss.xml">
            <div className="section-header">Blog</div>

            <div className="section-prelude">
                If you want to know when I post a new article, follow me on{" "}
                <Link href="https://twitter.com/lexisother">Twitter</Link> or subscribe to the{" "}
                <Link href="/blog/rss.xml">RSS feed</Link>~ ✨
            </div>

            {blogPostsByYear.map(({year, blogPosts}) => (
                <div key={year} className="group">
                    <div className="group-header">
                        <div>{year}</div>
                        <hr className="group-header-line" />
                    </div>

                    {blogPosts.map((blogPost) => (
                        <div key={blogPost.id} className="entry">
                            <div className="entry-name">
                                <Link href={`/blog/${blogPost.id}`}>{blogPost.title}</Link>
                            </div>

                            <div className="entry-info">
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
                        </div>
                    ))}
                </div>
            ))}
        </Page>
    );
}
