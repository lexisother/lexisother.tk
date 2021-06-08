import {graphql} from "gatsby";
import React from "react";
import {FiPackage} from "react-icons/fi";
import {GiInjustice} from "react-icons/gi";
import Page from "./shared/Page";

export const query = graphql`
    query {
        allSitePlugin(filter: {name: {regex: "/^((?!gatsby-plugin-page-creator).)*$/s"}}) {
            totalCount
            nodes {
                name
                version
                packageJson {
                    license
                }
            }
        }
    }
`;

interface InfoPageProps {
    data: {allSitePlugin: GatsbyTypes.SitePluginConnection};
}

export default function InfoPage({data}: InfoPageProps): JSX.Element {
    const total = data.allSitePlugin.totalCount;
    const plugins = [...data.allSitePlugin.nodes].map((node) => ({
        name: node.name!,
        version: node.version!,
        license: node.packageJson?.license!
    }));

    return (
        <Page title="Plugins">
            <div className="section-header">Plugins</div>

            <div className="section-prelude">
                These are the Gatsby plugins used to power this website. There are currently {total} plugins.
            </div>

            {plugins.map((plugin) => (
                <div key={plugin.name}>
                    <div className="entry-name">{plugin.name}</div>

                    <div className="entry-info">
                        <div className="label">
                            <FiPackage strokeWidth={1} />
                            <div>{plugin.version}</div>
                        </div>

                        <div className="label">
                            <GiInjustice strokeWidth={1} />
                            <div>{plugin.license ? plugin.license : "No License"}</div>
                        </div>
                    </div>
                </div>
            ))}
        </Page>
    );
}
