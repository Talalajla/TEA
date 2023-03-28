import { useRef } from "react";
import { useClickAway } from "react-use";
import { ModalBox } from "../../styles/modal/main";

export default function Modal(props) {
	const ModalRef = useRef('');
	useClickAway(ModalRef, () => props.close(), ['mouseup']);

	return <ModalBox ref={ModalRef} bgGrid={props.bgGrid}>{props.children}</ModalBox>;
}
