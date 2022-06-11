import {genid} from "../infra/utils";

const ListItem = ({item}: {item: Data}): JSX.Element => (
    <li>
        <p key={genid()}>
            {item.name} {item.time ? `- ${item.time}` : ""}
        </p>
        {item.extra ? (
            <ul>
                {item.extra.map((extra) => (
                    <li>
                        <p key={genid()}>
                            {extra.name} {extra.time ? `- ${extra.time}` : ""}
                        </p>
                    </li>
                ))}
            </ul>
        ) : null}
    </li>
);

export default function List({list}: {list: unknown[]}): JSX.Element {
    return (
        <ul>
            {/* If there's no list, provide an empty array */}
            {(list || []).map((item: any) => (
                <ListItem key={genid()} item={item} />
            ))}
        </ul>
    );
}

export interface Data {
    name: string;
    time?: string;
    extra?: Extra[];
}

interface Extra {
    name: string;
    time?: string;
}
