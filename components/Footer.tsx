function Footer() {
  return (
    <div className="bg-blue text-white h-8 w-full fixed bottom-0 flex justify-center items-center whitespace-pre">
      <a className="font-bold hover:opacity-70" target="_blank" href="https://housing.techbias.org">About</a>
      {" | "}
      <a className="font-bold hover:opacity-70" href="mailto:research@techequitycollaborative.org">Contact</a>
      {" | "}
      <a className="font-bold hover:opacity-70" target="_blank" href="privacy">Privacy Policy</a>
    </div>
  );
}

export default Footer;
