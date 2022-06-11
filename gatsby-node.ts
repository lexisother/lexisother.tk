import type {GatsbyNode} from "gatsby";
import path from "path";
import MarkdownRemark = GatsbyTypes.MarkdownRemark;

export const onCreateNode: GatsbyNode["onCreateNode"] = ({actions, node}) => {
    if (node.internal.type === "MarkdownRemark") {
        const value = path.basename(path.dirname(node.fileAbsolutePath as string));
        actions.createNodeField({
            node,
            name: "slug",
            value
        });
    }
};

export const createPages: GatsbyNode["createPages"] = async ({actions, graphql}) => {
    // Generate static pages
    actions.createPage({
        path: "/",
        component: path.resolve("./src/Home.tsx"),
        context: null
    });

    actions.createPage({
        path: "/404",
        component: path.resolve("./src/Error404.tsx"),
        context: null
    });

    actions.createPage({
        path: "/blog",
        component: path.resolve("./src/Blog.tsx"),
        context: null
    });

    actions.createPage({
        path: "/projects",
        component: path.resolve("./src/Projects.tsx"),
        context: null
    });

    actions.createPage({
        path: "/about",
        component: path.resolve("./src/About.tsx"),
        context: null
    });

    actions.createPage({
        path: "/plugins",
        component: path.resolve("./src/PluginInfo.tsx"),
        context: null
    });

    // Generate pages for blog posts
    const queryResult = await graphql(`
        query {
            allMarkdownRemark {
                nodes {
                    fields {
                        slug
                    }
                }
            }
        }
    `);

    if (queryResult.errors) throw queryResult.errors;

    /**
     * @type {GatsbyTypes.MarkdownRemarkConnection}
     */
    const blogPostData = queryResult as {data: {allMarkdownRemark: GatsbyTypes.MarkdownRemarkConnection}};
    const blogPostConnection = blogPostData.data.allMarkdownRemark;

    blogPostConnection.nodes.forEach((node: MarkdownRemark) => {
        if (!node.fields) {
            return;
        }

        const {slug} = node.fields;
        const coverImagePath = `blog/${slug}/Cover.png`;

        actions.createPage({
            path: `/blog/${slug}`,
            component: path.resolve("./src/BlogPost.tsx"),
            context: {slug, coverImagePath}
        });
    });
};
