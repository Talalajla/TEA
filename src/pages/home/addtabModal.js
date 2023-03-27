import React, { useRef } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalButton, ModalCardContainer, ModalContainer, ModalInput, ModalLabel } from "../../styles/modal/main";

const AddtabModal = (props) => {
	const form = useRef("");

	const saveCard = () => {
		let cardname = form.current.name.value;
		let cardurl = form.current.url.value;
		if (cardurl.startsWith("http://")) cardurl = cardurl.slice(7);
		if (cardurl.startsWith("https://")) cardurl = cardurl.slice(8);

		const cardNames = JSON.parse(localStorage.getItem("cardnames")) ? JSON.parse(localStorage.getItem("cardnames")) : [];
		const cardUrls = JSON.parse(localStorage.getItem("cardurls")) ? JSON.parse(localStorage.getItem("cardurls")) : [];

		cardNames.push(cardname);
		cardUrls.push(cardurl);

		localStorage.setItem("cardnames", JSON.stringify(cardNames));
		localStorage.setItem("cardurls", JSON.stringify(cardUrls));
		props.close();
		props.refreshCards();
	};

	return (
		<Modal close={props.close}>
			<ModalPartHeader>Add shortcut card</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer as="form" ref={form}>
					<ModalCardContainer>
						<ModalLabel htmlFor="name">Your name</ModalLabel>
						<ModalInput name="name" />
						<ModalLabel htmlFor="url">Website URL</ModalLabel>
						<ModalInput name="url" />
					</ModalCardContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalCardContainer footer>
					<ModalButton onClick={props.close} hov>
						Cancel
					</ModalButton>
					<ModalButton onClick={saveCard} final>
						Save
					</ModalButton>
				</ModalCardContainer>
			</ModalPartFooter>
		</Modal>
	);
};
export default AddtabModal;
