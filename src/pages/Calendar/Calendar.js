import {Calendar} from "antd";
import '../../styles.css';
import {useState} from "react";
import Card from "antd/es/card/Card";
import moment from 'moment';
import AddEvent from "../../Components/AddEvent";

function CalendarComponent(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [date, setDate] = useState(null);
    const {events} = props

    const showModal = () => {
        setIsModalVisible(true);
    };

    const onSelectDate = (value) => {
        setDate(moment(value).format('ll'))
        showModal()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const getListData = (value) => {
        let listData = [];

        events.map((event) => {
            if (moment(event.date).format('ll') === moment(value).format('ll')) {
                listData.push({
                    type: 'success',
                    eventName: event.name
                })
            }
        })

        return listData;
    }

    const dateCellRender = (value) => {
        const listData = getListData(value);
        return (
            <div className="events">
                {listData.map((item) => (
                    <div key={item.eventName}>
                        {item.eventName}
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div className='calendar-container'>
            <Card>

                <AddEvent
                    isModalVisible={isModalVisible}
                    handleCancel={handleCancel}
                    date={date}
                />
                <Calendar
                    onSelect={onSelectDate}
                    dateCellRender={dateCellRender}
                />
            </Card>
        </div>
    )
}

export default CalendarComponent;
