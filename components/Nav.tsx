import { NextPage } from 'next';

interface Props {
    currentPage: number;
    lastPage: number;
    back: () => void;
    startover: () => void;
}

const Nav: NextPage<Props> = function Nav(props) {
    return (
        <div className="w-full">
            <div className="w-full flex">
                <button className="flex-1 text-left text-navy font-bold uppercase text-lg" onClick={props.back}>&lsaquo; Back</button>
                <p className="flex-1 text-navy text-center font-bold text-lg">{props.currentPage}/{props.lastPage}</p>
                <button className="flex-1 text-right text-navy font-bold uppercase text-lg" onClick={props.startover}>Start Over</button>
            </div>
            <meter
              value={props.currentPage}
              min="0"
              max={props.lastPage}
              className="w-full h-6"
            />
        </div>
    );
};

export default Nav;