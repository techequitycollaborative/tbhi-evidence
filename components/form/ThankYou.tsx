import { NextPage } from 'next';

const ThankYou: NextPage = function ThankYou() {
    return (
        <div className="w-full">
            <h2>Thank You</h2>
            <p className="my-2">Thank you for submitting your application details. If you applied for housing multiple times, you may submit another entry for each application.</p>
        </div>
    );
};

export default ThankYou;