/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check

const {Octokit} = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const outputDirPath = path.resolve("./data/projects/");
const files = fs.readdirSync(outputDirPath).map((file) => file.replace(".json", ""));
console.log(files);

async function run() {
    const github = new Octokit();

    const {data: repos} = await github.repos.listForUser({
        username: "lexisother",
        type: "owner",
        per_page: 100,
        sort: "pushed"
    });

    const projects = repos.map((repo) => ({
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count || 0,
        language: repo.language,
        licensekey: repo.license?.key || "",
        licensename: repo.license?.name || "No License",
        licenseurl: repo.license?.url || "",
        forked: repo.fork,
        updated: repo.pushed_at
    }));

    projects.forEach(async (project) => {
        if (project.licensename !== "No License") {
            const licenseurl = await github.request("GET /licenses/{license}", {
                license: project.licensekey
            });
            project.licenseurl = licenseurl.data.html_url;
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

    console.log(files);
    files.forEach((file) => {
        fs.rmSync(path.resolve(outputDirPath, `${file}.json`));
        console.log(`Deleted ${file}.`);
    });
}

run();
