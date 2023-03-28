import { ModalBody } from "../../styles/modal/main";

const ModalPartBody = (props) => {
	return <ModalBody bgOverflow={props.bgOverflow}>{props.children}</ModalBody>;
};

export default ModalPartBody;
