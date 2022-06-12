import {useLiveQuery} from "dexie-react-hooks";
import {eventsDatabase} from "../../db/eventsDatabase";
import Card from "antd/es/card/Card";
import {List} from "antd";
import '../../styles.css';
import moment from 'moment';

export function EventList() {
    let events = useLiveQuery(() => eventsDatabase.events.toArray());

    return (
        <div className='event-container'>
            <Card title="Events">
                <List
                    dataSource={events}
                    renderItem={(event) => (
                        <List.Item key={event.id}>
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                // title={<a href="https://ant.design">{item.name.last}</a>}
                                description={event.name}
                            />
                            <div>{moment(event.date).format('LL')}</div>
                        </List.Item>
                    )}
                />
            </Card>
        </div>

    )

}
