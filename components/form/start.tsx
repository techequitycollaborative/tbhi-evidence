function Start({formData, setFormData}) {
  return (
    <>
      <p>Email</p>
      <input
        onChange={(e) => {
          setFormData({
            ...formData,
            email: e.target.value,
          });
        }}
      />
    </>
  );
}

export default Start;