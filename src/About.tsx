import React from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import "react-tabs/style/react-tabs.css";
import {interests, skills} from "./data/about";
import List from "./shared/List";
import Page from "./shared/Page";

export default function AboutPage(): JSX.Element {
    return (
        <Page title="About">
            <div className="section-header">About me</div>

            <div className="section-prelude">
                This page contains various info about me, from skills to interests, it's all here!
            </div>
            <Tabs>
                <TabList>
                    <Tab>Skills</Tab>
                    <Tab>Interests</Tab>
                </TabList>
                <TabPanel>
                    <div>
                        <List list={skills} />
                    </div>
                </TabPanel>
                <TabPanel>
                    {/* TODO: #2 Do the same as `skills` for this one */}
                    <div>
                        <List list={interests} />
                    </div>
                </TabPanel>
            </Tabs>
        </Page>
    );
}
