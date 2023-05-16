import { NextPage } from 'next';
import Image from 'next/image';
import logo from '../public/img/logo.png'
import Head from 'next/head';

interface Props {
    logo: boolean;
}

const Header: NextPage<Props> = function Header(props) {
    if (props.logo) {
        return (
            <>
                <Head>
                    <title>TBHI Housing Outcome Submission Form</title>
                </Head>
                <div className="w-full bg-blue text-center relative">
                    <div className="w-1/2 min-w-[600px] m-auto relative py-4">
                        <div className="w-[65%]">
                            <Image
                                src={logo}
                                alt="TBHI Logo"
                            />
                        </div>
                        <h2 className="text-white text-center ml-[30%]">Housing Outcome Submission Form</h2>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <>
                <Head>
                    <title>TBHI Housing Outcome Submission Form</title>
                </Head>
                <div className="w-full bg-blue text-center relative py-2">
                    <h2 className="text-white text-center">Housing Outcome Submission Form</h2>
                </div>
            </>
        );
    }

};

export default Header;