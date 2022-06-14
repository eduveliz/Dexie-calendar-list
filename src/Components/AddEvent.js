import {Button, Form, Modal, Select} from 'antd';
import React, {useState} from 'react';
import Input from "antd/es/input/Input";
import {Option} from "antd/es/mentions";
import {eventsDatabase} from "../db/eventsDatabase";
import {EventTypes} from "../common/EventTypes";

const AddEvent = (props) => {
    const {isModalVisible, date, handleCancel} = props
    const [eventName, setEventName] = useState("");
    const [eventType, setEventType] = useState("birthday");
    const [loading, setLoading] = useState(false);

    async function addFriend(name) {
        setLoading(true)
        try {
            await eventsDatabase.events.add({
                name: eventName,
                date: date,
                type: eventType
            });
            setLoading(false)
            setEventName('')
            handleCancel()
        } catch (error) {
            console.log(`Failed to add ${name}: ${error}`);
        }
    }

    const handleChange = (value) => {
        setEventType(value)
    };

    return (
        <>
            <Modal
                title="New Event"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        loading={loading}
                        onClick={addFriend}>
                        Create Event
                    </Button>,
                    <Button
                        key="link"
                        onClick={handleCancel}>
                        Cancel
                    </Button>,
                ]}>

                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 28}}>
                    <Form.Item label="Event Name">
                        <Input
                            value={eventName}
                            onChange={(value) => setEventName(value.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Event Type">
                        <Select defaultValue="birthday" style={{width: "100%"}} onChange={handleChange}>

                            {
                                EventTypes.map((eventType) => {
                                    return (
                                        <Option key={eventType.value}
                                                value={eventType.value}>{eventType.eventTypeName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddEvent;
