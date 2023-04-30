import React, { useRef, useState } from "react";
import { Card, CardEdit, CardFavicon, CardImg, CardLink, CardMenu, CardsWrapper, MenuWrapper } from "../../../styles/home/main";
import { AiOutlinePlus, AiTwotoneEdit } from "react-icons/ai";
import { BsThreeDots, BsTrashFill } from "react-icons/bs";
import { useClickAway } from "react-use";

const Cards = (props) => {
	const cardsNames = JSON.parse(localStorage.getItem("cardnames"));
	const cardsUrls = JSON.parse(localStorage.getItem("cardurls"));
	const menu = useRef("");
	const [isopen, openMenu] = useState(false);

	useClickAway(
		menu,
		() => {
			openMenu(false);
		},
		["mouseup"]
	);

	const deleteItem = () => {
		const element = document.querySelector(".selected");
		const name = element.children[1].children[1].textContent;
		const url = element.children[1].children[0].dataset.url;

		const cardNames = JSON.parse(localStorage.getItem("cardnames"));
		const cardUrls = JSON.parse(localStorage.getItem("cardurls"));
		cardNames.forEach((itemName, index) => (itemName === name ? cardNames.splice(index, 1) : null));
		cardUrls.forEach((itemUrl, index) => (itemUrl === url ? cardUrls.splice(index, 1) : null));

		localStorage.setItem("cardnames", JSON.stringify(cardNames));
		localStorage.setItem("cardurls", JSON.stringify(cardUrls));
		openMenu(false);
	};

	const relocateDialog = (e) => {
		const el = e.currentTarget;
		const cards = Array.from(document.getElementsByClassName("card"));
		cards.forEach((card) => card.classList.remove("selected"));
		el.parentElement.classList.add("selected");
		//@set dialog position
		const top = el.getBoundingClientRect().top;
		const left = el.getBoundingClientRect().left;
		menu.current.style.left = `${left - 75}px`;
		menu.current.style.top = `${top}px`;

		openMenu(true);
	};

	const handleOpenCard = (url) => {
		const target = !!localStorage.getItem('TEA_cardsInNewWindow');
		window.open(url, target ? '_blank' : '_self');
	}

	return (
		<CardsWrapper>
			{cardsNames.map((item, index) => (
				<Card key={index} className="card">
					<CardEdit onClick={relocateDialog}>
						<BsThreeDots />
					</CardEdit>
					<CardLink onClick={() => handleOpenCard(`https://${cardsUrls[index]}`)}>
						<CardFavicon data-url={cardsUrls[index]}>
							<CardImg src={`https://www.google.com/s2/favicons?domain=${cardsUrls[index]}&sz=128`} />
						</CardFavicon>
						<div>{item}</div>
					</CardLink>
				</Card>
			))}
			{cardsNames.length < 12 && (
				<Card onClick={props.addCard()} adder>
					<CardFavicon black>
						<AiOutlinePlus />
					</CardFavicon>
					<div>Add new</div>
				</Card>
			)}
			<CardMenu ref={menu} open={isopen}>
				<MenuWrapper>
					<button onClick={props.openEdit()}>
						<AiTwotoneEdit />
						Edit
					</button>
					<button onClick={deleteItem}>
						<BsTrashFill />
						Delete
					</button>
				</MenuWrapper>
			</CardMenu>
		</CardsWrapper>
	);
};

export default Cards;
