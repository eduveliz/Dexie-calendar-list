import CalendarComponent from "./pages/Calendar/Calendar";
import './styles.css';
import {EventList} from "./pages/Events/Events";
import {useLiveQuery} from "dexie-react-hooks";
import {eventsDatabase} from "./db/eventsDatabase";
import 'antd/dist/antd.min.css'

function App() {

    let events = useLiveQuery(() => eventsDatabase.events.toArray());

    return (
        events && (
            <div className='container'>
                <div className='events'>
                    <EventList/>
                </div>
                <div className='calendar'>
                    <CalendarComponent
                        events={events}
                    />
                </div>
            </div>)
    );
}

export default App;
