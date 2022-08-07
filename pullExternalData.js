/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const {Octokit} = require("@octokit/rest");
const fs = require("fs");
const path = require("path");
const start = require("./scripts/start");
const {throttling} = require("@octokit/plugin-throttling");

console.log("Generating Wakatime SVG...");
start();
console.log("Done.");

if (!fs.existsSync(path.resolve("./data/projects/"))) {
    fs.mkdirSync(path.resolve("./data/projects/"));
}

const outputDirPath = path.resolve("./data/projects/");
const files = fs.readdirSync(outputDirPath).map((file) => file.replace(".json", ""));

async function run() {
    console.log(`Authenticating to GitHub with token: ${process.env.TOKEN}`);
    const MyOctokit = Octokit.plugin(throttling);
    const github = new MyOctokit({
        auth: process.env.TOKEN,
        throttle: {
            onRateLimit: (retryAfter, options, octokit) => {
                octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
                octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                return true;
            },
            onSecondaryRateLimit: (retryAfter, options, octokit) => {
                octokit.log.warn(`Request quota exhausted for request ${options.method} ${options.url}`);
                octokit.log.info(`Retrying after ${retryAfter} seconds!`);
                return true;
            }
        }
    });

    let projects = [];
    const {data: repos} = await github.repos.listForUser({
        username: "lexisother",
        type: "owner",
        per_page: 100,
        sort: "pushed"
    });

    const extraProjectsList = JSON.parse(fs.readFileSync("./data/extraprojects.json").toString());
    for (let project of extraProjectsList) {
        const [owner, name] = project.split("/");
        let {data} = await github.repos.get({
            owner: owner,
            repo: name
        });

        projects.push({
            name: data.name,
            url: data.html_url,
            description: data.description,
            stars: data.stargazers_count || 0,
            language: data.language,
            licensekey: data.license?.key || "",
            licensename: data.license?.name || "No License",
            licenseurl: data.license?.url || "",
            forked: data.fork,
            archived: data.archived,
            updated: data.pushed_at,
            owner: owner,
            external: true
        });
    }

    projects.push(
        ...repos.map((repo) => ({
            name: repo.name,
            url: repo.html_url,
            description: repo.description,
            stars: repo.stargazers_count || 0,
            language: repo.language,
            licensekey: repo.license?.key || "",
            licensename: repo.license?.name || "No License",
            licenseurl: repo.license?.url || "",
            forked: repo.fork,
            archived: repo.archived,
            updated: repo.pushed_at
        }))
    );

    projects.forEach(async (project) => {
        if (project.licensename !== "No License") {
            if (project.licensename !== "Other") {
                const licenseurl = await github.request("GET /licenses/{license}", {
                    license: project.licensekey
                });
                project.licenseurl = licenseurl.data.html_url;
            }
        }

        if (files.includes(project.name))
            files.splice(
                files.findIndex((file) => file === project.name),
                1
            );

        const json = JSON.stringify(project, null, 2) + "\n";
        const filePath = path.resolve(outputDirPath, `${project.name}.json`);

        fs.writeFileSync(filePath, json);
        console.log(`Pulled ${project.name}.`);
    });

    files.forEach((file) => {
        fs.rmSync(path.resolve(outputDirPath, `${file}.json`));
        console.log(`Deleted ${file}.`);
    });
}

run();
