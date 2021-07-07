import React, { useState } from 'react';
import ReactModal from 'react-modal';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Modal = (props) => {

	return(
		<ReactModal
			isOpen={ props.modalIsOpen }
			className="modal"
			overlayClassName="modal-container"
		>
			<div dangerouslySetInnerHTML={{ __html: props.content }} />
			<button class="btn-modal-close" onClick={ props.closeModal }><ArrowBackIcon/></button>
		</ReactModal>
	)

}

export default Modal