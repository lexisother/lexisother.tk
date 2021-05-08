import {graphql, useStaticQuery} from "gatsby";
import {BuildInfo} from "../infra/utils";

interface SiteBuildData {
    buildTime: string;
}

export default function BuildData(): SiteBuildData {
    const data: BuildInfo = useStaticQuery(graphql`
        {
            siteBuildMetadata {
                buildTime
            }
        }
    `);
    return data.siteBuildMetadata as SiteBuildData;
}
