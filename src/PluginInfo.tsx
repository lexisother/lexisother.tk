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

export default function InfoPage({data}: InfoPageProps) {
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

    // const buildData = BuildData();

    // return (
    //     <Page title="Info">
    //         <div className="section-header">Info</div>

    //         <div className="section-prelude">Here's some info about the website.</div>

    //         <div key="buildDate" className="entry">
    //             <div className="entry-name">Build Date</div>

    //             {/* <div className="entry-description">
    //                 Date the site was last built.
    //             </div> */}

    //             <div className="entry-info">
    //                 {formatDate(Date.parse(buildData.buildTime), "PPPP | ppp")}
    //             </div>
    //         </div>
    //     </Page>
    // );
}
