import {formatDistanceToNow as distance} from "date-fns";
import {Data} from '../shared/List';

// SkillArray of skills displayed with the `List` component
export const skills: Data[] = [
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