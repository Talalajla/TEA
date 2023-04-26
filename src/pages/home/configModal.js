import React, { useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { DefaultRadio, ModalButton, ModalContainer, ModalInlineCheckbox, ModalInlineCheckboxContainer, ModalInlineMessage, ModalInlineTexts, ModalInlineTitle, ModalInput, ModalLabel, ModalRow, NewTabCheckbox, NewTabCheckboxDot, NewTabCheckboxStyle, NewTabLabel } from "../../styles/modal/main";
import { RadioCircle, SelectContainer } from "../../styles/home/settings";
import { BsGoogle } from "react-icons/bs";
import { DiBingSmall } from "react-icons/di";
import { FaAmazon, FaReddit, FaTwitch, FaWikipediaW, FaYahoo, FaYoutube } from "react-icons/fa";
import { SiDuckduckgo } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";

const Settings = (props) => {
	const form = useRef("");
	const chosenEngine = localStorage.getItem("searchengine");
	const chosenUnit = localStorage.getItem("tempunit");
	const [searchInNew, setSearchInNew] = useState(localStorage.getItem("TEA_searchInNewWindow"));
	const [cardsInNew, setCardsInNew] = useState(localStorage.getItem("TEA_cardsInNewWindow")); 
	const nameValue = localStorage.getItem('TEA_nickname');

	const saveConfig = (e) => {
		e.preventDefault();
		const engines = form.current.searchEngine;
		const tempunits = form.current.tempunit;
		const yourName = form.current.name.value;
		let checkedEng, checkedUnit;
		const oldUnit = localStorage.getItem("tempunit");
		engines.forEach((item) => (item.checked ? (checkedEng = item) : null));
		tempunits.forEach((item) => (item.checked ? (checkedUnit = item) : null));
		
		localStorage.setItem("searchengine", checkedEng.dataset.engine);
		localStorage.setItem("tempunit", checkedUnit.dataset.unit);
		localStorage.setItem("TEA_searchInNewWindow", searchInNew ? 'true' : '');
		localStorage.setItem("TEA_cardsInNewWindow", cardsInNew ? 'true' : '');
		localStorage.setItem("TEA_nickname", yourName);

		if (oldUnit !== checkedUnit.dataset.unit) props.refreshData();
		props.close();
		props.refreshEngines();
		props.refreshNickname();
	};
	
	return (
		<Modal close={props.close}>
			<ModalPartHeader>Choose your search engine:</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer flex col as="form" ref={form} onSubmit={(e) => e.preventDefault()}>
					<ModalRow padTop>Set your name:</ModalRow>
					<ModalRow>
						<ModalContainer fullH flex>
							<ModalInput fullRadius name='name' defaultValue={nameValue} />
						</ModalContainer>
					</ModalRow>
					<ModalRow padTop>Select your search engine:</ModalRow>
					<ModalRow>
						<SelectContainer>
							<ModalLabel type="google" cp>
								<DefaultRadio defaultChecked={chosenEngine === "google"} name="searchEngine" data-engine="google" />
								<BsGoogle size="24" />
								<FcGoogle size="24" />
							</ModalLabel>
							<ModalLabel type="bing" cp>
								<DefaultRadio defaultChecked={chosenEngine === "bing"} name="searchEngine" data-engine="bing" />
								<DiBingSmall />
							</ModalLabel>
							<ModalLabel type="yahoo" cp>
								<DefaultRadio defaultChecked={chosenEngine === "yahoo"} name="searchEngine" data-engine="yahoo" />
								<FaYahoo />
							</ModalLabel>
							<ModalLabel type="duckduckgo" cp>
								<DefaultRadio defaultChecked={chosenEngine === "duckduckgo"} name="searchEngine" data-engine="duckduckgo" />
								<SiDuckduckgo />
							</ModalLabel>
							<ModalLabel type="amazon" cp>
								<DefaultRadio defaultChecked={chosenEngine === "amazon"} name="searchEngine" data-engine="amazon" />
								<FaAmazon />
							</ModalLabel>
							<ModalLabel type="twitch" cp>
								<DefaultRadio defaultChecked={chosenEngine === "twitch"} name="searchEngine" data-engine="twitch" />
								<FaTwitch />
							</ModalLabel>
							<ModalLabel type="reddit" cp>
								<DefaultRadio defaultChecked={chosenEngine === "reddit"} name="searchEngine" data-engine="reddit" />
								<FaReddit />
							</ModalLabel>
							<ModalLabel type="youtube" cp>
								<DefaultRadio defaultChecked={chosenEngine === "youtube"} name="searchEngine" data-engine="youtube" />
								<FaYoutube />
							</ModalLabel>
							<ModalLabel type="wikipedia" cp>
								<DefaultRadio defaultChecked={chosenEngine === "wikipedia"} name="searchEngine" data-engine="wikipedia" />
								<FaWikipediaW />
							</ModalLabel>
						</SelectContainer>
					</ModalRow>
					<ModalRow padTop>Select your temperature unit:</ModalRow>
					<ModalRow>
						<SelectContainer>
							<ModalLabel cp>
								<DefaultRadio defaultChecked={chosenUnit === "metric"} name="tempunit" data-unit="metric" temp />
								<RadioCircle>°C</RadioCircle>
							</ModalLabel>
							<ModalLabel cp>
								<DefaultRadio defaultChecked={chosenUnit === "imperial"} name="tempunit" data-unit="imperial" temp />
								<RadioCircle>°F</RadioCircle>
							</ModalLabel>
							<ModalLabel cp>
								<DefaultRadio defaultChecked={chosenUnit === "default"} name="tempunit" data-unit="default" temp />
								<RadioCircle>°K</RadioCircle>
							</ModalLabel>
						</SelectContainer>
					</ModalRow>
					<ModalRow>
						<ModalInlineCheckboxContainer>
							<ModalInlineTexts>
								<ModalInlineTitle>Open cards in new tab?</ModalInlineTitle>
								<ModalInlineMessage>Does not affect search engine!</ModalInlineMessage>
							</ModalInlineTexts>
							<ModalInlineCheckbox>
								<NewTabLabel>
									<NewTabCheckbox name='cardsOpenInNew' checked={!!cardsInNew} onChange={() => setCardsInNew(!cardsInNew)} />
									<NewTabCheckboxStyle>
										<NewTabCheckboxDot />
									</NewTabCheckboxStyle>
								</NewTabLabel>
							</ModalInlineCheckbox>
						</ModalInlineCheckboxContainer>
					</ModalRow>
					<ModalRow>
						<ModalInlineCheckboxContainer>
							<ModalInlineTexts>
								<ModalInlineTitle>Search result in new tab?</ModalInlineTitle>
								<ModalInlineMessage>Does not affect cards!</ModalInlineMessage>
							</ModalInlineTexts>
							<ModalInlineCheckbox>
								<NewTabLabel>
									<NewTabCheckbox name='searchOpenInNew' checked={!!searchInNew} onChange={() => setSearchInNew(!searchInNew)} />
									<NewTabCheckboxStyle>
										<NewTabCheckboxDot />
									</NewTabCheckboxStyle>
								</NewTabLabel>
							</ModalInlineCheckbox>
						</ModalInlineCheckboxContainer>
					</ModalRow>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalButton onClick={props.close} hov>
					Cancel
				</ModalButton>
				<ModalButton onClick={saveConfig} final>
					Save
				</ModalButton>
			</ModalPartFooter>
		</Modal>
	);
};
export default Settings;
