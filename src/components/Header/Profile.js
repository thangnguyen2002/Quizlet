import { Tab } from 'bootstrap';
import React, { useState } from 'react';
import { Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const Profile = (props) => {
    const { show, onHide } = props
    const { t } = useTranslation();

    return (
        <>
            <Modal show={show} onHide={onHide} backdrop="static" size="lg" className='modal-container'>
                <Modal.Header closeButton>
                    <Modal.Title>{t('profile.title1')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey={t('profile.title2')} title={t('profile.title2')}>
                            Tab content for Home
                        </Tab>
                        <Tab eventKey={t('profile.title3')} title={t('profile.title3')}>
                            Tab content for Profile
                        </Tab>
                        <Tab eventKey={t('profile.title4')} title={t('profile.title4')}>
                            Tab content for Contact
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Profile