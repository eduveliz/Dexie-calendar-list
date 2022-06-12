import {Button, Form, Modal} from 'antd';
import React, {useState} from 'react';
import {eventsDatabase} from "../../db/eventsDatabase";
import Input from "antd/es/input/Input";

const AddEvent = (props) => {

    const {isModalVisible, date, handleCancel} = props
    const [eventName, setEventName] = useState("");
    const [loading, setLoading] = useState(false);

    async function addFriend(name) {
        setLoading(true)
        try {
            await eventsDatabase.events.add({
                name: eventName,
                date: date
            });
            setLoading(false)
            setEventName('')
            handleCancel()
        } catch (error) {
            console.log(`Failed to add ${name}: ${error}`);
        }
    }

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

                <Form>
                    <Form.Item label="Event Name">
                        <Input
                            value={eventName}
                            onChange={(value) => setEventName(value.target.value)}/>
                    </Form.Item>
                </Form>

            </Modal>
        </>
    );
};

export default AddEvent;
