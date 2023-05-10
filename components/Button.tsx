import { NextPage } from 'next';

interface Props {
	disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const Button: NextPage<Props> = function Button(props) {
    return (
    	<div className="">
	        <button className="w-full text-xl border-2 border-orange bg-orange text-white uppercase rounded-md font-bold p-1 my-4 disabled:opacity-70 hover:bg-white hover:text-orange" disabled={props.disabled} onClick={props.onClick}>
	            {props.children}
	        </button>
	    </div>
    );
};

export default Button;