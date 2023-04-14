import React from 'react';
import Modal from 'react-responsive-modal';

export const ModalWindow: React.FC<{ disabled?: boolean; button: string | React.ReactNode, buttonAlt?: string, open: boolean, setOpen: (open: boolean) => unknown; children?: React.ReactNode }> = ({ button, open, setOpen, buttonAlt, children, disabled }) => {
    return <>
        <button disabled={disabled} title={buttonAlt ?? (typeof button === 'string' ? button : '')} onClick={() => setOpen(true)}>{button}</button>
        <Modal open={open} onClose={() => setOpen(false)}>
            {children}
        </Modal>
    </>;

}