/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

// ---
const siteUrl = process.env["SITE_URL"] || "http://localhost:8000";
// ---

/**
 * @param {string} url
 */
function resolveRelativeUrl(url) {
    return new URL(url, siteUrl).toString();
}

/**
 * @param {string} plugin
 * @param {object} [options]
 */
function resolvePlugin(plugin, options) {
    return {
        resolve: plugin,
        options: options
    };
}

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        siteUrl,
        title: "Alyxia Sother",
        description: "Alyxia Sother (@lexisother) is a software developer."
    },

    flags: {
        FAST_DEV: true,
        PRESERVE_WEBPACK_CACHE: true,
        PARALLEL_SOURCING: true
    },

    plugins: [
        // Source: file system (data)
        resolvePlugin("gatsby-source-filesystem", {
            name: "data",
            path: "./data/"
        }),

        // Source: file system (images)
        resolvePlugin("gatsby-source-filesystem", {
            name: "images",
            path: "./src/images/"
        }),

        // Transform: images
        resolvePlugin("gatsby-transformer-sharp"),

        // Transform: JSON
        resolvePlugin("gatsby-transformer-json"),

        // Transform: markdown
        resolvePlugin("gatsby-transformer-remark", {
            plugins: [
                // Transform image links
                resolvePlugin("gatsby-remark-images", {
                    maxWidth: 1280,
                    linkImagesToOriginal: false
                }),

                // Zoom for images
                resolvePlugin("gatsby-remark-images-zoom"),

                // Syntax highlighting
                resolvePlugin("gatsby-remark-prismjs", {
                    classPrefix: "language-",
                    noInlineHighlight: true
                }),

                // Markdown extensions
                resolvePlugin("gatsby-remark-smartypants")
            ]
        }),

        // RSS feed
        resolvePlugin("gatsby-plugin-feed", {
            feeds: [
                {
                    // @ts-expect-error: I have no idea what the type is
                    serialize: ({query: {allMarkdownRemark}}) => {
                        // @ts-expect-error: I have no idea what the type is
                        return allMarkdownRemark.edges.map((edge) => ({
                            ...edge.node.frontmatter,
                            description: edge.node.excerpt,
                            url: resolveRelativeUrl("/blog/" + edge.node.fields.slug),
                            guid: resolveRelativeUrl("/blog/" + edge.node.fields.slug)
                        }));
                    },
                    query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt(format: PLAIN, pruneLength: 500)
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }`,
                    output: "/blog/rss.xml",
                    title: "Blog | Alyxia Sother (RSS Feed)"
                }
            ]
        }),

        // App manifest
        resolvePlugin("gatsby-plugin-manifest", {
            name: "lexisother.tk",
            short_name: "lexisother.tk",
            theme_color: "#343838",
            background_color: "#343838",
            icon: "./src/images/favicon.png",
            start_url: "/",
            display: "browser"
        }),

        // Inject canonical URLs into meta tags
        resolvePlugin("gatsby-plugin-canonical-urls", {siteUrl}),

        // Misc plugins/dependencies
        resolvePlugin("gatsby-plugin-image"),
        resolvePlugin("gatsby-plugin-sharp"),
        resolvePlugin("gatsby-plugin-react-helmet"),
        resolvePlugin("gatsby-plugin-catch-links"),
        resolvePlugin("gatsby-plugin-sitemap"),
        resolvePlugin("gatsby-plugin-robots-txt"),
        resolvePlugin("gatsby-plugin-offline"),
        resolvePlugin("gatsby-plugin-typegen")
    ]
};