import React, { useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { ModalButton, ModalContainer, ModalInput, ModalLabel } from "../../styles/modal/main";

const EdittabModal = (props) => {
	const form = useRef("");

	const [currentname, setCurrentname] = useState("");
	const [currenturl, setCurrenturl] = useState("");

	useEffect(() => {
		const element = document.querySelector(".selected").querySelectorAll("a div");
		console.log(element);
		setCurrentname(element[1].textContent);
		setCurrenturl(element[0].dataset.url);
	}, []);

	// if (JSON.parse(localStorage.getItem("cardnames") == null)) localStorage.setItem("cardnames", []);
	// if (JSON.parse(localStorage.getItem("cardnames") == null)) localStorage.setItem("cardurls", []);

	const editCard = () => {
		let newname = form.current.name.value;
		let newurl = form.current.url.value;
		if (newurl.startsWith("http://")) newurl = newurl.slice(7);
		if (newurl.startsWith("https://")) newurl = newurl.slice(8);

		const cardNames = JSON.parse(localStorage.getItem("cardnames"));
		const cardUrls = JSON.parse(localStorage.getItem("cardurls"));

		cardNames.forEach((name, index) => (name === currentname ? (cardNames[index] = newname) : null));
		cardUrls.forEach((url, index) => (url === currenturl ? (cardUrls[index] = newurl) : null));

		console.log(cardNames);

		localStorage.setItem("cardnames", JSON.stringify(cardNames));
		localStorage.setItem("cardurls", JSON.stringify(cardUrls));
		props.close();
		props.refreshCards();
	};

	return (
		<Modal>
			<ModalPartHeader>Edit shortcut card</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer flex col as="form" ref={form}>
					<ModalLabel htmlFor="name">Your name</ModalLabel>
					<ModalInput name="name" defaultValue={currentname} />
					<ModalLabel htmlFor="url">Website URL</ModalLabel>
					<ModalInput name="url" defaultValue={currenturl} />
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalButton onClick={props.close} hov>
					Cancel
				</ModalButton>
				<ModalButton onClick={editCard} final>
					Save
				</ModalButton>
			</ModalPartFooter>
		</Modal>
	);
};
export default EdittabModal;
