import {graphql} from "gatsby";
import React from "react";
import {formatDistanceToNow as distance} from 'date-fns';
import {AiOutlineFork} from "react-icons/ai";
import {FiPackage} from "react-icons/fi";
import {GiInjustice} from "react-icons/gi";
import Link from './shared/Link';
import Page from './shared/Page';

export const query = graphql`
    query {
        allProjectsJson {
            nodes {
                name
                url
                description
                stars
                language
                licensename
                licenseurl
                forked
                updated
            }
        }
    }
`;

interface ProjectsPageProps {
    data: {allProjectsJson: GatsbyTypes.ProjectsJsonConnection};
}

export default function ProjectsPage({data}: ProjectsPageProps): JSX.Element {
    const projects = [...data.allProjectsJson.nodes]
        .map((node) => ({
            name: node.name!,
            url: node.url!,
            description: node.description!,
            language: node.language!,
            licensename: node.licensename!,
            licenseurl: node.licenseurl!,
            forked: node.forked!,
            updated: node.updated!
        }))
        .sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated))
        .filter((p) => p.name !== "lexisother");

    return (
        <Page title="Projects">
            <div className="section-header">Projects</div>

            <div className="section-prelude">Here's a list of all my current projects.</div>

            {projects.map((project) => (
                <div key={project.name} className="entry">
                    <div className="entry-name">
                        <Link href={project.url}>{project.name}</Link>
                    </div>

                    <div className="entry-description">{project.description}</div>

                    <div className="entry-info">
                        {project.forked && (
                            <div className="label">
                                <AiOutlineFork strokeWidth={1} />
                                <div>Fork</div>
                            </div>
                        )}

                        <div className="label">
                            <FiPackage strokeWidth={1} />
                            <div>{project.language}</div>
                        </div>

                        <div className="label">
                            <GiInjustice strokeWidth={1} />
                            {project.licenseurl ? (
                                <div>
                                    <Link href={project.licenseurl}>{project.licensename}</Link>
                                </div>
                            ) : (
                                <div>{project.licensename}</div>
                            )}
                        </div>

                        <div className="label">
                            <div>Last updated {distance(new Date(project.updated))} ago</div>
                        </div>
                    </div>
                </div>
            ))}
        </Page>
    );
}
