import { ALL_APPLICATIONS_URL, ALL_PEOPLE_URL, SAVE_RECORD_URL } from "@/pages";
import { FormData } from "@/types/formdata";

// ONLY FOR TESTING.
// TODO: find a way to not package this into production deployments
export function testSubmit() {
  try {
    const r = fetch(SAVE_RECORD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: "conr;ad@made--up.biz/* */",
        userType: "individual",
        organization: "East Bay Community Law Center",
        race: "Black or African American",
        ethnicity: "No Response",
        age: 50,
        yearlyIncome: 100000,
        creditScore: "700",
        rentalDebt: "1000",
        evictionHistory: [{question: "hello", answer: true}],
        criminalHistory: [{question: "world", answer: false}],
        street: "joey way",
        unit: "2C",
        city: "Seattle",
        state: "WA",
        zipcode: "84510",
        monthlyRent: 1000,
        landlordName: "joey",
        screeningCompanyName: "joey's screening",
        applicationDate: new Date("2020-06-07"),
        screeningFee: 100,
        portableScreeningFee: "Yes",
        applicationMethod: "Online",
        assessmentOutcome: "Denied",
        assessmentOutcomeDetails: "didn't like me",
        denialReason: "Other",
        otherDenialReason: "didn't like me",
        alternateDenialNotes: "he realllllly didn't like me",
        additionalContextNotes: "joey is not cool",
      } as FormData),
    });
    r.then(async (response) => {
      if (response.ok) {
        window.alert("success");
      } else {
        window.alert(await response.text());
      }
    });
  } catch (err: any) {
    console.log(err.message);
  }
}

export function testFetchApplications() {
  const r = fetch(ALL_APPLICATIONS_URL, {
    method: "GET",
  });
  r.then(async (response) => {
    if (response.ok) {
      console.log("fetch succeeded");
      console.log(JSON.stringify(await response.json(), null, 2));
    } else {
      window.alert("fetch failed");
    }
  });
}

export function testFetchPeople() {
  const r = fetch(ALL_PEOPLE_URL, {
    method: "GET",
  });
  r.then(async (response) => {
    if (response.ok) {
      console.log("fetch succeeded");
      console.log(JSON.stringify(await response.json(), null, 2));
    } else {
      window.alert("fetch failed");
    }
  });
}
