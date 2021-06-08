import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Page from "./shared/Page";
import List from './shared/List';
import {skills} from './data/about';

export default function AboutPage(): JSX.Element {
    return (
        <Page title="About">
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
                    {/* TODO: #1 Move parts of Home.tsx here and expand upon it */}
                    <h2>[write stuff about myself here idk]</h2>
                </TabPanel>
                <TabPanel>
                    <div>
                        <List list={skills} />
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* TODO: #2 Do the same as `skills` for this one */}
                    <h2>[list about interests]</h2>
                </TabPanel>
            </Tabs>
        </Page>
    );
}
