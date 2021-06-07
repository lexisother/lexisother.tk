import {formatDistanceToNow as distance} from "date-fns";
import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {genid} from "./infra/utils";
import Page from "./shared/Page";

export default function SkillsPage() {
    return (
        <Page title="Skills">
            <div className="section-header">About me</div>

            <div className="section-prelude">
                This page contains various info about me, from skills to interests, it's all here!
            </div>
            <Tabs>
                <TabList>
                    <Tab>Info</Tab>
                    <Tab>Skills</Tab>
                    <Tab>Interests</Tab>
                </TabList>
                <TabPanel>
                    {/* TODO: Move parts of Home.tsx here and expand upon it */}
                    <h2>[write stuff about myself here idk]</h2>
                </TabPanel>
                <TabPanel>
                    <div>
                        <List list={skills} />
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* TODO: Do the same as `skills` for this one */}
                    <h2>[list about interests]</h2>
                </TabPanel>
            </Tabs>
        </Page>
    );
}

// TODO: Literally everything below this point has to be moved to another file, it's atrocious to keep it here

const List = ({list}: {list: Object[]}) => (
    <ul>
        {/* If there's no list, provide an empty array */}
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

// SkillArray of skills displayed with the `List` component
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
