import { NextPage } from 'next';
import Image from 'next/image';
import logo from '../public/img/logo.png'

interface Props {
    logo: boolean;
}

const Header: NextPage<Props> = function Header(props) {
    if (props.logo) {
        return (
            <div className="w-full bg-blue text-center relative">
                <div className="w-1/2 min-w-[600px] m-auto relative py-4">
                    <Image
                        src={logo}
                        alt="TBHI Logo"
                    />
                    <h2 className="text-white text-center ml-[40%]">Evidence collection form</h2>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="w-full bg-blue text-center relative py-2">
                <h2 className="text-white text-center">TBHI Evidence collection form</h2>
            </div>
        );
    }

};

export default Header;