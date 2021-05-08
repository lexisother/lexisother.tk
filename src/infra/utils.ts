export function getAbsoluteUrl(base: string, relative: string): string {
    return new URL(relative, base).toString();
}

export function isAbsoluteUrl(url: string): boolean {
    return /^[a-z][a-z\d+\-.]*:/iu.test(url);
}

export function trimEnd(str: string, end: string): string {
    let temp = str;

    while (temp.endsWith(end)) {
        temp = temp.substr(0, temp.length - end.length);
    }

    return temp;
}

export interface BuildInfo {
    siteBuildMetadata: {
        buildTime: string;
    };
}
