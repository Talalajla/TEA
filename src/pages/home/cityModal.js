import React, { useRef, useState } from "react";
import Modal from "../../components/modal/modal";
import ModalPartHeader from "../../components/modal/modalHeader";
import ModalPartBody from "../../components/modal/modalBody";
import ModalPartFooter from "../../components/modal/modalFooter";
import { AiOutlineSearch } from "react-icons/ai";
import { ModalButton, ModalContainer, ModalInput, ModalLabel, ModalRow } from "../../styles/modal/main";
import { CityHiddenRadio, CityItemInfo, CityItemLabel, CityItemStyle, CityList, CityListItem, SearchCitiesBtn } from "../../styles/home/main";
import { figureRecentCitiesArray } from "../shared/helper/recentCities";

const CityModal = (props) => {
	const formSearch = useRef("");
	const formCities = useRef("");
	const [newcity, setNewcity] = useState("-");
	const [cityArray, setCityArray] = useState([]);
	const [status, setStatus] = useState("idle");
	const apikey = "c60621f6b01ac75d9cb4f8afef300fdc";

	const searchCities = (e) => {
		if (newcity !== "-") {
			const listItems = formCities.current.cityRadio;
			listItems.forEach((item) => (item.checked = false));
		}
		e.preventDefault();
		const city = formSearch.current.city.value;
		if (city === "" || !city) return;
		const fetchCities = async () => {
			setStatus("loading cities");
			const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`);
			const data = await response.json();
			setCityArray(data);
			setStatus("idle");
		};
		if (status === "idle") fetchCities();
	};

	const saveCity = (e) => {
		e.preventDefault();
		if (newcity === "-") return;
		const cityObj = {
			city: newcity.name,
			country: newcity.country,
			state: newcity.state,
			lat: newcity.lat,
			lon: newcity.lon
		}
		const recentCitiesArray = figureRecentCitiesArray(cityObj);

		localStorage.setItem('TEA_recentCities', JSON.stringify(recentCitiesArray));
		localStorage.setItem("TEA_cityData", JSON.stringify(cityObj));
		props.close();
		props.refreshData();
	};

	const overrideCity = () => {
		const listItems = formCities.current.cityRadio;
		let checkedIndex;
		if (listItems.length >= 2) {
			listItems.forEach((item, index) => (item.checked ? (checkedIndex = index) : null));
			setNewcity(cityArray[checkedIndex]);
		} else {
			setNewcity(cityArray[0]);
		}
	};
	return (
		<Modal close={props.close}>
			<ModalPartHeader>Change your city</ModalPartHeader>
			<ModalPartBody>
				<ModalContainer flex col gap="20">
					<ModalContainer flex col gap="5" as="form" ref={formSearch} onSubmit={searchCities}>
						<ModalRow>
							<ModalContainer flex col gap="5">
								{newcity !== "-" && (
									<>
									<span>Chosen city:</span>
									<ModalContainer flex jccenter gap="10" fz="14">
										<span>{newcity.name},</span> <span>{newcity.state},</span>
										<span>{newcity.country}</span>
									</ModalContainer>
									</>
								)}
							</ModalContainer>
						</ModalRow>
						<ModalLabel htmlFor="city">Find your city:</ModalLabel>
						<ModalContainer fullh flex>
							<ModalInput flexfull name="city" />
							<SearchCitiesBtn onClick={searchCities}>
								<AiOutlineSearch />
							</SearchCitiesBtn>
						</ModalContainer>
					</ModalContainer>
					<ModalContainer flex col as="form" ref={formCities}>
						{cityArray.length > 0 && (
							<>
								<ModalRow>Choose your city:</ModalRow>
								<CityList>
									{cityArray.map((item, index) => (
										<CityListItem key={index}>
											<CityItemLabel onInput={overrideCity}>
												<CityHiddenRadio name="cityRadio" />
												<CityItemStyle>
													<CityItemInfo>
														<span>{item.name}</span>
														<span>{item.state}</span>
													</CityItemInfo>
													<CityItemInfo>
														<span>{item.country}</span>
														<ModalContainer flex col>
															<span>Lat: {Math.round(item.lat * 100) / 100}</span>
															<span>Lon: {Math.round(item.lon * 100) / 100}</span>
														</ModalContainer>
													</CityItemInfo>
												</CityItemStyle>
											</CityItemLabel>
										</CityListItem>
									))}
								</CityList>
							</>
						)}
					</ModalContainer>
				</ModalContainer>
			</ModalPartBody>
			<ModalPartFooter>
				<ModalButton onClick={props.close} hov>
					Cancel
				</ModalButton>
				<ModalButton final onClick={saveCity}>
					Save
				</ModalButton>
			</ModalPartFooter>
		</Modal>
	);
};
export default CityModal;
