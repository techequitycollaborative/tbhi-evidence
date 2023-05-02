import { NextPage } from 'next';

interface Props {
	disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const Button: NextPage<Props> = function Button(props) {
    return (
    	<div className="">
	        <button className="w-full text-xl bg-orange text-white uppercase rounded-md font-bold p-2 my-4" disabled={props.disabled} onClick={props.onClick}>
	            {props.children}
	        </button>
	    </div>
    );
};

export default Button;