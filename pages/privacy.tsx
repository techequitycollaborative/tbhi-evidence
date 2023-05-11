import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextPage } from "next";

const Privacy: NextPage = () => {
  return (
    <div>
      <Header logo={true} />
      <div className="w-1/2 min-w-[600px] mx-auto mt-8 pb-20">
        <h2 className="m-4">Privacy Policy</h2>
        <p className="my-2">TechEquity Collaborative believes that data about us is our data. Organizations and entities that collect or wish to use our data must meet certain privacy and security standards, including getting affirmative consent to collect it, and limiting its use and storage to what is necessary to complete the project and agreed to by data subjects. Below you will find a privacy policy for TechEquity’s algorithmic tenant screening research, information that should help you decide whether you would like to participate in the research.</p>
        <h3 className="font-bold text-lg mt-4">About TechEquity Collaborative & Algorithmic Tenant Screening Research</h3>
        <p className="my-2">TechEquity is a California-based nonprofit that addresses inequities within the tech industry and caused by the tech industry. The organization is researching the algorithms that are used in assessing rental housing applications, and the impact that those algorithms have on housing outcomes. TechEquity is working with organizations in the field of legal service, tenant organizing, national advocacy, academics, and consumer justice to better understand how algorithmic tenant screening services treat applicants, and whether certain groups are more or less likely to be denied housing when subject to a tech-backed tenant screening tool.</p>
        <h2 className="mt-8 mb-4">Data Security & Data Privacy</h2>
        <h3 className="font-bold text-lg mt-4">Your Data</h3>
        <p className="my-2">The data you contribute to this research will help us identify algorithmic tenant screening companies and assess patterns in how they approve and deny applicants according to certain characteristics. To do that, we will collect details about the rental unit, your income and income assistance, credit score, criminal and eviction histories, as well as whether you were approved or denied. Your contributions to the research are incredibly helpful and appreciated.</p>
        <h3 className="font-bold text-lg mt-4">Data Privacy, Security, & Sharing</h3>
        <p className="my-2">Staff at partnering organizations will, with your permission, input data about your application experience into a private, secure database managed by TechEquity. We follow security best practices including encrypting all data during transit, controlling database access, and securely deleting data when scheduled or requested (including from any backups). Only TechEquity and the organization with which you work will have access to your raw data. We will not give anyone else access to your information. Participating organizations will be able to view aggregate data but will not have access to any individual level data (outside of what they have already entered for their own clients).</p>
        <p className="my-2">Your information will be held in a secure database for three years, at which point it will be deleted. You may remove your consent and participation in the research at any time by emailing <a className="text-blue font-bold hover:opacity-70" href="mailto:research@techequitycollaborative.org">research@techequitycollaborative.org</a>. If you choose to do so, TechEquity will delete your data within 21 days of receiving your request.</p>
        <h3 className="font-bold text-lg mt-4">Use of Information</h3>
        <p className="my-2">The information you provide will be used to:</p>
        <ul className="list-disc list-inside">
          <li className="ml-8">Analyze if people with similar characteristics to you were treated similarly</li>
          <li className="ml-8">Analyze if people with different characteristics were treated differently</li>
          <li className="ml-8">Inform potential  solutions to fix disparities in how housing screening tools assess applicants</li>
        </ul>
        <p className="my-2">If you have questions about TechEquity’s research or privacy practices, you may contact Hannah Holloway, Director of Policy & Research at: <a className="text-blue font-bold hover:opacity-70" href="mailto:hannah@techequitycollaborative.org">hannah@techequitycollaborative.org</a></p>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;