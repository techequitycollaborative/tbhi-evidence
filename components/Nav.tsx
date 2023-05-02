import { NextPage } from 'next';

interface Props {
    currentPage: number;
    lastPage: number;
    back: () => void;
}

const Nav: NextPage<Props> = function Nav(props) {
    return (
        <div className="w-full">
            <div className="w-full flex">
                <button className="flex-1 text-left" onClick={props.back}>Back</button>
                <p className="flex-1">{props.currentPage}/{props.lastPage}</p>
            </div>
            <meter
              value={props.currentPage}
              min="0"
              max={props.lastPage}
              className="w-full"
            />
        </div>
    );
};

export default Nav;