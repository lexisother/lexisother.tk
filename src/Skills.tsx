import {formatDistanceToNow as distance} from "date-fns";
import React from "react";
import {genid} from "./infra/utils";
import Page from "./shared/Page";

export default function SkillsPage() {
    return (
        <Page title="Skills">
            <div className="section-header">Skills.</div>

            <div className="section-prelude">Here's an overview of my skills.</div>
            <div>
                <List list={skills} />
            </div>
        </Page>
    );
}

const List = ({list}: {list: Object[]}) => (
    <ul>
        {(list || []).map((item: any) => (
            <ListItem key={genid()} item={item} />
        ))}
    </ul>
);

const ListItem = ({item}: {item: Skill}) => (
    <li>
        <p key={genid()}>
            {item.name} - {item.time}
        </p>
        {item.extra ? (
            <ul>
                {item.extra.map((language) => (
                    <li>
                        <p key={genid()}>
                            {language.name} - {language.time}
                        </p>
                    </li>
                ))}
            </ul>
        ) : null}
    </li>
);

interface Skill {
    name: string;
    time: string;
    extra?: Array<Item>;
}

interface Item {
    name: string;
    time: string;
}

const skills: Array<Skill> = [
    {
        name: "Programming",
        time: distance(new Date(2012, 12, 29)),
        extra: [
            {
                name: "JavaScript/TypeScript",
                time: distance(new Date(2019, 8, 9))
            },
            {
                name: "Python",
                time: distance(new Date(2012, 12, 29))
            },
            {
                name: "Shell",
                time: distance(new Date(2021, 4, 23))
            }
        ]
    },
    {
        name: "Producing",
        time: distance(new Date(2014, 4, 12)),
        extra: [
            {
                name: "Piano",
                time: distance(new Date(2014, 4, 12))
            },
            {
                name: "Classical Electronic",
                time: distance(new Date(2020, 2, 6))
            },
            {
                name: "Trance",
                time: distance(new Date(2020, 12, 28))
            }
        ]
    }
];
