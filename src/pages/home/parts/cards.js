import React from "react";
import { Card, CardFavicon, CardImg, CardsWrapper } from "../../../styles/home/main";
import { AiOutlinePlus } from "react-icons/ai";

const Cards = () => {
	const cardsNames = JSON.parse(localStorage.getItem("cardnames"));
	const cardsUrls = JSON.parse(localStorage.getItem("cardurls"));

	return (
		<CardsWrapper>
			{cardsNames.map((item, index) => (
				<Card key={index} href={`https://${cardsUrls[index]}`} target="_blank">
					<CardFavicon>
						<CardImg src={`https://www.google.com/s2/favicons?domain=${cardsUrls[index]}&sz=128`} />
					</CardFavicon>
					<div>{item}</div>
				</Card>
			))}
			{cardsNames.length < 12 && (
				<Card>
					<CardFavicon black>
						<AiOutlinePlus />
					</CardFavicon>
					<div>Dodaj nowy</div>
				</Card>
			)}
		</CardsWrapper>
	);
};

export default Cards;
