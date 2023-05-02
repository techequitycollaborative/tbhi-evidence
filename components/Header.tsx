import { NextPage } from 'next';

interface Props {
    logo: boolean;
}

const Header: NextPage<Props> = function Header(props) {
    return (
        <div className="w-full bg-blue text-center">
            <p className="text-white">This is the header</p>
        </div>
    );
};

export default Header;